import React, { createContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import Renderer from "./Renderer";

export type ARContextType = {
  stream?: MediaStream;
};
const defaultValue: ARContextType = {};
export const ARContext = createContext(defaultValue);

export default (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [stream, setStream] = useState<MediaStream>();
  const [isRequestingAccess, setRequestingAccess] = useState(false);

  if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    return <>Not able to access camera</>;
  }

  useEffect(() => {
    (async () => {
      setRequestingAccess(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      setStream(stream);
      setRequestingAccess(false);
    })();
  }, [setStream]);

  return (
    <div className={styles.root}>
      <ARContext.Provider value={{ stream }}>
        {!!stream ? (
          <>
            <div className={styles.renderer}>
              <Renderer />
            </div>
            <div className={styles.content}>{children}</div>
          </>
        ) : isRequestingAccess ? (
          //definitely requesting access
          <>Please click allow</>
        ) : (
          //probably just loading
          <>No media stream found.</>
        )}
      </ARContext.Provider>
    </div>
  );
};
