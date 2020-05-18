import React, { Suspense, useEffect, useState, useMemo, memo } from "react";
import styles from "./index.module.scss";
import { Canvas, useThree } from "react-three-fiber";
import FBXModel, { FBXModelRefAttributes } from "../../canvas/FBXModel";
import { GridHelper } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import useFBXAnimations from "../../canvas/FBXModel/useFBXAnimations";
import _ from "lodash";

export const GridAndControls = () => {
  const { scene, camera, gl } = useThree();

  useEffect(() => {
    if (gl && camera) {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.update();

      var grid = new GridHelper(2000, 20, 0x000000, 0x000000);
      scene.add(grid);

      return () => {
        controls.dispose();
        scene.remove(grid);
      };
    }
  }, [gl, camera, scene]);

  return <></>;
};

const AnimationExample = () => {
  const [modelRef, setModelRef] = useState<FBXModelRefAttributes | null>(null);

  const defAnims = useFBXAnimations("/models/kid/kid.fbx", ["default"]);
  const winAnims = useFBXAnimations("/models/kid/win.fbx", ["win"]);
  const loseAnims = useFBXAnimations("/models/kid/lose.fbx", ["lose"]);
  const anims = useMemo(() => _.merge({}, defAnims, winAnims, loseAnims), [
    defAnims,
    winAnims,
    loseAnims,
  ]);

  useEffect(() => {
    if (modelRef && defAnims) {
      modelRef.triggerAnimation(defAnims["default"], true);
    }
  }, [modelRef, defAnims]);

  return (
    <div className={styles.root}>
      <Canvas className={styles.canvas} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <GridAndControls />
          <spotLight position={[0, 250, 0]} rotation={[0, 180, 0]} />
          <hemisphereLight intensity={0.8} />
          <FBXModel ref={setModelRef} file="/models/kid/kid.fbx" />
        </Suspense>
      </Canvas>
      <div className={styles.actions}>
        <button
          onClick={() => {
            modelRef?.triggerAnimation(anims["win"]);
          }}
        >
          Trigger Win animation
        </button>
        <button
          onClick={() => {
            modelRef?.triggerAnimation(anims["lose"]);
          }}
        >
          Trigger Lose animation
        </button>
      </div>
    </div>
  );
};

export default memo(AnimationExample);
