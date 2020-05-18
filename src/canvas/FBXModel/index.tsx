import React, {
  useMemo,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  Ref,
  useEffect,
  memo,
} from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import {
  AnimationMixer,
  AnimationAction,
  LoopOnce,
  LoopRepeat,
  AnimationClip,
  MeshPhongMaterial,
} from "three";

export type FBXModelRefAttributes = {
  triggerAnimation: (animation: AnimationClip, loop?: boolean) => void;
};

const FBXModel = forwardRef(
  (
    props: {
      file: string;
    },
    ref: Ref<FBXModelRefAttributes>
  ) => {
    const { file } = props;
    const loopingClip = useRef<AnimationAction>();
    const playingClip = useRef<AnimationAction>();

    const model: any = useLoader(FBXLoader, file);

    const mixer = useMemo(
      () => (model ? new AnimationMixer(model) : undefined),
      [model]
    );

    useEffect(() => {
      if (model) {
        model.traverse((m: any) => {
          if (m.material) {
            m.material = new MeshPhongMaterial({
              color: "white",
              skinning: true,
              flatShading: true,
            });
          }
        });
      }
    }, [mixer, model]);

    const loopClip = useCallback(
      (clip: AnimationAction | undefined, crossfade: number = 0.2) => {
        if (!clip) return;
        loopingClip.current = clip;
        playingClip.current = clip;
        clip.loop = LoopRepeat;
        clip
          .reset()
          .setEffectiveTimeScale(1)
          .setEffectiveWeight(1)
          .fadeIn(crossfade)
          .play();
      },
      [playingClip, loopingClip]
    );
    const playOnce = useCallback(
      async (clip: AnimationAction | undefined, crossfade: number = 0.2) => {
        await new Promise((resolve) => {
          if (!mixer || !clip) return;
          if (playingClip.current) {
            playingClip.current.fadeOut(crossfade);
          }
          playingClip.current = clip;
          const listener = () => {
            mixer?.removeEventListener("finished", listener);
            clip.fadeOut(crossfade);
            if (loopingClip.current) {
              loopClip(loopingClip.current);
            } else {
              playingClip.current = undefined;
            }
            resolve();
          };
          mixer?.addEventListener("finished", listener);
          clip.loop = LoopOnce;
          clip.clampWhenFinished = true;
          clip
            .reset()
            .setEffectiveTimeScale(1)
            .setEffectiveWeight(1)
            .fadeIn(crossfade)
            .play();
        });
      },
      [mixer, playingClip, loopClip, loopingClip]
    );
    const triggerAnimation = useCallback(
      (animation: AnimationClip, loop?: boolean) => {
        if (!animation) {
          console.warn("Missing animation.");
          return;
        }
        if (loop) {
          loopClip(mixer?.clipAction(animation));
        } else {
          playOnce(mixer?.clipAction(animation));
        }
      },
      [playOnce, loopClip, mixer]
    );

    useImperativeHandle(
      ref,
      () => ({
        triggerAnimation,
      }),
      [triggerAnimation]
    );

    useFrame((canvas, deltaTime) => {
      mixer?.update(deltaTime);
    });

    return (
      <>
        <primitive object={model} />
      </>
    );
  }
);

export default memo(FBXModel);
