import React, { useContext, useRef, useEffect } from "react";
import styles from "./Renderer.module.scss";
import { ARContext } from ".";

export default () => {
  const { stream } = useContext(ARContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  if (!stream) return null;

  useEffect(() => {
    if (stream && videoRef.current) videoRef.current.srcObject = stream;
  }, [stream, videoRef]);

  return (
    <div className={styles.root}>
      <video autoPlay ref={videoRef} className={styles.video} />
    </div>
  );
};
