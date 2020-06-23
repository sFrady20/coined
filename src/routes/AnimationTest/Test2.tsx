import React, { Suspense, memo } from "react";
import styles from "./index.module.scss";
import { Canvas } from "react-three-fiber";
import useGridAndControls from "../../hooks";
import SimpleModel from "./SimpleModel";

export const GridAndControls = () => {
  useGridAndControls();
  return <></>;
};

const Scene = (props: {}) => {
  return (
    <>
      <GridAndControls />
      <spotLight position={[0, 250, 0]} rotation={[0, 180, 0]} />
      <hemisphereLight intensity={0.8} />
      <group>
        <SimpleModel url="/models/0522/GW_ThumbUp_0522.fbx" />
      </group>
      <group position={[2, 0, 0]}>
        <SimpleModel url="/models/0522/GW_Applause_01.fbx" />
      </group>
      <group position={[4, 0, 0]}>
        <SimpleModel url="/models/0522/GW_EndGame_01.fbx" />
      </group>
      <group position={[6, 0, 0]}>
        <SimpleModel url="/models/0522/GW_Laughing_01.fbx" />
      </group>
      <group position={[8, 0, 0]}>
        <SimpleModel url="/models/0522/GW_EasterEgg_01.fbx" />
      </group>
      <group position={[10, 0, 0]}>
        <SimpleModel url="/models/0522/GW_MoonWalking_0522.fbx" />
      </group>
    </>
  );
};

const AnimationExample = () => {
  return (
    <div className={styles.root}>
      <Canvas className={styles.canvas} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default memo(AnimationExample);
