import React, { memo, useContext, useCallback } from "react";
import styles from "./index.module.scss";
import Button from "../../components/Button";
import { SessionContext } from "../../components/Session";
import { motion } from "framer-motion";
import { useArSettings } from "../../components/ARBridge";

const Welcome = memo(() => {
  const { updateSessionState } = useContext(SessionContext);

  const next = useCallback(() => {
    updateSessionState((s) => {
      s.phase = "home";
    });
  }, [updateSessionState]);

  useArSettings({
    isGeorgeCentered: true,
    isGeorgeFloatLocked: false,
    isCoinDetectionEnabled: true,
    shouldGeorgeStopTalking: true,
  });

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
