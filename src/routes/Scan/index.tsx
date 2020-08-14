import React, { memo, useContext, useEffect, useRef, useCallback } from "react";
import styles from "./index.module.scss";
import { ARContext } from "../../components/ARBridge";
import { SessionContext } from "../../components/Session";
import { ReactComponent as ScannerSvg } from "../../media/scanner.svg";
import { ReactComponent as ScanPromptSvg } from "../../media/scanPrompt.svg";
import { ReactComponent as ScanFadeSvg } from "../../media/scanFade.svg";
import { motion } from "framer-motion";
import useKeyPress from "../../hooks/useKeyPress";
import { AssetContext } from "../../components/AssetLoader";

const Scan = memo(() => {
  const { updateSessionState } = useContext(SessionContext);
  const { arController } = useContext(ARContext);
  const { models, sfx } = useContext(AssetContext);
  const hasScanned = useRef(false);

  const next = useCallback(() => {
    arController.george.say(sfx.intro);

    arController.george.model.visible = true;
    arController.george.playAnimation(models["appear"].animations[0]);

    updateSessionState((s) => {
      s.phase = "intro";
    });
  }, [arController, updateSessionState, sfx, models]);

  useEffect(() => {
    if (arController) {
      arController.isCoinDetectionEnabled = true;

      const listener = () => {
        if (hasScanned.current) return;
        hasScanned.current = true;
        next();
      };

      arController.events.addEventListener("onDetectStart", listener);
      return () => {
        arController.events.removeEventListener("onDetectStart", listener);
      };
    }
  }, [arController, updateSessionState, hasScanned, models, next]);

  //skip scanning for quick debugging
  useKeyPress("q", () => {
    next();
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
