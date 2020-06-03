import React, { memo, useEffect, useContext, useMemo, useRef } from "react";
import { useFBXAnimation } from "../../canvas/Model/useGLTFAnimations";
import { SessionContext } from "../Session";
import {
  LoopRepeat,
  Matrix4,
  Quaternion,
  Object3D,
  Euler,
  AnimationMixer,
  LoopOnce,
  Event,
  AnimationAction,
  AnimationClip,
} from "three";
import _ from "lodash";
import { useFrame, useThree, useLoader } from "react-three-fiber";
import clamp from "../../util/clamp";
import useGridAndControls from "../../hooks";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Ornament from "./Ornament";

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

const Scene = () => {
  const { events } = useContext(SessionContext);
  const { camera } = useThree();
  useGridAndControls();

  const georgeModel = useLoader(
    FBXLoader,
    "/models/0522/GW_ThumbUp_0522.fbx"
  ) as any;
  const appearAnimation = useFBXAnimation("/models/review2/GW_Appear_09.fbx");
  const idleAnimation = useFBXAnimation("/models/review2/GW_Idle_05.fbx");
  /*
  const applauseAnimation = useFBXAnimation("/models/0522/GW_Applause01.fbx");
  const easterEggAnimation = useFBXAnimation(
    "/models/0522/GW_EasterEgg_01.fbx"
  );
  const endGameAnimation = useFBXAnimation("/models/0522/GW_EndGame_01.fbx");
  const laughingAnimation = useFBXAnimation("/models/0522/GW_Laughing_01.fbx");
  const moonWalkingAnimation = useFBXAnimation(
    "/models/0522/GW_MoonWalking_0522.fbx"
  );
  */
  const laughingAnimation = useFBXAnimation("/models/0522/GW_Laughing_01.fbx");
  const thumbsUpAnimation = useFBXAnimation("/models/0522/GW_ThumbUp_0522.fbx");

  const currentAnimation = useRef<AnimationAction>();

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
      a.x = clamp(-0.6, a.x, 0.6) + 1;
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
    if (georgeMixer && appearAnimation && idleAnimation) {
      (async () => {
        const disabled = [
          "mixamorig_Head.quaternion",
          "EYE_LEFT.quaternion",
          "EYE_RIGHT.quaternion",
        ];
        _.remove(idleAnimation.tracks, (t) => disabled.includes(t.name));
        _.remove(appearAnimation.tracks, (t) => disabled.includes(t.name));

        //start as idle
        returnToIdle()!.fadeOut(0);
        //auto reset to idle
        georgeMixer.addEventListener("finished", () => returnToIdle());

        //play appear animation
        playAnimation(appearAnimation);
      })();
    }
  }, [
    appearAnimation,
    georgeMixer,
    idleAnimation,
    georgeNodes,
    returnToIdle,
    playAnimation,
  ]);

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
    events.addEventListener("correct", winListener);
    events.addEventListener("incorrect", loseListener);
    return () => {
      events.removeEventListener("correct", winListener);
      events.removeEventListener("incorrect", loseListener);
    };
  }, [events, thumbsUpAnimation, laughingAnimation, playAnimation]);

  return (
    <>
      <spotLight position={[0, 3, 5]} rotation={[0, 180, 0]} />
      <hemisphereLight intensity={0.8} />
      <group scale={[0.02, 0.02, 0.02]}>
        <primitive object={georgeModel} />
        <Ornament />
      </group>
    </>
  );
};

export default memo(Scene);
