import React, { memo, useEffect, useRef, useContext } from "react";
import { Object3D } from "three";
import useCoinDetection from "../ARBridge/useCoinDetection";
import George from "./George";
import { SessionContext } from "../Session";

const GlobalScene = memo(
  (props: { onDetect: (label: string | false, score: number) => void }) => {
    const { onDetect } = props;
    const arObj = useRef<Object3D>(null);
    const { events, sessionState } = useContext(SessionContext);
    const { phase } = sessionState;

    const { detectState, snap } = useCoinDetection(arObj.current || undefined);
    useEffect(() => {
      onDetect(detectState.label, detectState.detectScore);
    }, [detectState.label, detectState.detectScore]);

    useEffect(() => {
      const onScan = () => {
        snap();
      };
      events.addEventListener("scan", onScan);
      return () => {
        events.removeEventListener("scan", onScan);
      };
    }, [events, snap]);

    return (
      <>
        <spotLight position={[0, 3, 5]} rotation={[0, 180, 0]} />
        <hemisphereLight intensity={0.8} />
        <group ref={arObj} position={[0, 0, -6]} visible={phase !== "scan"}>
          <George />
        </group>
      </>
    );
  }
);

export default GlobalScene;
