import React, { useMemo, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTFAnimation } from "../../canvas/Model/useGLTFAnimations";
import { useLoader, useFrame } from "react-three-fiber";
import { AnimationMixer, LoopOnce } from "three";

const Ornament = () => {
  const ornamentModel = useLoader(
    GLTFLoader,
    "/models/review2/GW_ornaments.gltf"
  ) as any;
  const ornamentAnimation = useGLTFAnimation(
    "/models/review2/GW_ornaments.gltf"
  );

  const ornamentMixer = useMemo(
    () => ornamentModel && new AnimationMixer(ornamentModel.scene),
    [ornamentModel]
  );

  useEffect(() => {
    if (ornamentMixer && ornamentAnimation) {
      ornamentMixer.clipAction(ornamentAnimation).setLoop(LoopOnce, 1).play();
    }
  }, [ornamentMixer, ornamentAnimation]);

  useFrame((state, delta) => {
    if (ornamentMixer) {
      ornamentMixer.update(delta);
    }
  });

  return <primitive object={ornamentModel.scene} />;
};

export default Ornament;
