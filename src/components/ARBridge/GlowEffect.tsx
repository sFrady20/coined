import { CylinderBufferGeometry, MeshBasicMaterial, Mesh } from "three";
import _ from "lodash";
import {
  EffectPass,
  GodRaysEffect,
  KernelSize,
  //@ts-ignore
} from "postprocessing";
import ARController from "./ARController";

class GlowEffect {
  private context: ARController;

  public mesh: Mesh;
  public godRays!: any;

  constructor(context: ARController) {
    this.context = context;

    let geo = new CylinderBufferGeometry(1.1, 0.9, 0.2, 32, 2);
    let mat = new MeshBasicMaterial({ color: 0xffccaa });
    this.mesh = new Mesh(geo, mat);
    this.mesh.position.set(0, 0, -1);

    this.godRays = new GodRaysEffect(context.camera, this.mesh, {
      samples: 100,
      kernelSize: KernelSize.HUGE,
    });
    context.composer.addPass(new EffectPass(context.camera, this.godRays));
  }

  update = (delta: number) => {
    this.mesh.position.set(0, Math.sin(this.context.clock.elapsedTime), -1);
    if (this.context.detectState) {
      this.godRays.lightSource.material.opacity = _.clamp(
        0.9 + Math.sin(this.context.clock.elapsedTime) * 0.1,
        0,
        1
      );
    } else {
      this.godRays.lightSource.material.opacity = 0;
    }
  };
}

export default GlowEffect;
