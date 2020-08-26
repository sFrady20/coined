import { Scene, IUniform, Group } from "three";
import makeCone from "./cone";
import makeGlowEffectPlane from "./plane";

const makeGlowEffect = (scene: Scene) => {
  const uniforms: { [s: string]: IUniform } = {
    glow: {
      value: 1,
    },
    time: {
      value: 0,
    },
  };

  const group = new Group();

  //const rayCone1 = makeCone(group, uniforms, 6, 1, 2);
  const rayCone2 = makeCone(group, uniforms, 0.5, 2, 1);
  const rayCone3 = makeCone(group, uniforms, 0.1, 3, 0);

  const plane = makeGlowEffectPlane(group, uniforms);

  const update = () => {
    //rayCone1.update();
    rayCone2.update();
    rayCone3.update();

    plane.update();
  };

  return {
    group,
    uniforms,
    update,
  };
};

export default makeGlowEffect;
