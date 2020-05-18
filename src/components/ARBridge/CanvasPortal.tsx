import React, { memo, ReactNode, useEffect, useContext, useRef } from "react";
import { ARContext } from ".";
import shortid from "shortid";

const CanvasPortal = (props: { scene: ReactNode; children?: ReactNode }) => {
  const { scene, children } = props;
  const id = useRef(shortid()).current;
  const { updateCanvasPortal, removeCanvasPortal } = useContext(ARContext);

  useEffect(() => {
    return () => {
      removeCanvasPortal(id);
    };
  }, [id, removeCanvasPortal]);
  useEffect(() => {
    updateCanvasPortal(id, scene);
  }, [scene, updateCanvasPortal, id]);

  return <>{children}</>;
};

export default memo(CanvasPortal);
