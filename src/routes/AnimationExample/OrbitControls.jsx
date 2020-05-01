import React, { useRef } from "react";
import { extend, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({
  OrbitControls,
});

export default () => {
  const controlsRef = useRef();
  const { camera } = useThree();

  useFrame(() => controlsRef.current?.update());

  return <orbitControls ref={controlsRef} args={[camera]} />;
};
