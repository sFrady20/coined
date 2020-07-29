import * as THREE from "three";
import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";
import {
  GridHelper,
  EventDispatcher,
  Object3D,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  Quaternion,
  Clock,
  CylinderBufferGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";
import { DEVELOPMENT_MODE, AUTO_FOV } from "../../config";
import NN from "./models/NN_USQUARTER_3.json";
import { AssetContextType } from "../AssetLoader";
import GeorgeCharacter from "./GeorgeCharacter";
import { MouseEvent } from "react";
import _ from "lodash";
import {
  EffectComposer,
  EffectPass,
  RenderPass,
  GodRaysEffect,
  //@ts-ignore
} from "postprocessing";

//@ts-ignore
const WebARRocksObject = window.WEBARROCKSOBJECT;

window.THREE = THREE;

var v2 = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

class ARController {
  public stream!: MediaStream;
  public video!: HTMLVideoElement;
  public canvas!: HTMLCanvasElement;
  public debugCanvas!: HTMLCanvasElement;
  public assets!: AssetContextType;
  public events = new EventDispatcher();
  public detectState?: WebARRocksDetectState;
  public orientation!: DeviceOrientationControls;
  public clock = new Clock();

  public scene!: Scene;
  public camera!: PerspectiveCamera;
  public renderer!: WebGLRenderer;
  public root: Object3D = new Object3D();
  public surface!: THREE.Mesh;
  public george!: GeorgeCharacter;
  public composer!: any;
  public godRays!: any;

  public isCoinDetectionEnabled = true;

  private isInited = false;
  private isCoinDetectionStarted = false;
  private prevCoinDetection: string | false = false;
  private rootPosition = new Vector3();
  private rootRotation = new Quaternion();

  public init = async (assets: AssetContextType) => {
    //only run once
    if (this.isInited) return;
    this.isInited = true;

    //save assets
    this.assets = assets;

    //find video element
    this.video = document.getElementById("cameraFeed") as HTMLVideoElement;

    //find canvas element
    this.canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
    this.debugCanvas = document.getElementById(
      "debugCanvas"
    ) as HTMLCanvasElement;

    //init stream
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { min: 640, max: 1920, ideal: 1280 },
        height: { min: 640, max: 1920, ideal: 720 },
        facingMode: "environment",
      },
      audio: false,
    });
    await new Promise((resolve) => {
      this.video.addEventListener("play", resolve);
      this.video.srcObject = this.stream;
    });

    this.initThreeScene();
    this.initCoinDetection();

    requestAnimationFrame(this.update);
  };

  private initThreeScene = () => {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });

    // let circleGeo = new CylinderBufferGeometry(1.1, 0.9, 0.2, 32, 2);
    // let circleMat = new MeshBasicMaterial({ color: 0xffccaa });
    // let circle = new Mesh(circleGeo, circleMat);
    // circle.position.set(0, 0, -1);
    // this.root.add(circle);

    // this.godRays = new GodRaysEffect(this.camera, circle, {
    //   resolutionScale: 1,
    //   density: 2,
    //   decay: 0.95,
    //   weight: 0.5,
    //   samples: 100,
    // });

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    //this.composer.addPass(new EffectPass(this.camera, this.godRays));

    this.camera.position.set(0, 3, 0);

    this.scene.add(new THREE.AmbientLight(0x404040, 0.5));

    const inivisible = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
    });

    this.surface = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100, 1, 1),
      inivisible
    );
    this.surface.rotateX(-Math.PI / 2);
    this.surface.position.set(0, 0, 0);
    this.scene.add(this.surface);

    this.george = new GeorgeCharacter(this);

    this.orientation = new DeviceOrientationControls(this.camera);
    this.orientation.connect();

    if (DEVELOPMENT_MODE) {
      var grid = new GridHelper(2000, 20, 0x000000, 0x000000);
      this.scene.add(grid);
    }

    this.scene.add(this.root);
  };

  private initCoinDetection = () => {
    // Initialize WebAR.rocks.object:
    WebARRocksObject.init({
      video: this.video,
      canvas: this.debugCanvas,
      followZRot: false,
      isDebugRender: DEVELOPMENT_MODE,
      scanSettings: {
        margins: 0.1, // 0-> no margin, 1-> 100% margins
        nSweepXYsteps: 12 * 12, // number of X,Y steps,
        nSweepSsteps: 4, // number of scale steps. total number of sweep steps = nSweepXYsteps * nSweepSsteps
        sweepScaleRange: [0.4, 0.7], // range of the detection window scale. 1-> whole window minDim (do not take account of margins)
        sweepStepMinPx: 16, // minimum size of a step in pixels
        sweepShuffle: true, // randomize scaning
      },
      callbackReady: () => {
        // Set neural network model:
        WebARRocksObject.set_NN(
          NN,
          (err?: any) => {
            if (err) console.error(`Detection Error: ${err.message}`);
            //mark as started
            this.isCoinDetectionStarted = true;
          },
          {
            notHereFactor: 0.0,
            paramsPerLabel: {
              USQUARTER: {
                thresholdDetect: 0.4,
              },
            },
          }
        );
      },
    });
  };

  private update = () => {
    const delta = this.clock.getDelta();

    this.updateCoinDetection(delta);

    this.orientation.update();

    this.george.update(delta);

    // compute vertical field of view:
    if (AUTO_FOV) {
      // compute aspectRatio:
      const canvasElement = this.renderer.getContext().canvas;
      const cvw = canvasElement.width;
      const cvh = canvasElement.height;
      const canvasAspectRatio = cvw / cvh;

      const vw = 720;
      const vh = 1080;
      const videoAspectRatio = vw / vh;
      const fovFactor = vh > vw ? 1.0 / videoAspectRatio : 1.0;
      const fov = 35 * fovFactor;

      // compute X and Y offsets in pixels:
      let scale = 1.0;
      if (canvasAspectRatio > videoAspectRatio) {
        // the canvas is more in landscape format than the video, so we crop top and bottom margins:
        scale = cvw / vw;
      } else {
        // the canvas is more in portrait format than the video, so we crop right and left margins:
        scale = cvh / vh;
      }
      const cvws = vw * scale,
        cvhs = vh * scale;
      const offsetX = (cvws - cvw) / 2.0;
      const offsetY = (cvhs - cvh) / 2.0;
      //const _scaleW = cvw / cvws;

      // apply parameters:
      this.camera.aspect = canvasAspectRatio;
      this.camera.fov = fov;
      this.camera.setViewOffset(cvws, cvhs, offsetX, offsetY, cvw, cvh);
      this.camera.updateProjectionMatrix();
    }

    // const intensity = Math.sin(this.clock.elapsedTime * 2) * 0.5 + 0.5;
    // this.godRays.lightSource.material.opacity = _.clamp(intensity / 1, 0, 1);

    this.composer.render(delta);
    //this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.update);
  };

  private updateCoinDetection = (delta: number) => {
    if (!this.isCoinDetectionStarted) return;
    if (!this.isCoinDetectionEnabled) return;
    if (this.george.isFloating) return;

    this.detectState = WebARRocksObject.detect(0, null, {
      isKeepTracking: true,
      isSkipConfirmation: false,
      thresholdDetectFactor: 1,
      cutShader: "median",
      thresholdDetectFactorUnstitch: 0.1,
      trackingFactors: [0.3, 0.3, 1.0],
    });

    if (this.detectState && (this.detectState.detectScore || 0) > 0.8) {
      // const pos = new Vector3(0, 0, -6);
      // this.camera.localToWorld(pos);
      // this.rootPosition.copy(pos);

      // const v1 = new Vector3();
      // this.model.getWorldPosition(v1);
      // const v2 = new Vector3();
      // camera.getWorldPosition(v2);
      // const dir = v1.sub(v2).normalize();

      // var mx = new Matrix4();
      // mx.makeRotationY(Math.atan2(-dir.z, dir.x) - 90 * MathUtils.DEG2RAD);
      // this.rootRotation.copy(new Quaternion().setFromRotationMatrix(mx))

      this.root.position.copy(
        new Vector3(
          this.detectState.positionScale[0] * this.canvas.width * 2 + 1,
          (1 - this.detectState.positionScale[1]) * this.canvas.height * 2 + 1,
          0.99
        ).unproject(this.camera)
      );

      if (this.prevCoinDetection !== this.detectState.label) {
        this.events.dispatchEvent({
          type: "onDetectStart",
          state: this.detectState,
        });
        this.prevCoinDetection = this.detectState.label;
      }
    } else {
      if (this.prevCoinDetection !== false) {
        this.events.dispatchEvent({
          type: "onDetectEnd",
          state: this.detectState,
        });
        this.prevCoinDetection = false;
      }
    }

    this.root.position.lerp(this.rootPosition, 0.1 * delta);
    this.root.quaternion.slerp(this.rootRotation, 1 * delta);
  };

  //find surface point from screen point
  private castSurface = (
    screenX: number,
    screenY: number
  ): [number, number] | undefined => {
    v2.x = (screenX / window.innerWidth) * 2 - 1;
    v2.y = -(screenY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(v2, this.camera);
    const intersects = raycaster.intersectObject(this.surface);

    if (intersects.length > 0) {
      return [intersects[0].point.x, intersects[0].point.z];
    } else {
      return undefined;
    }
  };

  //find surface point from screen point
  public handleClick = (e: MouseEvent) => {
    v2.x = (e.clientX / window.innerWidth) * 2 - 1;
    v2.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(v2, this.camera);
    const intersects = raycaster.intersectObject(this.george.model, true);

    if (intersects.length > 0 && this.george.model.visible) {
      this.george.playAnimation(this.assets.models.easterEgg.animations[0]);
      this.assets.sfx["huzzah"].stop().play();
    }
  };
}

export default ARController;
