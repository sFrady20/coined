import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  GridHelper,
  EventDispatcher,
  Object3D,
  Scene,
  Camera,
  Renderer,
} from "three";
import { DEVELOPMENT_MODE } from "../../config";
import NN from "./models/NN_USQUARTER_3.json";
import { AssetContextType } from "../AssetLoader";
import GeorgeCharacter from "./GeorgeCharacter";
import { MouseEvent } from "react";

//@ts-ignore
const WebARRocksObject = window.WEBARROCKSOBJECT;

export type XR8 = {
  Threejs: {
    xrScene: () => {
      scene: THREE.Scene;
      camera: THREE.Camera;
      renderer: THREE.Renderer;
    };
    [s: string]: any;
  };
  [s: string]: any;
};
window.THREE = THREE;

var XR8 = (window as any).XR8 as XR8;

var v2 = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

class ARController {
  public stream!: MediaStream;
  public video!: HTMLVideoElement;
  public canvas!: HTMLCanvasElement;
  public assets!: AssetContextType;
  public events = new EventDispatcher();
  public detectState?: WebARRocksDetectState;

  public root: Object3D = new Object3D();
  public surface!: THREE.Mesh;
  public george!: GeorgeCharacter;
  public composer!: any;
  public godRays!: any;

  public isCoinDetectionEnabled = true;

  private isInited = false;
  private isCoinDetectionStarted = false;
  private prevCoinDetection: string | false = false;

  public init(assets: AssetContextType) {
    //only run once
    if (this.isInited) return;
    this.isInited = true;

    //redifine xr8 (in case it wasn't loaded before)
    XR8 = (window as any).XR8 as XR8;

    //find canvas element
    this.canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;

    //save assets
    this.assets = assets;

    //start xr8
    XR8.addCameraPipelineModule(XR8.XrController.pipelineModule());
    XR8.addCameraPipelineModule(XR8.GlTextureRenderer.pipelineModule());
    XR8.addCameraPipelineModule(XR8.Threejs.pipelineModule());
    XR8.addCameraPipelineModule({
      name: "coined",
      onCameraStatusChange: this.handleXR8ConCameraStatusChange,
      onStart: this.handleXR8Start,
      onUpdate: this.handleXR8Update,
    });
    XR8.run({ canvas: this.canvas });
  }

  public getXR8Scene = () => {
    const XR8 = (window as any).XR8 as XR8;
    return XR8.Threejs.xrScene() as {
      scene: Scene;
      camera: Camera;
      renderer: Renderer;
    };
  };

  //find surface point from screen point
  private castSurface(
    screenX: number,
    screenY: number
  ): [number, number] | undefined {
    const { camera } = this.getXR8Scene();

    v2.x = (screenX / window.innerWidth) * 2 - 1;
    v2.y = -(screenY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(v2, camera);
    const intersects = raycaster.intersectObject(this.surface);

    if (intersects.length > 0) {
      return [intersects[0].point.x, intersects[0].point.z];
    } else {
      return undefined;
    }
  }

  //find surface point from screen point
  public handleClick = (e: MouseEvent) => {
    const { camera } = this.getXR8Scene();

    v2.x = (e.clientX / window.innerWidth) * 2 - 1;
    v2.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(v2, camera);
    const intersects = raycaster.intersectObject(this.george.model, true);

    if (intersects.length > 0 && this.george.model.visible) {
      this.george.playAnimation(this.assets.models.easterEgg.animations[0]);
      this.assets.sfx["huzzah"].stop().play();
    }
  };

  private initThreeScene = () => {
    const { scene, camera, renderer } = this.getXR8Scene();
    camera.position.set(0, 3, 0);

    scene.add(new THREE.AmbientLight(0x404040, 0.5));

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
    scene.add(this.surface);

    this.george = new GeorgeCharacter(this);

    if (DEVELOPMENT_MODE) {
      // Add some objects to the scene and set the starting camera position.
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      var grid = new GridHelper(2000, 20, 0x000000, 0x000000);
      scene.add(grid);
    }

    scene.add(this.root);
  };

  private initCoinDetection = () => {
    // Initialize WebAR.rocks.object:
    WebARRocksObject.init({
      video: this.video,
      canvas: document.getElementById("debugCanvas"),
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

  private updateCoinDetection = () => {
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
    if (this.detectState && (this.detectState.detectScore || 0) > 0.9) {
      const hit = this.castSurface(
        this.detectState.positionScale[0] * this.canvas.width,
        (1 - this.detectState.positionScale[1]) * this.canvas.height
      );
      if (hit) this.root.position.set(hit[0], 0, hit[1]);

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
  };

  private handleXR8Start = () => {
    const { camera } = XR8.Threejs.xrScene();

    this.initThreeScene();

    // Sync the xr controller's 6DoF position and camera paremeters with our scene.
    XR8.XrController.updateCameraProjectionMatrix({
      origin: camera.position,
      facing: camera.quaternion,
    });
  };
  private handleXR8Update = () => {
    this.updateCoinDetection();
    this.george.update();
  };
  private handleXR8ConCameraStatusChange = ({
    status,
    stream,
    video,
  }: {
    status: "requesting" | "hasStream" | "hasVideo" | "failed";
    stream: MediaStream;
    video: HTMLVideoElement;
  }) => {
    if (stream) this.stream = stream;
    if (video) this.video = video;

    if (this.stream && this.video) {
      this.initCoinDetection();
    }
  };
}

export default ARController;
