import React, {
  Suspense,
  useEffect,
  useState,
  useMemo,
  memo,
  useRef,
} from "react";
import styles from "./index.module.scss";
import { Canvas, useLoader, useFrame } from "react-three-fiber";
import {
  AnimationMixer,
  LoopRepeat,
  LoopOnce,
  AnimationClip,
  AnimationAction,
} from "three";
import _ from "lodash";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useFBXAnimation } from "../../canvas/Model/useGLTFAnimations";
import useGridAndControls from "../../hooks";

type DroppedFileType = string;

export const GridAndControls = () => {
  useGridAndControls();
  return <></>;
};

const Scene = (props: { droppedFile?: DroppedFileType }) => {
  const { droppedFile } = props;
  const currentAnimation = useRef<AnimationAction>();

  const model = useLoader(FBXLoader, "/models/0522/GW_ThumbUp_0522.fbx") as any;
  const mixer = useMemo(() => model && new AnimationMixer(model), [model]);

  const appearAnimation = useFBXAnimation("/models/0522/GW_ThumbUp_0522.fbx");
  const idleAnimation = useFBXAnimation("/models/review2/GW_Idle_05.fbx");

  useEffect(() => {
    if (droppedFile) {
      const loader = new FBXLoader();
      loader.load(droppedFile, (d) => {
        console.log(d);
      });
    }
  }, [droppedFile]);

  const returnToIdle = useMemo(
    () => () => {
      if (!mixer || !idleAnimation) return;
      const idleAction = mixer.clipAction(idleAnimation);
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
    [idleAnimation, mixer]
  );

  const playAnimation = useMemo(
    () => (animation: AnimationClip) => {
      if (!mixer) return;
      const animAction = mixer.clipAction(animation);
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
    [mixer]
  );

  useEffect(() => {
    if (mixer && appearAnimation && idleAnimation) {
      (async () => {
        //start as idle
        returnToIdle()!.fadeOut(0);
        //auto reset to idle
        mixer.addEventListener("finished", () => returnToIdle());
        //play appear animation
        playAnimation(appearAnimation);
      })();
    }
  }, [mixer, appearAnimation, idleAnimation, returnToIdle, playAnimation]);

  useFrame((state, delta) => {
    if (mixer) mixer.update(delta);
  });

  return (
    <>
      <GridAndControls />
      <spotLight position={[0, 250, 0]} rotation={[0, 180, 0]} />
      <hemisphereLight intensity={0.8} />
      <group scale={[0.02, 0.02, 0.02]}>
        <primitive object={model} />
      </group>
    </>
  );
};

const AnimationExample = () => {
  const [droppedFile, setDroppedFile] = useState<DroppedFileType>();

  return (
    <div
      className={styles.root}
      onDragEnter={(e) => {
        console.log("DRAG ENTERED");
        console.log(e.nativeEvent);
      }}
      onDrop={(e) => {
        console.log("DROP RECEIEVED");
        e.preventDefault();
        e.stopPropagation();
        const { files } = e.dataTransfer;

        const reader = new FileReader();
        reader.onload = (f) =>
          setDroppedFile((f.target?.result as DroppedFileType) || undefined);
        reader.readAsDataURL(files[0]);
      }}
    >
      <Canvas className={styles.canvas} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Scene droppedFile={droppedFile} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default memo(AnimationExample);
