import { useMemo, useRef } from "react";
import _ from "lodash";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationClip } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export type AnimationMap = string[];
export type ExternalAnimationMap = { [file: string]: AnimationMap };

export const useFBXAnimation = (file: string): AnimationClip | undefined => {
  const model = useLoader(FBXLoader, file) as any;
  return useMemo(() => _.get(model, "animations.0"), [model]);
};

export const useFBXAnimations = (file: string, animationMap: AnimationMap) => {
  const model = useLoader(FBXLoader, file) as any;

  //making this non-updating so that i can just put [] as a prop and it doesn't re-render every time
  const initialAnimationMap = useRef(animationMap).current;

  const animations = useMemo(
    () =>
      _(model.animations)
        .mapKeys((a, i) => initialAnimationMap[i])
        .value(),
    [model, initialAnimationMap]
  );

  return animations;
};

export const useGLTFAnimation = (file: string): AnimationClip | undefined => {
  const model = useLoader(GLTFLoader, file) as any;
  return useMemo(() => _.get(model, "animations.0"), [model]);
};

export const useGLTFAnimations = (file: string, animationMap: AnimationMap) => {
  const model = useLoader(GLTFLoader, file) as any;

  //making this non-updating so that i can just put [] as a prop and it doesn't re-render every time
  const initialAnimationMap = useRef(animationMap).current;

  const animations = useMemo(
    () =>
      _(model.animations)
        .mapKeys((a, i) => initialAnimationMap[i])
        .value(),
    [model, initialAnimationMap]
  );

  return animations;
};
