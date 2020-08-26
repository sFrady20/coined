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
import { SessionContext } from "../Session";
import { motion } from "framer-motion";
import { ReactComponent as SpinnerSvg } from "../../media/spinner.svg";

const ARRenderer = memo((props: { children?: ReactNode }) => {
  const { children } = props;
  const [rootRef, setRootRef] = useState<HTMLDivElement>();
  const { events } = useContext(SessionContext);
  const assets = useContext(AssetContext);
  const arController = useMemo(() => new ARController(), []);
  const [isControllerInited, setControllerInited] = useState(false);

  const size = useMemo(() => {
    if (rootRef) {
      const rect = rootRef?.getBoundingClientRect();
      return [rect.width, rect.height];
    }
    return [500, 500];
  }, [rootRef]);

  useEffect(() => {
    (async () => {
      await arController.init(assets);
      setControllerInited(true);
    })();
  }, [arController, assets, setControllerInited]);

  //session animation events
  useEffect(() => {
    const handleCorrect = () => {
      arController.george.playAnimation(assets.models.applause.animations[0]);
    };
    const handleIncorrect = () => {
      arController.george.playAnimation(assets.models.laugh.animations[0]);
    };
    const handleGameEnd = () => {
      arController.george.playAnimation(assets.models.endGame.animations[0]);
    };
    events.addEventListener("correct", handleCorrect);
    events.addEventListener("incorrect", handleIncorrect);
    events.addEventListener("endGame", handleGameEnd);
    return () => {
      events.removeEventListener("correct", handleCorrect);
      events.removeEventListener("incorrect", handleIncorrect);
      events.addEventListener("endGame", handleGameEnd);
    };
  }, [events, arController, assets]);

  return (
    <div className={styles.root}>
      <div className={styles.renderer} ref={(r) => setRootRef(r || undefined)}>
        <motion.video
          className={styles.video}
          id={"cameraFeed"}
          autoPlay
          playsInline
          muted
          initial={{ opacity: 0 }}
          animate={isControllerInited ? { opacity: 1 } : { opacity: 0 }}
          exit={{ opacity: 0 }}
        />
        <canvas className={styles.debugCanvas} id={"debugCanvas"} />
        <motion.canvas
          className={styles.mainCanvas}
          id={"mainCanvas"}
          width={size[0]}
          height={size[1]}
          onClick={arController.handleClick}
          initial={{ opacity: 0 }}
          animate={isControllerInited ? { opacity: 1 } : { opacity: 0 }}
          exit={{ opacity: 0 }}
        />
      </div>
      {isControllerInited ? (
        <ARContext.Provider value={{ arController }}>
          <div className={styles.content}>{children}</div>
        </ARContext.Provider>
      ) : (
        <motion.div
          className={styles.spinnerContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SpinnerSvg className={styles.spinner} />
          <div className={styles.spinnerText}>Initializing Camera...</div>
        </motion.div>
      )}
    </div>
  );
});

export default ARRenderer;
