import React, { memo, useState, useEffect, useContext, useMemo } from "react";
import Model, { GLTFModelRefAttributes } from "../../canvas/Model";
import { useGLTFAnimation } from "../../canvas/Model/useGLTFAnimations";
import { SessionContext } from "../Session";
import {
  LoopRepeat,
  Bone,
  Matrix4,
  Quaternion,
  Group,
  Object3D,
  Vector3,
  Euler,
  AnimationMixer,
  LoopOnce,
} from "three";
import waitForSeconds from "../../util/waitForSeconds";
import AnimationQueue from "../AnimationQueue";
import _ from "lodash";
import { useFrame, useThree, useLoader } from "react-three-fiber";
import clamp from "../../util/clamp";
import useGridAndControls from "../../hooks";
import { transform } from "framer-motion";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
    GLTFLoader,
    "/models/review/GW_Idle_0515.gltf"
  ) as any;
  const appearAnimation = useGLTFAnimation(
    "/models/review/GW_Appear_0515.gltf"
  );
  const idleAnimation = useGLTFAnimation("/models/review/GW_Idle_0515.gltf");

  const georgeMixer = useMemo(
    () => georgeModel && new AnimationMixer(georgeModel.scene),
    [georgeModel]
  );

  useFrame((state, delta) => {
    if (georgeModel) {
      const head: Bone = georgeModel.nodes["mixamorigHead"];
      const neck: Bone = georgeModel.nodes["mixamorigNeck"];
      const spine: Bone = georgeModel.nodes["mixamorigSpine"];
      const leftEye: Bone = georgeModel.nodes["EYE_LEFT"];
      const rightEye: Bone = georgeModel.nodes["EYE_RIGHT"];

      /*
      var m = new Matrix4().lookAt(camera.position, neck.position, camera.up);
      neck.quaternion.setFromRotationMatrix(m);
      */

      const clampQuaternion = (
        quaternion: Quaternion,
        x: number,
        y: number,
        z: number
      ) => {
        const clamped = new Euler().setFromQuaternion(quaternion);
        clamped.x = clamp(-x, clamped.x, x);
        clamped.y = clamp(-y, clamped.y, y);
        clamped.z = clamp(-z, clamped.z, z);
        quaternion.setFromEuler(clamped);
      };

      const neckTarget = lookAt(neck, camera);
      const cross = new Euler()
        .setFromQuaternion(neckTarget)
        .toVector3()
        .normalize()
        .cross(neck.rotation.toVector3().normalize())
        .length();
      const neckClamp = 0.5;
      clampQuaternion(
        neckTarget,
        neckClamp - Math.abs(neckTarget.z),
        neckClamp,
        neckClamp - Math.abs(neckTarget.x)
      );
      const a = new Euler().setFromQuaternion(neckTarget);
      a.x += 0.6 + 0.05 * Math.abs(Math.pow(a.z, 2));
      neckTarget.setFromEuler(a);

      neck.quaternion.slerp(neckTarget, 0.01 + 0.1 * cross);

      const eyeclamp = 0.2;
      const eyeTarget = lookAt(head, camera);
      const a2 = new Euler().setFromQuaternion(eyeTarget);
      a2.x += 0.6 + 0.05 * Math.abs(Math.pow(a2.z, 2));
      eyeTarget.setFromEuler(a2);
      clampQuaternion(
        eyeTarget,
        eyeclamp - Math.abs(eyeTarget.z),
        eyeclamp,
        eyeclamp - Math.abs(eyeTarget.x)
      );
      leftEye.quaternion.slerp(eyeTarget, 0.1);
      rightEye.quaternion.slerp(eyeTarget, 0.1);

      //neck.rotation.setFromVector3(new Vector3(0, 0, 0));

      /*
      m = new Matrix4().lookAt(leftEye.position, camera.position, camera.up);
      e = new Euler().setFromRotationMatrix(m);
      leftEye.setRotationFromEuler(e);

      m = new Matrix4().lookAt(rightEye.position, camera.position, camera.up);
      e = new Euler().setFromRotationMatrix(m).clone();
      rightEye.setRotationFromEuler(e);
      */
    }
    if (georgeMixer) {
      georgeMixer.update(delta);
    }
  });

  useEffect(() => {
    if (georgeMixer && appearAnimation && idleAnimation) {
      (async () => {
        const disabled = [
          "mixamorigHead.quaternion",
          "EYE_LEFT.quaternion",
          "EYE_RIGHT.quaternion",
        ];
        _.remove(idleAnimation.tracks, (t) => disabled.includes(t.name));
        _.remove(appearAnimation.tracks, (t) => disabled.includes(t.name));

        const idleAction = georgeMixer
          .clipAction(idleAnimation)
          .setLoop(LoopRepeat, Infinity)
          .play()
          .fadeOut(0);

        const appearAction = georgeMixer
          .clipAction(appearAnimation)
          .setLoop(LoopOnce, 1)
          .play();

        console.log({
          idleAction,
          appearAction,
        });

        await waitForSeconds(appearAnimation.duration - 10 - 0.5);

        idleAction.enabled = true;
        idleAction.setEffectiveTimeScale(1);
        appearAction.crossFadeTo(idleAction, 0.5, false);

        console.log({
          idleAction,
          appearAction,
        });
      })();
      /*
      var queue = new AnimationQueue(mixer)
        .animate(appearAnimation)
        .animate(idleAnimation, 0.5, (a) => {
          a.setLoop(LoopRepeat, Infinity);
        })
        .play();
      (async () => {
        await waitForSeconds(5);
        queue.cancel("Im cancelling");
      })();
      */
    }
  }, [appearAnimation, georgeMixer, idleAnimation]);

  /*
    //listen for game events
    useEffect(() => {
      const winListener = (e: Event) => {
        playOnce(getAnimation("win"));
      };
      const loseListener = (e: Event) => {
        playOnce(getAnimation("lose"));
      };
      events.addEventListener("correct", winListener);
      events.addEventListener("incorrect", loseListener);
      return () => {
        events.removeEventListener("correct", winListener);
        events.removeEventListener("incorrect", loseListener);
      };
    }, [events, playOnce, getAnimation]);
    */

  return (
    <>
      <spotLight position={[0, 3, 5]} rotation={[0, 180, 0]} />
      <hemisphereLight intensity={0.8} />
      <group scale={[0.05, 0.05, 0.05]}>
        <primitive object={georgeModel.scene} />
      </group>
    </>
  );
};

export default memo(Scene);
