import React, { createContext, useMemo, useContext } from "react";
import { AnimationMixer, AnimationClip } from "three";
import _ from "lodash";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLoader } from "react-three-fiber";

export type SharedAnimationContextType = {
  [s: string]: AnimationClip | undefined;
};

const defaultValue: SharedAnimationContextType = {};

export const SharedAnimationContext = createContext(defaultValue);

export const useSharedAnimations = (mixer?: AnimationMixer) => {
  const sharedAnimations = useContext(SharedAnimationContext);
  const clipActionMemo = useMemo(
    () =>
      mixer
        ? _.mapValues(sharedAnimations, (a) => a && mixer.clipAction(a))
        : {},
    [mixer, sharedAnimations]
  );
  return clipActionMemo;
};

export default (props: { children: React.ReactNode }) => {
  const { children } = props;

  const breathing: any = useLoader(FBXLoader, "/models/breathing.fbx");
  const victory: any = useLoader(FBXLoader, "/models/victory.fbx");
  const defeat: any = useLoader(FBXLoader, "/models/defeat.fbx");

  const val = useMemo(
    () => ({
      breathing: breathing.animations[0],
      victory: victory.animations[0],
      defeat: defeat.animations[1],
    }),
    [breathing, victory, defeat]
  );

  return (
    <SharedAnimationContext.Provider value={val}>
      {children}
    </SharedAnimationContext.Provider>
  );
};
