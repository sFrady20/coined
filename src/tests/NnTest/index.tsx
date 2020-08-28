import React, { memo, useState, useMemo, useCallback, useEffect } from "react";
import styles from "./index.module.scss";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";
import shortid from "shortid";
import _ from "lodash";
import {
  Vector3,
  Quaternion,
  Euler,
  Camera,
  Clock,
  AmbientLight,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  BoxBufferGeometry,
  MeshPhongMaterial,
  CylinderBufferGeometry,
} from "three";

import NN1 from "../../components/ARBridge/models/NN_USQUARTER_1.json";
import NN2 from "../../components/ARBridge/models/NN_USQUARTER_2.json";
import NN3 from "../../components/ARBridge/models/NN_USQUARTER_3.json";
import NN5 from "../../components/ARBridge/models/NN_USQUARTER_5.json";
import NN6 from "../../components/ARBridge/models/NN_USQUARTER_6.json";
import NN7 from "../../components/ARBridge/models/NN_USQUARTER_7.json";
const Nets = { NN1, NN2, NN3, NN5, NN6, NN7 };

//@ts-ignore
const WebARRocksObject = window.WEBARROCKSOBJECT;

class NnTestController {
  enabled = true;
  detectMargins = 0.1;
  detectThreshold = 0.4;
  detectNotHereFactor = 0.0;
  nSweepXYsteps = 12 * 12;
  nSweepSsteps = 4;
  sweepScaleRangeX = 0.4;
  sweepScaleRangeY = 0.7;
  sweepStepMinPx = 16;
  sweepShuffle = true;
  avgPool = 15;

  prevCoinDetection: string | false = false;
  detectState: any | undefined = undefined;
  quarterPosition = new Vector3();
  quarterRotation = new Quaternion();
  curY = 0;

  videoEl: HTMLVideoElement;
  canvasEl: HTMLCanvasElement;
  debugCanvasEl: HTMLCanvasElement;
  nn: keyof typeof Nets = "NN7";

  stream!: MediaStream;
  camera!: Camera;
  renderer!: WebGLRenderer;
  scene!: Scene;

  clock = new Clock();
  gui = new GUI();
  stats = Stats();

  quarterMesh!: Mesh;

  constructor(
    videoEl: HTMLVideoElement,
    canvasEl: HTMLCanvasElement,
    debugCanvasEl: HTMLCanvasElement
  ) {
    this.videoEl = videoEl;
    this.canvasEl = canvasEl;
    this.debugCanvasEl = debugCanvasEl;

    document.body.appendChild(this.stats.dom);

    this.init();
  }

