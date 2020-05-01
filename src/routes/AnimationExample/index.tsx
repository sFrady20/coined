import React, { useRef, Suspense } from "react";
import styles from "./index.module.scss";
import { Canvas } from "react-three-fiber";
import Model from "../../canvas/Model";
import SharedAnimations from "../../canvas/SharedAnimations";

export default () => {
  const modelRef = useRef<any>();
  const model2Ref = useRef<any>();

  return (
    <div className={styles.root}>
      <Canvas className={styles.canvas}>
        <Suspense fallback={null}>
          <spotLight position={[0, 3, 5]} rotation={[0, 180, 0]} />
          <hemisphereLight intensity={0.8} />
          <SharedAnimations>
            <group position={[-1, -2.3, 0]} scale={[0.15, 0.15, 0.15]}>
              <Model
                ref={model2Ref}
                file="/models/george.glb"
                nodesPath="Dreyar"
                materialPath="dreyar_M"
              />
            </group>
            <group position={[1, -2.3, 0]} scale={[0.65, 0.65, 0.65]}>
              <Model
                ref={modelRef}
                file="/models/kid/waiting.gltf"
                nodesPath="Subdivision_Surface"
                materialPath=""
              />
            </group>
          </SharedAnimations>
        </Suspense>
      </Canvas>
      <div className={styles.actions}>
        <button
          onClick={() => {
            modelRef.current?.triggerAnimation("win");
            model2Ref.current?.triggerAnimation("win");
          }}
        >
          Trigger Win animation
        </button>
        <button
          onClick={() => {
            modelRef.current?.triggerAnimation("lose");
            model2Ref.current?.triggerAnimation("lose");
          }}
        >
          Trigger Lose animation
        </button>
      </div>
    </div>
  );
};
