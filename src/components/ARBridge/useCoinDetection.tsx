import {
  useEffect,
  useContext,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useThree, useFrame } from "react-three-fiber";
import { ARContext } from ".";
import NN from "./models/NN_USQUARTER_2.json";
//@ts-ignore
//import WebARRocksObject from "WebAR.rocks.object/dist/WebARRocksObject.module";
import WebARRocksThreeStabilizer from "./WebARRocksThreeStabilizer";
import { PerspectiveCamera, Object3D, Quaternion, Vector3, Euler } from "three";
//@ts-ignore
const WebARRocksObject = window.WEBARROCKSOBJECT;

const AUTO_FOV = true;

const defaultPosition = new Vector3(0, 0, -6);
const defaultRotation = new Euler(0, 0, 0);

const useCoinDetection = (obj?: Object3D) => {
  const { videoEl } = useContext(ARContext);
  const { gl, camera } = useThree();
  const perspectiveCamera = camera as PerspectiveCamera;
  const [isDetectionInited, setDetectionInited] = useState(false);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const [detectState, setDetectState] = useState<WebARRocksDetectState>({
    label: "",
    detectScore: 0,
    distance: 0,
    positionScale: [0, 0, 0, 0],
    pitch: 0,
    yaw: 0,
    roll: 0,
  });

  const _position = useRef<Vector3>(new Vector3().copy(defaultPosition));
  const _euler = useRef<Euler>(new Euler().copy(defaultRotation));
  const _rotation = useRef<Quaternion>(
    new Quaternion().setFromEuler(defaultRotation)
  );
  const _scaleW = useRef(1);

  const stabilizer = useMemo(
    () =>
      obj
        ? WebARRocksThreeStabilizer.instance({
            obj3D: obj,
            n: 3,
            k: 1,
          })
        : undefined,
    [obj]
  );

  useEffect(() => {
    if (!videoEl) return;
    if (!videoHeight) return;
    if (!videoWidth) return;

    // Initialize WebAR.rocks.object:
    WebARRocksObject.init({
      video: videoEl,
      canvas: document.getElementById("debugCanvas"),
      followZRot: false,
      isDebugRender: false,
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
            setDetectionInited(true);
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
  }, [videoEl, videoWidth, videoHeight, gl, setDetectionInited]);

  useFrame(() => {
    if (isDetectionInited && obj) {
      const ds = WebARRocksObject.detect(0, null, {
        isKeepTracking: true,
        isSkipConfirmation: false,
        thresholdDetectFactor: 1,
        cutShader: "median",
        thresholdDetectFactorUnstitch: 0.1,
        trackingFactors: [0.3, 0.3, 1.0],
      });
      const newDetectState = { ...ds };
      setDetectState(newDetectState);

      //apply transforms
      obj.position.lerp(_position.current, 0.8);
      obj.quaternion.slerp(_rotation.current, 0.1);

      // compute vertical field of view:
      if (AUTO_FOV) {
        // compute aspectRatio:
        const canvasElement = gl.getContext().canvas;
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
        _scaleW.current = cvw / cvws;

        // apply parameters:
        perspectiveCamera.aspect = canvasAspectRatio;
        perspectiveCamera.fov = fov;
        perspectiveCamera.setViewOffset(cvws, cvhs, offsetX, offsetY, cvw, cvh);
        perspectiveCamera.updateProjectionMatrix();
      }
    }

    if (videoEl) {
      setVideoWidth(videoEl.videoWidth);
      setVideoHeight(videoEl.videoHeight);
    }
  });

  useEffect(() => {
    if (!obj) return;
    if (!detectState) return;
    if (!stabilizer) return;

    if (detectState.label === false) {
      _position.current.copy(defaultPosition);
      _rotation.current.setFromEuler(defaultRotation);
    } else {
      const zOffset = 0;

      //compute position:
      const halfTanFOV = Math.tan(
        (perspectiveCamera.aspect * perspectiveCamera.fov * Math.PI) / 360
      );

      const s = detectState.positionScale[2] * _scaleW.current;

      //move the cube in order to fit the head
      const W = s; //relative width of the detection window (1-> whole width of the detection window)
      var D = 1 / (2 * W * halfTanFOV); //distance between the front face of the cube and the camera
      if (D === Infinity) D = 7;

      //coords in 2D of the center of the detection window in the viewport :
      const xv = (2 * detectState.positionScale[0] - 1) * _scaleW.current;
      const yv = 2 * detectState.positionScale[1] - 1;

      //coords in 3D of the center of the cube (in the view coordinates system)
      const z = -7 - zOffset; // minus because view coordinate system Z goes backward. -0.5 because z is the coord of the center of the cube (not the front face)
      const x = xv * 7 * halfTanFOV;
      const y = (yv * 7 * halfTanFOV) / perspectiveCamera.aspect;
      _position.current.set(x, y, z);

      // compute rotation:
      const dPitch = detectState.pitch - Math.PI / 2; //look up/down rotation (around X axis)
      _euler.current.set(-dPitch, detectState.yaw + Math.PI, -detectState.roll);
      _rotation.current.setFromEuler(_euler.current);
    }
  }, [perspectiveCamera, detectState, stabilizer, obj]);

  const snap = useCallback(() => {
    if (!obj) return;
    obj.position.lerp(_position.current, 0.8);
    obj.quaternion.slerp(_rotation.current, 0.1);
  }, [obj, _position, _rotation]);

  return { detectState, snap };
};

export default useCoinDetection;
