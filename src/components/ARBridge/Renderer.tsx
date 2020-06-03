import React, {
  useContext,
  useRef,
  useEffect,
  useMemo,
  Suspense,
  memo,
} from "react";
import styles from "./Renderer.module.scss";
import _ from "lodash";
import { ARContext, CanvasPortalDef } from ".";
import { Canvas } from "react-three-fiber";
import Scene from "../Scene";
import { SessionContext } from "../Session";
import { Vector3 } from "three";

const Renderer = (props: { portals: CanvasPortalDef[] }) => {
  const { portals } = props;
  const { stream } = useContext(ARContext);
  const sessionContextValue = useContext(SessionContext);
  const videoRef = useRef<HTMLVideoElement>(null);

  const renderedPortals = useMemo(
    () =>
      _.map(portals, (p) => (
        <React.Fragment key={p.id}>{p.scene}</React.Fragment>
      )),
    [portals]
  );

  useEffect(() => {
    if (stream && videoRef.current) videoRef.current.srcObject = stream;
  }, [stream, videoRef]);

  if (!stream) return null;

  return (
    <div className={styles.root}>
      <video autoPlay ref={videoRef} className={styles.video} />
      <Canvas
        className={styles.canvas}
        camera={{ position: new Vector3(0, 6, 6) }}
      >
        <Suspense fallback={null}>
          <SessionContext.Provider value={sessionContextValue}>
            <Scene />
            {renderedPortals}
          </SessionContext.Provider>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default memo(Renderer);
