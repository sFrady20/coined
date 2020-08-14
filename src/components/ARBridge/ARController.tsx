import * as THREE from "three";
import { DeviceOrientationControls } from "./DeviceOrientationControls";
import {
  GridHelper,
  EventDispatcher,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  Quaternion,
  Clock,
  Euler,
} from "three";
import {
  DEVELOPMENT_MODE,
  AUTO_FOV,
  NN_THRESHOLD,
  NN_AVG_POOL,
} from "../../config";
import NN from "./models/NN_USQUARTER_5.json";
import { AssetContextType } from "../AssetLoader";
import GeorgeCharacter from "./GeorgeCharacter";
import { MouseEvent } from "react";
import _ from "lodash";
import {
  EffectComposer,
  RenderPass,
  //@ts-ignore
} from "postprocessing";
import GlowEffect from "./GlowEffect";

//@ts-ignore
const WebARRocksObject = window.WEBARROCKSOBJECT;

window.THREE = THREE;

var v2 = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

type DeviceOrientationControls = any;

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
  public george!: GeorgeCharacter;
  public glow!: GlowEffect;
  public composer!: any;

  public readonly quarterPosition = new Vector3();
  public readonly quarterRotation = new Quaternion();
  public isCoinDetectionEnabled = true;

  private isInited = false;
  private isCoinDetectionStarted = false;
  private prevCoinDetection: string | false = false;
  private isInBackground = false;
  private curY = 0;

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
    await this.initWebcam();

    this.initThreeScene();
    this.initCoinDetection();

    requestAnimationFrame(this.update);

    window.document.addEventListener("visibilitychange", (e) => {
      if (window.document.visibilityState) {
        this.isInBackground = false;
        this.initWebcam();
      } else {
        this.isInBackground = true;
        this.stopWebcam();
      }
    });
  };

  private initWebcam = async () => {
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
  };
  private stopWebcam = () => {
    this.stream.getTracks().forEach((track) => track.stop());
    this.video.pause();
    this.video.srcObject = null;
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

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.camera.position.set(0, 3, 0);

    this.scene.add(new THREE.AmbientLight(0x404040, 0.5));

    this.george = new GeorgeCharacter(this);
    //this.glow = new GlowEffect(this);

    this.orientation = new DeviceOrientationControls(this.camera);
    this.orientation.connect();

    if (DEVELOPMENT_MODE) {
      var grid = new GridHelper(2000, 20, 0x000000, 0x000000);
      this.scene.add(grid);
    }
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
                thresholdDetect: NN_THRESHOLD,
              },
            },
          }
        );
      },
    });
  };

  private update = () => {
    if (!this.isInBackground) {
      const delta = this.clock.getDelta();

      this.updateCoinDetection(delta);

      this.orientation.update();

      this.george.update(delta);
      //this.glow.update(delta);

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

      this.composer.render(delta);
      this.renderer.render(this.scene, this.camera);
    }
    requestAnimationFrame(this.update);
  };

  private updateCoinDetection = (delta: number) => {
    if (!this.isCoinDetectionStarted) return;
    if (!this.isCoinDetectionEnabled) return;
    if (this.george.isFloating && this.george.floatLocked) return;

    this.detectState = WebARRocksObject.detect(0, null, {
      isKeepTracking: true,
      isSkipConfirmation: false,
      thresholdDetectFactor: 1,
      cutShader: "median",
      thresholdDetectFactorUnstitch: 0.1,
      trackingFactors: [0.3, 0.3, 1.0],
    });

    if (this.detectState) {
      this.detectState.scoreHistory = this.detectState?.scoreHistory
        ? _.take(
            [this.detectState.detectScore, ...this.detectState.scoreHistory],
            NN_AVG_POOL
          )
        : [this.detectState?.detectScore];
      this.detectState.avgDetectScore = _.mean(this.detectState.scoreHistory);

      if ((this.detectState.avgDetectScore || 0) > 0.1) {
        if (this.prevCoinDetection !== this.detectState.label) {
          //calculate quarter rotation (towards camera)
          this.curY = this.detectState.yaw - Math.PI / 2;
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

      //calculate quarter position
      this.quarterPosition
        .set(
          this.detectState.positionScale[0] * 2 - 1,
          this.detectState.positionScale[1] * 2 - 1,
          0.96 + (1 - this.detectState.positionScale[2]) * 0.035
        )
        .unproject(this.camera);

      this.quarterRotation.setFromEuler(
        new Euler(
          -(this.detectState.pitch - Math.PI / 2),
          this.detectState.yaw - Math.PI / 2 - this.curY,
          -this.detectState.roll
        )
      );
      //.multiply(this.camera.getWorldQuaternion(new Quaternion()));
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
      this.george.say(this.assets.sfx["huzzah"]);
    }
  };
}

export default ARController;
