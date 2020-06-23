import React, { memo, useContext, useEffect } from "react";
import styles from "./index.module.scss";
import { useHistory } from "react-router";
import { ARContext } from "../../components/ARBridge";
import { SessionContext } from "../../components/Session";
import { ReactComponent as ScannerSvg } from "../../media/scanner.svg";
import { ReactComponent as ScanPromptSvg } from "../../media/scanPrompt.svg";
import { ReactComponent as ScanFadeSvg } from "../../media/scanFade.svg";
import { motion } from "framer-motion";
import useKeyPress from "../../hooks/useKeyPress";

const Scan = memo(() => {
  const history = useHistory();
  const { events, updateSessionState } = useContext(SessionContext);
  const { detection } = useContext(ARContext);

  useEffect(() => {
    updateSessionState((s) => {
      s.phase = "scan";
    });
  }, [updateSessionState]);

  useEffect(() => {
    if (detection.label === "USQUARTER") {
      events.dispatchEvent({ type: "scan" });
      updateSessionState((s) => {
        s.phase = "intro";
      });
    }
  }, [detection.label, updateSessionState, events, history]);

  //skip scanning for quick debugging
  useKeyPress("q", () => {
    updateSessionState((s) => {
      s.phase = "intro";
    });
  });

  return (
    <>
      <motion.div
        className={styles.scanFade}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ScanFadeSvg />
      </motion.div>
      <motion.div
        className={styles.scanner}
        initial={{
          opacity: 0,
          scale: 0.95,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <ScannerSvg />
      </motion.div>
      <motion.div
        className={styles.scanPrompt}
        initial={{
          opacity: 0,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: 1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        exit={{
          opacity: 0,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <ScanPromptSvg />
      </motion.div>
    </>
  );
});

export default Scan;
