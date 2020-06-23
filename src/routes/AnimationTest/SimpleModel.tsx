import React, { useEffect, useMemo, memo } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { AnimationMixer, LoopRepeat } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const SimpleModel = memo((props: { url: string; loader?: any }) => {
  const { url, loader = FBXLoader } = props;
  const model = useLoader(loader, url) as any;
  const modelScene = useMemo(
    () => (model && loader === FBXLoader ? model : model.scene),
    [model, loader]
  );
  const mixer = useMemo(() => model && new AnimationMixer(modelScene), [
    model,
    modelScene,
  ]);

  const returnToIdle = useMemo(
    () => () => {
      if (!mixer || !model) return;
      const idleAction = mixer.clipAction(model.animations[0]);
      idleAction.setLoop(LoopRepeat, Infinity);
      idleAction.play();
      return idleAction;
    },
    [model, mixer]
  );

  useEffect(() => {
    if (mixer) {
      (async () => {
        //start as idle
        returnToIdle();
      })();
    }
  }, [mixer, returnToIdle]);

  useFrame((state, delta) => {
    if (mixer) mixer.update(delta);
  });

  return (
    <group scale={[0.02, 0.02, 0.02]}>
      <primitive object={modelScene} />
    </group>
  );
});

export default SimpleModel;
