import React, {
  createContext,
  useEffect,
  useState,
  memo,
  ReactNode,
  useCallback,
} from "react";
import styles from "./index.module.scss";
import Renderer from "./Renderer";
import _ from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import PermissionPrompt from "../../routes/PermissionPrompt";

export type CanvasPortalDef = {
  id: string;
  scene: ReactNode;
};

export type PermissionsStatus =
  | "requestingPermission"
  | "permissionGranted"
  | "permissionDenied"
  | "permissionError";
export type ARContextType = {
  stream?: MediaStream;
  permissionStatus: PermissionsStatus;
  updateCanvasPortal: (id: string, scene: ReactNode) => void;
  removeCanvasPortal: (id: string) => void;
};
const defaultValue: ARContextType = {
  permissionStatus: "requestingPermission",
  updateCanvasPortal: () => {},
  removeCanvasPortal: () => {},
};
export const ARContext = createContext(defaultValue);

const ARBrige = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [stream, setStream] = useState<MediaStream>();
  const [permissionStatus, setPermissionStatus] = useState<PermissionsStatus>(
    "requestingPermission"
  );
  const [portals, setPortals] = useState<CanvasPortalDef[]>([]);

  useEffect(() => {
    (async () => {
      setPermissionStatus("requestingPermission");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        setStream(stream);
        setPermissionStatus("permissionGranted");
      } catch (err) {
        setPermissionStatus("permissionGranted");
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

  if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    return <>Not able to access camera</>;
  }

  return (
    <div className={styles.root}>
      <ARContext.Provider
        value={{
          stream,
          permissionStatus,
          updateCanvasPortal,
          removeCanvasPortal,
        }}
      >
        <AnimatePresence initial={false} exitBeforeEnter>
          {permissionStatus === "requestingPermission" ? (
            <PermissionPrompt key="prompting" />
          ) : (
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
                <Renderer portals={portals} />
              </div>
              <div className={styles.content}>{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </ARContext.Provider>
    </div>
  );
};

export default memo(ARBrige);
