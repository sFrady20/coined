import React, {
  memo,
  useState,
  useMemo,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import styles from "./ARRenderer.module.scss";
import ARController from "./ARController";
import { ARContext } from ".";
import { AssetContext } from "../AssetLoader";

const ARRenderer = memo((props: { children?: ReactNode }) => {
  const { children } = props;
  const [rootRef, setRootRef] = useState<HTMLDivElement>();
  const arController = useMemo(() => new ARController(), []);
  const assets = useContext(AssetContext);

  const size = useMemo(() => {
    if (rootRef) {
      const rect = rootRef?.getBoundingClientRect();
      return [rect.width, rect.height];
    }
    return [500, 500];
  }, [rootRef]);

  useEffect(() => {
    arController.init(assets);
  }, [arController, assets]);

  return (
    <div className={styles.root}>
      <div className={styles.renderer} ref={(r) => setRootRef(r || undefined)}>
        <canvas className={styles.debugCanvas} id={"debugCanvas"} />
        <canvas
          className={styles.mainCanvas}
          id={"mainCanvas"}
          width={size[0]}
          height={size[1]}
        />
      </div>
      <ARContext.Provider value={{ arController }}>
        <div className={styles.content}>{children}</div>
      </ARContext.Provider>
    </div>
  );
});

export default ARRenderer;
