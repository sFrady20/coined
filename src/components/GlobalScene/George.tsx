import React, {
  memo,
  useEffect,
  useContext,
  useMemo,
  useRef,
  forwardRef,
  Ref,
  useImperativeHandle,
} from "react";
import {
  LoopRepeat,
  Matrix4,
  Quaternion,
  Object3D,
  Euler,
  AnimationMixer,
  LoopOnce,
  AnimationAction,
  AnimationClip,
  Event,
} from "three";
import _ from "lodash";
import { useFrame, useThree } from "react-three-fiber";
import clamp from "../../util/clamp";
import { AssetContext } from "../AssetLoader";
import { SessionContext } from "../Session";

const lookAt = (eye: Object3D, target: Object3D) => {
  eye.updateWorldMatrix(true, false);
  const pos = eye.position.clone().setFromMatrixPosition(eye.matrixWorld);
  var m = new Matrix4().lookAt(target.position, pos, target.up);
  var fq = new Quaternion().setFromRotationMatrix(m);
  if (eye.parent) {
    const m4 = new Matrix4().extractRotation(eye.parent.matrixWorld);
    const q4 = new Quaternion().setFromRotationMatrix(m4);
    fq.premultiply(q4.inverse());
  }
  return fq;
};

const DISABLED_BONES = [
  "mixamorig_Head.quaternion",
  "EYE_LEFT.quaternion",
  "EYE_RIGHT.quaternion",
];

export type GeorgeHandle = {
  returnToIdle: () => AnimationAction | undefined;
  playAnimation: (clip: AnimationClip) => AnimationAction | undefined;
};

const George = memo(
  forwardRef((props: {}, ref: Ref<GeorgeHandle>) => {
    const { events } = useContext(SessionContext);
    const { models } = useContext(AssetContext);
    const { camera } = useThree();
    const currentAnimation = useRef<AnimationAction>();

    const georgeModel = useMemo(() => models && models["idle"], [models]);
    const idleAnimation = useMemo(
      () => models && models["idle"].animations[0],
      [models]
    );
    const appearAnimation = useMemo(
      () => models && models["appear"].animations[0],
      [models]
    );
    const laughingAnimation = useMemo(
      () => models && models["laugh"].animations[0],
      [models]
    );
    const thumbsUpAnimation = useMemo(
      () => models && models["thumbsUp"].animations[0],
      [models]
    );

    const georgeMixer = useMemo(
      () => georgeModel && new AnimationMixer(georgeModel),
      [georgeModel]
    );
    const georgeNodes = useMemo(() => {
      if (!georgeModel) return undefined;
      const nodes: { [s: string]: Object3D } = {};
      georgeModel.traverse((d: Object3D) => (nodes[d.name] = d));
      return nodes;
    }, [georgeModel]);

    useFrame((state, delta) => {
      if (georgeModel && georgeNodes) {
        const head: Object3D = georgeNodes["mixamorig_Head"];
        const neck: Object3D = georgeNodes["mixamorig_Neck"];
        const leftEye: Object3D = georgeNodes["EYE_LEFT"];
        const rightEye: Object3D = georgeNodes["EYE_RIGHT"];

        const neckTarget = lookAt(neck, camera);
        const a = new Euler().setFromQuaternion(neckTarget);
        a.y = clamp(-0.6, a.y, 0.6);
        a.x = clamp(-0.5, a.x, 0.1) + 0.5;
        a.z = clamp(-0.6, a.z, 0.6);
        neckTarget.setFromEuler(a);
        const cross = new Euler()
          .setFromQuaternion(neckTarget)
          .toVector3()
          .normalize()
          .cross(neck.rotation.toVector3().normalize())
          .length();
        neck.quaternion.slerp(neckTarget, 0.07 + 0.1 * cross);

        const eyeTarget = lookAt(head, camera);
        const a2 = new Euler().setFromQuaternion(eyeTarget);
        a2.x = clamp(-0.2, a2.x, 0.2) + 0.1;
        a2.y = clamp(-0.2, a2.y, 0.2) + 0.1;
        a2.z = clamp(-0.2, a2.z, 0.2);
        eyeTarget.setFromEuler(a2);
        leftEye.quaternion.slerp(eyeTarget, 0.1);
        rightEye.quaternion.slerp(eyeTarget, 0.1);
      }

      if (georgeMixer) {
        georgeMixer.update(delta);
      }
    });

    const returnToIdle = useMemo(
      () => () => {
        if (!georgeMixer || !idleAnimation) return;
        //remove tracked bones from animation
        _.remove(idleAnimation.tracks, (t: any) =>
          DISABLED_BONES.includes(t.name)
        );

        const idleAction = georgeMixer.clipAction(idleAnimation);
        idleAction.setLoop(LoopRepeat, Infinity);
        if (currentAnimation.current) {
          idleAction.crossFadeFrom(currentAnimation.current, 0.2, true);
        } else {
          idleAction.setEffectiveWeight(1);
        }
        idleAction.enabled = true;
        idleAction.setEffectiveTimeScale(1);
        idleAction.play();
        currentAnimation.current = idleAction;
        return idleAction;
      },
      [idleAnimation, georgeMixer]
    );

    const playAnimation = useMemo(
      () => (animation: AnimationClip) => {
        if (!georgeMixer) return;
        //remove tracked bones from animation
        _.remove(animation.tracks, (t: any) => DISABLED_BONES.includes(t.name));

        const animAction = georgeMixer.clipAction(animation);
        animAction.setLoop(LoopOnce, 1);
        if (currentAnimation.current) {
          animAction.crossFadeFrom(currentAnimation.current, 0.2, true);
        } else {
          animAction.setEffectiveWeight(1);
        }
        animAction.reset();
        animAction.play();
        currentAnimation.current = animAction;
        return animAction;
      },
      [georgeMixer]
    );

    useEffect(() => {
      if (georgeMixer && idleAnimation) {
        (async () => {
          //start as idle
          returnToIdle()!.fadeOut(0);
          //auto reset to idle
          georgeMixer.addEventListener("finished", () => returnToIdle());
        })();
      }
    }, [georgeMixer, returnToIdle, playAnimation]);

    //listen for game events
    useEffect(() => {
      const winListener = (e: Event) => {
        //play win animation
        if (thumbsUpAnimation) playAnimation(thumbsUpAnimation);
      };
      const loseListener = (e: Event) => {
        //play lose animation
        if (laughingAnimation) playAnimation(laughingAnimation);
      };
      const scanListener = (e: Event) => {
        //play win animation
        if (appearAnimation) playAnimation(appearAnimation);
      };
      events.addEventListener("correct", winListener);
      events.addEventListener("incorrect", loseListener);
      events.addEventListener("scan", scanListener);
      return () => {
        events.removeEventListener("correct", winListener);
        events.removeEventListener("incorrect", loseListener);
        events.removeEventListener("scan", scanListener);
      };
    }, [events, thumbsUpAnimation, appearAnimation, laughingAnimation]);

    useImperativeHandle(ref, () => ({
      playAnimation,
      returnToIdle,
    }));

    return (
      <group scale={[0.02, 0.02, 0.02]}>
        <primitive object={georgeModel} />
      </group>
    );
  })
);

export default George;
