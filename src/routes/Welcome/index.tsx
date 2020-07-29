import React, { memo, useContext, useEffect, useCallback } from "react";
import styles from "./index.module.scss";
import Button from "../../components/Button";
import { SessionContext } from "../../components/Session";
import { motion } from "framer-motion";
import { AssetContext } from "../../components/AssetLoader";
import { DEBUG_SCANNING } from "../../config";
import { ARContext } from "../../components/ARBridge";

const Welcome = memo(() => {
  const { arController } = useContext(ARContext);
  const { updateSessionState } = useContext(SessionContext);
  const { sfx } = useContext(AssetContext);

  useEffect(() => {
    arController.george.snapToQuarter();
  }, [arController]);

  const next = useCallback(() => {
    arController.george.float();
    updateSessionState((s) => {
      if (!DEBUG_SCANNING) s.phase = "category";
    });
  }, [updateSessionState, arController]);

  useEffect(() => {
    const sound = sfx["intro"];
    sound.once("end", () => {
      next();
    });
    arController.george.say(sound);
    return () => {
      sound.stop();
    };
  }, [sfx, next, arController]);

  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Button text="PLAY" onClick={() => next()} />
    </motion.div>
  );
});

export default Welcome;
