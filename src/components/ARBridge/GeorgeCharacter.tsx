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
  Vector3,
  SkinnedMesh,
} from "three";
import ARController from "./ARController";
import _ from "lodash";
import { Howl } from "howler";
import yRotTowards from "../../util/yRotTowards";
import { GEORGE_SNAP_THRESHOLD } from "../../config";

export const lookAt = (eye: Object3D, target: Object3D) => {
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

const ASPECT_REFERENCE = 652 / 412;
const w = window as any;
w.calc = ASPECT_REFERENCE;

const DISABLED_BONES = [
  //"cane_targetr.position", //moves root for some reason
  //"cane_targetr.quaternion", //moves root for some reason
  //"cane_targetr.scale",
  "mixamorig_Head.quaternion",
  "EYE_LEFT.quaternion",
  "EYE_RIGHT.quaternion",
  //"GW_RIGGED4.position",
  //"GW_RIGGED4.quaternion",
  //"GW_RIGGED4.scale",
];

class GeorgeCharacter {
  private context: ARController;
  public root: Object3D;
  public model: Object3D;
  public mixer: AnimationMixer;
  public mesh: SkinnedMesh;
  public nodes: { [s: string]: Object3D };
  public waitTimeout?: NodeJS.Timeout; //ad
  public floatLocked = false;
  public isCentered = true;
  private lastUpdate = Date.now();
  private idleAnimation!: AnimationClip;

  private currentAnimation?: AnimationAction;
  private currentSfx?: Howl;

  constructor(context: ARController) {
    this.context = context;

    this.root = new Object3D();
    this.root.scale.set(0.04, 0.04, 0.04);
    this.context.scene.add(this.root);

    this.model = context.assets.models["base"];
    this.model.visible = false;
    this.root.add(this.model);
    //hide disc mesh
    _.forEach(this.model.children, (c) => {
      if (c.name === "Disc") c.visible = false;
    });

    //@ts-ignore
    this.idleAnimation = context.assets.models["idle"].animations[0];

    this.nodes = {};
    this.model.traverse((d: Object3D) => (this.nodes[d.name] = d));

    this.mesh = _.find(
      this.model.children,
      (c) => (c as SkinnedMesh).morphTargetInfluences
    ) as SkinnedMesh;

    this.mixer = new AnimationMixer(this.model);
    this.mixer.addEventListener("finished", this.returnToIdle); //auto reset to idle

    //start as idle
    this.returnToIdle().fadeOut(0);
  }

  public update = (delta: number) => {
    const camera = this.context.camera;

    const head: Object3D = this.nodes["mixamorig_Head"];
    const neck: Object3D = this.nodes["mixamorig_Neck"];
    const leftEye: Object3D = this.nodes["EYE_LEFT"];
    const rightEye: Object3D = this.nodes["EYE_RIGHT"];

    const neckTarget = lookAt(neck, camera);
    const a = new Euler().setFromQuaternion(neckTarget);
    a.y = _.clamp(a.y, -0.6, 0.6);
    a.x = _.clamp(a.x, -0.5, 0.15) + 0.5;
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
    a2.x = _.clamp(a2.x, -0.2, -0.15) + 0.1;
    a2.y = _.clamp(a2.y, -0.2, 0.2) + 0.1;
    a2.z = _.clamp(a2.z, -0.2, 0.2);
    eyeTarget.setFromEuler(a2);
    leftEye.quaternion.slerp(eyeTarget, 0.1);
    rightEye.quaternion.slerp(eyeTarget, 0.1);

    if (this.mesh && this.mesh.morphTargetInfluences) {
      if (
        this.currentSfx &&
        this.currentSfx.playing &&
        this.currentSfx.seek() < this.currentSfx.duration()
      ) {
        const x = this.context.clock.elapsedTime * 5;
        const n = (o: number) =>
          (Math.sin(2 * (x + o)) + Math.sin(Math.PI * (x + o))) * 0.5 + 0.5;
        this.mesh.morphTargetInfluences[0] = n(27.252); /*big open*/
        this.mesh.morphTargetInfluences[1] =
          n(35.2357) * 0.3 + 0.3 /*eyebrows*/;
        this.mesh.morphTargetInfluences[2] = n(96.35) /*smling open*/;
        this.mesh.morphTargetInfluences[3] = n(148.7) * 0.8 /*Oh face*/;
        this.mesh.morphTargetInfluences[4] = n(14.51) * 0.1 /*the rock*/;
      } else {
        this.mesh.morphTargetInfluences[3] = 0 /*Oh face*/;
      }
    }

    const now = Date.now();
    this.mixer.update((now - this.lastUpdate) / 1000);
    this.lastUpdate = now;

    if (
      !this.floatLocked &&
      this.context.detectState &&
      (this.context.detectState.avgDetectScore || 0) > GEORGE_SNAP_THRESHOLD
    ) {
      //if quarter detected land on quarter
      this.root.position.lerp(this.context.quarterPosition, 20 * delta);
      this.root.quaternion.slerp(this.context.quarterRotation, 7 * delta);
    } else {
      //no quarter so free to float
      const calc =
        window.innerHeight / window.innerWidth / ASPECT_REFERENCE - 1;

      const targetPos = (this.isCentered
        ? new Vector3(0, -0.3 - 0.2528 * calc, 0.983 - 0.0037 * calc)
        : new Vector3(0, 0.036 - 0.706 * calc, 0.986 - 0.0136 * calc)
      ).unproject(this.context.camera);

      const targetRot = yRotTowards(
        this.root.getWorldPosition(new Vector3(0, 0, 0)),
        camera.getWorldPosition(new Vector3(0, 0, 0)),
        -90
      );

      this.root.position.lerp(targetPos, 3 * delta);
      this.root.quaternion.slerp(targetRot, 3 * delta);
    }
  };

  public snapToQuarter = () => {
    this.root.position.copy(this.context.quarterPosition);
    this.root.quaternion.copy(this.context.quarterRotation);
  };

  public playAnimation = (animation?: AnimationClip | AnimationClip[]) => {
    if (Array.isArray(animation)) {
      animation = _(animation)
        .orderBy(() => Math.random())
        .first();
    }
    if (!animation) return;

    //remove tracked bones from animation
    _.remove(animation.tracks, (t: any) => DISABLED_BONES.includes(t.name));

    const animAction = this.mixer.clipAction(animation);
    animAction.setLoop(LoopOnce, 1);
    if (this.currentAnimation) {
      animAction.crossFadeFrom(this.currentAnimation, 0.4, true);
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
      idleAction.crossFadeFrom(this.currentAnimation, 0.4, true);
    } else {
      idleAction.setEffectiveWeight(1);
    }
    idleAction.enabled = true;
    idleAction.setEffectiveTimeScale(1);
    idleAction.play();
    this.currentAnimation = idleAction;
    return idleAction;
  };

  public say = (sfx?: Howl | Howl[]) => {
    if (Array.isArray(sfx)) {
      sfx = _(sfx)
        .orderBy(() => Math.random())
        .first();
    }
    if (!sfx) return;

    if (this.currentSfx) this.currentSfx.stop();
    sfx.once("end", () => {
      this.currentSfx = undefined;
    });
    sfx.once("stop", () => {
      this.currentSfx = undefined;
    });
    sfx.play();
    this.currentSfx = sfx;
  };
  public shutup = () => {
    if (this.waitTimeout) clearTimeout(this.waitTimeout);
    if (this.currentSfx) this.currentSfx.stop();
    if (this.currentAnimation) this.returnToIdle();
  };
}

export default GeorgeCharacter;
