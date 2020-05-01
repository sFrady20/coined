import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  Ref,
  useContext,
} from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  AnimationMixer,
  AnimationObjectGroup,
  AnimationAction,
  LoopOnce,
  LoopRepeat,
  Event,
} from "three";
import { useSharedAnimations } from "../SharedAnimations";
import useAnimations from "./useAnimations";
import { GameContext } from "../../components/GameContext";

export default forwardRef(
  (
    props: {
      file: string;
      nodesPath: string;
      materialPath: string;
    },
    ref: Ref<{
      triggerAnimation: (animation: string, loop?: boolean) => void;
    }>
  ) => {
    const { file, nodesPath, materialPath = "" } = props;
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [meshRef, setMeshRef] = useState<AnimationObjectGroup>();
    const { events } = useContext(GameContext);

    const loopingClip = useRef<AnimationAction>();
    const playingClip = useRef<AnimationAction>();

    const model: any = useLoader(GLTFLoader, file);

    const mixer = useMemo(() => meshRef && new AnimationMixer(meshRef), [
      meshRef,
    ]);

    const sharedClips = useSharedAnimations(mixer);
    const defaultAnimations = useAnimations("/models/kid/waiting.gltf", mixer, [
      "waiting",
    ]);
    const winAnimations = useAnimations("/models/kid/win.gltf", mixer, ["win"]);
    const loseAnimations = useAnimations("/models/kid/lose.gltf", mixer, [
      "lose",
    ]);

    const getAnimation = useCallback(
      (animation: string) => {
        if (defaultAnimations && defaultAnimations[animation])
          return defaultAnimations[animation];
        if (winAnimations && winAnimations[animation])
          return winAnimations[animation];
        if (loseAnimations && loseAnimations[animation])
          return loseAnimations[animation];
        if (sharedClips && sharedClips[animation])
          return sharedClips[animation];
      },
      [defaultAnimations, sharedClips, loseAnimations, winAnimations]
    );

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

    useEffect(() => {
      if (mixer && defaultAnimations) {
        loopClip(defaultAnimations["waiting"]);
      }
    }, [mixer, defaultAnimations, loopClip]);
    useFrame((state, delta) => {
      if (mixer) {
        mixer.update(delta);
        setTimeElapsed((t) => t + delta);
      }
    });

    useImperativeHandle(
      ref,
      () => ({
        triggerAnimation: (animation: string, loop?: boolean) => {
          const anim = getAnimation(animation);
          if (!anim) {
            console.warn(`No animation found for ${animation}`);
          }
          if (loop) {
            loopClip(anim);
          } else {
            playOnce(anim);
          }
        },
      }),
      [getAnimation, loopClip, playOnce]
    );

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

    return (
      <group ref={setMeshRef} scale={[0.001, 0.001, 0.001]}>
        <group position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[7, 7, 7]}>
          <primitive object={model.nodes["mixamorigHips"]} />
          <skinnedMesh
            geometry={model.nodes[nodesPath].geometry}
            skeleton={model.nodes[nodesPath].skeleton}
            position={[0, 200, 0]}
            rotation={[0, 0, 0]}
          >
            <meshPhongMaterial
              attach="material"
              skinning
              map={model.materials[materialPath].map}
              normalMap={model.materials[materialPath].normalMap}
            />
          </skinnedMesh>
        </group>
      </group>
    );
  }
);
