import React, {
  createContext,
  useEffect,
  useState,
  memo,
  ReactNode,
  useCallback,
  Suspense,
  useContext,
  useMemo,
} from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas } from "react-three-fiber";
import { SessionContext } from "../Session";
import GlobalScene from "../GlobalScene";
import { Vector3 } from "three";
import { AssetContext } from "../AssetLoader";

export type CanvasPortalDef = {
  id: string;
  scene: ReactNode;
};

export type ARDetection = {
  label: string | false;
  score: number;
};

export type PermissionsStatus =
  | "requestingPermission"
  | "permissionGranted"
  | "permissionDenied"
  | "permissionError";
export type ARContextType = {
  stream?: MediaStream;
  videoEl?: HTMLVideoElement;
  permissionStatus: PermissionsStatus;
  detection: ARDetection;
  updateCanvasPortal: (id: string, scene: ReactNode) => void;
  removeCanvasPortal: (id: string) => void;
};
const defaultValue: ARContextType = {
  permissionStatus: "requestingPermission",
  detection: {
    label: false,
    score: 0,
  },
  updateCanvasPortal: () => {},
  removeCanvasPortal: () => {},
};
export const ARContext = createContext(defaultValue);

const ARBrige = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [stream, setStream] = useState<MediaStream>();
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionsStatus>(
    "requestingPermission"
  );
  const [detection, setDetection] = useState<ARContextType["detection"]>({
    label: false,
    score: 0,
  });
  const [portals, setPortals] = useState<CanvasPortalDef[]>([]);
  const sessionContext = useContext(SessionContext);
  const assetContext = useContext(AssetContext);

  useEffect(() => {
    (async () => {
      setPermissionStatus("requestingPermission");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 640, max: 1920, ideal: 1280 },
            height: { min: 640, max: 1920, ideal: 720 },
            facingMode: "environment",
          },
          audio: false,
        });
        setStream(stream);
        setPermissionStatus("permissionGranted");
      } catch (err) {
        console.error(err);
        setPermissionStatus("permissionError");
      }
    })();
  }, [setStream, setPermissionStatus]);

  const updateCanvasPortal = useCallback(
    (id: string, scene: ReactNode) => {
      setPortals((p) => {
        var portal = _.find(p, (o) => o.id === id);
        if (portal) {
          portal.scene = scene;
        } else {
          portal = {
            id: id,
            scene: scene,
          };
        }
        return _(p)
          .filter((o) => o.id !== id)
          .push(portal)
          .value();
      });
    },
    [setPortals]
  );

  const removeCanvasPortal = useCallback(
    (id: string) => {
      setPortals((p) => _.filter(p, (s) => s.id !== id));
    },
    [setPortals]
  );

  const renderedPortals = useMemo(
    () =>
      _.map(portals, (p) => (
        <React.Fragment key={p.id}>{p.scene}</React.Fragment>
      )),
    [portals]
  );

  useEffect(() => {
    if (!stream || !videoEl) return;
    videoEl.srcObject = stream;
  }, [stream, videoEl]);

  const arContext: ARContextType = {
    stream,
    videoEl: videoEl || undefined,
    detection,
    permissionStatus,
    updateCanvasPortal,
    removeCanvasPortal,
  };

  if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    return <>Not able to access camera</>;
  }

  return (
    <div className={styles.root}>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key="playing"
          variants={{
            requestingPermissions: { translateY: 0, opacity: 1 },
            permissionsGranted: { opacity: 0 },
            permissionsDenied: { translateX: 100 },
          }}
          initial="permissionsGranted"
          animate="requestingPermissions"
          exit="permissionsGranted"
        >
          <div className={styles.renderer}>
            <video
              id={"ARVideo"}
              autoPlay
              playsInline
              muted
              ref={(el) => setVideoEl(el)}
              className={styles.video}
            />
            <canvas className={styles.debugCanvas} id={"debugCanvas"} />
            <Canvas
              className={styles.canvas}
              camera={{ position: new Vector3(0, 0, 0) }}
            >
              <ARContext.Provider value={arContext}>
                <SessionContext.Provider value={sessionContext}>
                  <AssetContext.Provider value={assetContext}>
                    <Suspense fallback={null}>
                      <GlobalScene
                        onDetect={(label, score) =>
                          setDetection({ label, score })
                        }
                      />
                      {renderedPortals}
                    </Suspense>
                  </AssetContext.Provider>
                </SessionContext.Provider>
              </ARContext.Provider>
            </Canvas>
          </div>
          <ARContext.Provider value={arContext}>
            <div className={styles.content}>{children}</div>
          </ARContext.Provider>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default memo(ARBrige);