  init = async () => {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { min: 640, max: 1920, ideal: 1280 },
        height: { min: 640, max: 1920, ideal: 720 },
        facingMode: "environment",
      },
      audio: false,
    });

    await new Promise((resolve) => {
      this.videoEl.addEventListener("play", resolve);
      this.videoEl.srcObject = this.stream || null;
    });

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new WebGLRenderer({
      canvas: this.canvasEl,
      alpha: true,
    });

    this.camera.position.set(0, 3, 0);

    this.scene.add(new AmbientLight(0xffffff, 0.5));

    this.quarterMesh = new Mesh(
      new CylinderBufferGeometry(2, 2, 0.1, 32),
      new MeshPhongMaterial({ color: 0x00ddff, opacity: 0.5 })
    );
    this.scene.add(this.quarterMesh);

    await this.initCoinDetection();
  };

  initCoinDetection = async () => {
    // Initialize WebAR.rocks.object:
    WebARRocksObject.init({
      video: this.videoEl,
      canvas: this.debugCanvasEl,
      followZRot: false,
      isDebugRender: true,
      scanSettings: {
        margins: this.detectMargins, // 0.1, // 0-> no margin, 1-> 100% margins
        nSweepXYsteps: this.nSweepXYsteps, // 12 * 12, // number of X,Y steps,
        nSweepSsteps: this.nSweepSsteps, // 4, // number of scale steps. total number of sweep steps = nSweepXYsteps * nSweepSsteps
        sweepScaleRange: [this.sweepScaleRangeX, this.sweepScaleRangeY], // [0.4, 0.7], // range of the detection window scale. 1-> whole window minDim (do not take account of margins)
        sweepStepMinPx: this.sweepStepMinPx, // 16, // minimum size of a step in pixels
        sweepShuffle: this.sweepShuffle, //true, // randomize scaning
      },
      callbackReady: () => {
        // Set neural network model:
        WebARRocksObject.set_NN(
          Nets[this.nn],
          (err?: any) => {
            if (err) console.error(`Detection Error: ${err.message}`);

            const updater = () => {
              this.stats.update();
              this.update();
              requestAnimationFrame(updater);
            };
            requestAnimationFrame(updater);
          },
          {
            notHereFactor: this.detectNotHereFactor,
            paramsPerLabel: {
              USQUARTER: {
                thresholdDetect: this.detectThreshold,
              },
            },
          }
        );
      },
    });
  };

  stopCoinDetection = async () => {
    await WebARRocksObject.destroy();
  };

  update = () => {
    this.detectState = WebARRocksObject.detect(0, null, {
      isKeepTracking: true,
      isSkipConfirmation: false,
      thresholdDetectFactor: 1,
      cutShader: "median",
      thresholdDetectFactorUnstitch: 0.1,
      trackingFactors: [0.3, 0.3, 1.0],
    });

    if (this.detectState) {
      this.detectState.scoreHistory = this.detectState.scoreHistory
        ? _.take(
            [this.detectState.detectScore, ...this.detectState.scoreHistory],
            this.avgPool
          )
        : [this.detectState.detectScore];
      this.detectState.avgDetectScore = _.mean(this.detectState.scoreHistory);

      if ((this.detectState.avgDetectScore || 0) > 0.1) {
        if (this.prevCoinDetection !== this.detectState.label) {
          //calculate quarter rotation (towards camera)
          this.curY = this.detectState.yaw - Math.PI / 2;
          this.prevCoinDetection = this.detectState.label;
        }
      } else {
        if (this.prevCoinDetection !== false) {
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

      this.quarterMesh.position.copy(this.quarterPosition);
      this.quarterMesh.quaternion.copy(this.quarterRotation);
    }

    this.renderer.render(this.scene, this.camera);
  };
}

const InstanceRenderer = memo(() => {
  const [rootRef, setRootRef] = useState<HTMLDivElement>();
  const [videoEl, setVideoEl] = useState<HTMLVideoElement>();
  const [canvasEl, setCanvasEl] = useState<HTMLCanvasElement>();
  const [debugCanvasEl, setDebugCanvasEl] = useState<HTMLCanvasElement>();
  const [isInit, setInit] = useState(false);

  const init = useCallback(async () => {
    if (!videoEl || !canvasEl || !debugCanvasEl) return;
    if (isInit) return;

    const controller = new NnTestController(videoEl, canvasEl, debugCanvasEl);
    controller.gui.add(controller, "nn").options(_.keys(Nets));
    controller.gui
      .add(controller, "enabled")
      .onChange((v) =>
        v ? controller.initCoinDetection() : controller.stopCoinDetection()
      );

    setInit(true);
  }, [videoEl, canvasEl, debugCanvasEl, setInit, isInit]);
  useEffect(() => {
    init();
  }, [init]);

  const size = useMemo(() => {
    if (rootRef) {
      const rect = rootRef?.getBoundingClientRect();
      return [rect.width, rect.height];
    }
    return [500, 500];
  }, [rootRef]);

  return (
    <div className={styles.root}>
      <div className={styles.renderer} ref={(r) => setRootRef(r || undefined)}>
        <video
          ref={(r) => setVideoEl(r || undefined)}
          className={styles.video}
          id={"cameraFeed"}
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={(r) => setDebugCanvasEl(r || undefined)}
          className={styles.debugCanvas}
          id={"debugCanvas"}
        />
        <canvas
          ref={(r) => setCanvasEl(r || undefined)}
          className={styles.mainCanvas}
          id={"mainCanvas"}
          width={size[0]}
          height={size[1]}
        />
      </div>
    </div>
  );
});

export default InstanceRenderer;
