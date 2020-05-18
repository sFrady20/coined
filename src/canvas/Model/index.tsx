import React, {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
} from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer, AnimationObjectGroup } from "three";

export type GLTFModelRefAttributes = {
  model?: any;
  mixer?: AnimationMixer;
};

export default forwardRef(
  (
    props: {
      file: string;
    },
    ref: Ref<GLTFModelRefAttributes>
  ) => {
    const { file } = props;

    const model: any = useLoader(GLTFLoader, file);

    const mixer = useMemo(() => model && new AnimationMixer(model.scene), [
      model,
    ]);

    useFrame((state, delta) => {
      if (mixer) mixer.update(delta);
    });

    useImperativeHandle(
      ref,
      () => ({
        mixer,
        model,
      }),
      [mixer, model]
    );

    return <primitive object={model.scene} />;
  }
);
