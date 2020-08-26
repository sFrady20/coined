import {
  Mesh,
  ShaderMaterial,
  PlaneBufferGeometry,
  MathUtils,
  IUniform,
  Object3D,
} from "three";
import planeVertexShader from "!raw-loader!./planeVertex.glsl";
import planeFragmentShader from "!raw-loader!./planeFragment.glsl";

const makeGlowEffectPlane = (
  parent: Object3D,
  uniforms: { [s: string]: IUniform }
) => {
  let plane = new Mesh(
    new PlaneBufferGeometry(3, 3, 1, 1),
    new ShaderMaterial({
      fragmentShader: planeFragmentShader,
      vertexShader: planeVertexShader,
      transparent: true,
      uniforms,
    })
  );
  plane.rotateX(-90 * MathUtils.DEG2RAD);
  parent.add(plane);

  const update = () => {};

  return {
    update,
  };
};

export default makeGlowEffectPlane;
