import {
  Mesh,
  CylinderBufferGeometry,
  ShaderMaterial,
  BackSide,
  FrontSide,
  IUniform,
  Vector3,
  Object3D,
} from "three";
import coneVertexShader from "!raw-loader!./coneVertex.glsl";
import coneFragmentShader from "!raw-loader!./coneFragment.glsl";

const makeGlowEffectCone = (
  parent: Object3D,
  uniforms: { [s: string]: IUniform },
  height: number = 1,
  spread: number = 1,
  zOrder: number = 0
) => {
  const geometry = new CylinderBufferGeometry(1 + spread, 1, 1 + height, 32, 2);
  const pos = new Vector3(0, (1 + height) / 2, 0);

  let frontMesh = new Mesh(
    geometry,
    new ShaderMaterial({
      fragmentShader: coneFragmentShader,
      vertexShader: coneVertexShader,
      transparent: true,
      side: FrontSide,
      uniforms,
    })
  );
  frontMesh.renderOrder = 10 + zOrder;
  frontMesh.position.copy(pos);
  parent.add(frontMesh);

  let backMesh = new Mesh(
    geometry,
    new ShaderMaterial({
      fragmentShader: coneFragmentShader,
      vertexShader: coneVertexShader,
      transparent: true,
      side: BackSide,
      uniforms,
    })
  );
  backMesh.renderOrder = 1 + zOrder;
  backMesh.position.copy(pos);
  parent.add(backMesh);

  const update = () => {};

  return {
    update,
  };
};

export default makeGlowEffectCone;
