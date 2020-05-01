import { useMemo, useRef } from "react";
import _ from "lodash";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";

export type AnimationMap = string[];
export type ExternalAnimationMap = { [file: string]: AnimationMap };

export default (
  file: string,
  mixer: AnimationMixer | undefined,
  animationMap: AnimationMap
) => {
  const model = useLoader(GLTFLoader, file);

  //making this non-updating so that i can just put [] as a prop and it doesn't re-render every time
  const initialAnimationMap = useRef(animationMap).current;

  const animations = useMemo(
    () =>
      mixer
        ? _(model.animations)
            .map((a) => mixer.clipAction(a))
            .mapKeys((a, i) => initialAnimationMap[i])
            .value()
        : undefined,
    [mixer, model, initialAnimationMap]
  );

  return animations;
};
