import React, { memo, useEffect, useRef, useContext } from "react";
import { Object3D } from "three";
import George from "./George";
import { SessionContext } from "../Session";
import useGridAndControls from "../../hooks";

const GlobalScene = memo(
  (props: { onDetect: (label: string | false, score: number) => void }) => {
    const { onDetect } = props;
    const arObj = useRef<Object3D>(null);
    const { events, sessionState } = useContext(SessionContext);
    const { phase } = sessionState;

    useGridAndControls();
    return (
      <>
        <spotLight position={[0, 3, 5]} rotation={[0, 180, 0]} />
        <hemisphereLight intensity={0.8} />
        <group ref={arObj} position={[0, 0, 0]} visible={phase !== "scan"}>
          <George />
        </group>
      </>
    );
  }
);

export default GlobalScene;
