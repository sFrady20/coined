import React, { useEffect, useMemo, memo } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { AnimationMixer, LoopRepeat } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import _ from "lodash";

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

  const mesh = useMemo(
    () => _.find(model.children, (c) => c.morphTargetInfluences),
    [model]
  );

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
    if (mesh) {
      const x = state.clock.elapsedTime * 4;
      const n = (o: number) =>
        (Math.sin(2 * (x + o)) + Math.sin(Math.PI * (x + o))) * 0.5 + 0.5;
      mesh.morphTargetInfluences = [
        n(27.252) /*big open*/,
        n(35.2357) * 0.3 /*eyebrows*/,
        n(96.35) /*smling open*/,
        n(148.7) * 0.8 /*Oh face*/,
        n(14.51) * 0.1 /*the rock*/,
      ];
    }
    if (mixer) mixer.update(delta);
  });

  return (
    <group scale={[0.02, 0.02, 0.02]}>
      <primitive object={modelScene} />
    </group>
  );
});

export default SimpleModel;
