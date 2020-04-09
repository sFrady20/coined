import React, { useEffect, useMemo, useState } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer, AnimationObjectGroup } from "three";

const SCENE_NODES = "Dreyar";
const SCENE_MATERIAL = "dreyar_M";

export default () => {
  const george: any = useLoader(GLTFLoader, "./george.glb");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [meshRef, setMeshRef] = useState<AnimationObjectGroup>();

  const mixer = useMemo(() => meshRef && new AnimationMixer(meshRef), [
    meshRef,
  ]);

  useEffect(() => {
    if (mixer) mixer?.clipAction(george.animations[0]).play();
  }, [mixer, george]);
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
      setTimeElapsed((t) => t + delta);
    }
  });

  return (
    <>
      <spotLight position={[0, 3, 5]} rotation={[0, 180, 0]} />
      <hemisphereLight intensity={0.8} />
      <group ref={setMeshRef} scale={[0.001, 0.001, 0.001]}>
        <group
          position={[
            Math.sin(timeElapsed / 2) * 1000,
            0,
            Math.cos(timeElapsed / 2) * 1000,
          ]}
          rotation={[
            Math.sin(timeElapsed / 1.25) * 0.2 + 0.5,
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
    </>
  );
};
