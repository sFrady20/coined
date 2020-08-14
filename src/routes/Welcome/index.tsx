import React, { memo, useContext, useEffect, useCallback } from "react";
import styles from "./index.module.scss";
import Button from "../../components/Button";
import { SessionContext } from "../../components/Session";
import { motion } from "framer-motion";
import { ARContext } from "../../components/ARBridge";

const Welcome = memo(() => {
  const { arController } = useContext(ARContext);
  const { updateSessionState } = useContext(SessionContext);

  const next = useCallback(() => {
    updateSessionState((s) => {
      s.phase = "home";
    });
  }, [updateSessionState]);

  useEffect(() => {
    arController.george.floatLocked = false;
    return () => {
      arController.george.floatLocked = true;
      arController.george.shutup();
    };
  }, [arController]);

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
