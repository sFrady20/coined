import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { useLoader, useFrame } from "react-three-fiber";
import _ from "lodash";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  AnimationMixer,
  AnimationObjectGroup,
  AnimationAction,
  LoopOnce,
  LoopRepeat,
} from "three";
import { useSharedAnimations } from "../SharedAnimations";
import useKeyPress from "../../hooks/useKeyPress";

const SCENE_NODES = "Dreyar";
const SCENE_MATERIAL = "dreyar_M";

export default () => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [meshRef, setMeshRef] = useState<AnimationObjectGroup>();

  const loopingClip = useRef<AnimationAction>();
  const playingClip = useRef<AnimationAction>();

  const george: any = useLoader(GLTFLoader, "./george.glb");

  const mixer = useMemo(() => meshRef && new AnimationMixer(meshRef), [
    meshRef,
  ]);
  const sharedClips = useSharedAnimations(mixer);
  const animations = useMemo(
    () => (mixer ? _.map(george.animations, (a) => mixer.clipAction(a)) : []),
    [mixer, george]
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
    if (mixer && sharedClips.breathing) {
      loopClip(sharedClips.breathing);
    }
  }, [mixer, sharedClips, playOnce, loopClip]);
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
      setTimeElapsed((t) => t + delta);
    }
  });

  useKeyPress("a", () => playOnce(sharedClips.victory));
  useKeyPress("s", () => playOnce(sharedClips.defeat));

  return (
    <group
      ref={setMeshRef}
      scale={[0.001, 0.001, 0.001]}
      rotation={[0.5, 0, 0]}
    >
      <group
        position={[
          Math.sin(timeElapsed / 2) * 1000,
          0,
          Math.cos(timeElapsed / 2) * 1000,
        ]}
        rotation={[
          Math.sin(timeElapsed / 1.25) * 0.2,
          0,
          -Math.cos(timeElapsed / 0.85) * 0.2,
        ]}
      >
        <primitive object={george.nodes["mixamorigHips"]} />
        <skinnedMesh
          geometry={george.nodes[SCENE_NODES].geometry}
          skeleton={george.nodes[SCENE_NODES].skeleton}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        >
          <meshPhongMaterial
            attach="material"
            skinning
            map={george.materials[SCENE_MATERIAL].map}
            normalMap={george.materials[SCENE_MATERIAL].normalMap}
          />
        </skinnedMesh>
      </group>
    </group>
  );
};
