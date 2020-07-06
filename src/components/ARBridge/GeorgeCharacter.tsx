import {
  AnimationMixer,
  Object3D,
  Euler,
  Matrix4,
  Quaternion,
  AnimationAction,
  AnimationClip,
  LoopOnce,
  LoopRepeat,
} from "three";
import ARController from "./ARController";
import _ from "lodash";

const lookAt = (eye: Object3D, target: Object3D) => {
  eye.updateWorldMatrix(true, false);
  const pos = eye.position.clone().setFromMatrixPosition(eye.matrixWorld);
  var m = new Matrix4().lookAt(target.position, pos, target.up);
  var fq = new Quaternion().setFromRotationMatrix(m);
  if (eye.parent) {
    const m4 = new Matrix4().extractRotation(eye.parent.matrixWorld);
    const q4 = new Quaternion().setFromRotationMatrix(m4);
    fq.premultiply(q4.inverse());
  }
  return fq;
};

const DISABLED_BONES = [
  "mixamorig_Head.quaternion",
  "EYE_LEFT.quaternion",
  "EYE_RIGHT.quaternion",
];

class GeorgeCharacter {
  private context: ARController;
  public model: Object3D;
  public mixer: AnimationMixer;
  public nodes: { [s: string]: Object3D };
  private lastUpdate = Date.now();
  private idleAnimation!: AnimationClip;
  private currentAnimation?: AnimationAction;

  constructor(context: ARController) {
    this.context = context;

    this.model = context.assets.models["idle"];
    this.model.scale.set(0.02, 0.02, 0.02);
    this.model.visible = false;
    this.context.root.add(this.model);

    //@ts-ignore
    this.idleAnimation = this.model.animations[0];

    this.nodes = {};
    this.model.traverse((d: Object3D) => (this.nodes[d.name] = d));

    this.mixer = new AnimationMixer(this.model);
    this.mixer.addEventListener("finished", this.returnToIdle); //auto reset to idle

    //start as idle
    this.returnToIdle().fadeOut(0);
  }

  public update = () => {
    const { camera } = this.context.getXR8Scene();

    const head: Object3D = this.nodes["mixamorig_Head"];
    const neck: Object3D = this.nodes["mixamorig_Neck"];
    const leftEye: Object3D = this.nodes["EYE_LEFT"];
    const rightEye: Object3D = this.nodes["EYE_RIGHT"];

    const neckTarget = lookAt(neck, camera);
    const a = new Euler().setFromQuaternion(neckTarget);
    a.y = _.clamp(a.y, -0.6, 0.6);
    a.x = _.clamp(a.x, -0.5, 0.1) + 0.5;
    a.z = _.clamp(a.z, -0.6, 0.6);
    neckTarget.setFromEuler(a);
    const cross = new Euler()
      .setFromQuaternion(neckTarget)
      .toVector3()
      .normalize()
      .cross(neck.rotation.toVector3().normalize())
      .length();
    neck.quaternion.slerp(neckTarget, 0.07 + 0.1 * cross);

    const eyeTarget = lookAt(head, camera);
    const a2 = new Euler().setFromQuaternion(eyeTarget);
    a2.x = _.clamp(a2.x, -0.2, 0.2) + 0.1;
    a2.y = _.clamp(a2.y, -0.2, 0.2) + 0.1;
    a2.z = _.clamp(a2.z, -0.2, 0.2);
    eyeTarget.setFromEuler(a2);
    leftEye.quaternion.slerp(eyeTarget, 0.1);
    rightEye.quaternion.slerp(eyeTarget, 0.1);

    const now = Date.now();
    this.mixer.update((now - this.lastUpdate) / 1000);
    this.lastUpdate = now;
  };

  public playAnimation = (animation: AnimationClip) => {
    //remove tracked bones from animation
    _.remove(animation.tracks, (t: any) => DISABLED_BONES.includes(t.name));

    const animAction = this.mixer.clipAction(animation);
    animAction.setLoop(LoopOnce, 1);
    if (this.currentAnimation) {
      animAction.crossFadeFrom(this.currentAnimation, 0.2, true);
    } else {
      animAction.setEffectiveWeight(1);
    }
    animAction.reset();
    animAction.play();
    this.currentAnimation = animAction;
    return animAction;
  };

  public returnToIdle = () => {
    //remove tracked bones from animation
    _.remove(this.idleAnimation.tracks, (t: any) =>
      DISABLED_BONES.includes(t.name)
    );

    const idleAction = this.mixer.clipAction(this.idleAnimation);
    idleAction.setLoop(LoopRepeat, Infinity);
    if (this.currentAnimation) {
      idleAction.crossFadeFrom(this.currentAnimation, 0.2, true);
    } else {
      idleAction.setEffectiveWeight(1);
    }
    idleAction.enabled = true;
    idleAction.setEffectiveTimeScale(1);
    idleAction.play();
    this.currentAnimation = idleAction;
    return idleAction;
  };
}

export default GeorgeCharacter;
