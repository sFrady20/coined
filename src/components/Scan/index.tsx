import React, { memo, useContext, useEffect, useRef, useCallback } from "react";
import styles from "./index.module.scss";
import {
  ARContext,
  useArSettings,
  DETECT_START_EVENT,
  WEBCAM_ERROR_EVENT,
} from "../ARBridge";
import { SessionContext } from "../Session";
import { ReactComponent as ScannerSvg } from "../../media/scanner.svg";
import { ReactComponent as ScanPromptSvg } from "../../media/scanPrompt.svg";
import { ReactComponent as ScanFadeSvg } from "../../media/scanFade.svg";
import { motion } from "framer-motion";
import useKeyPress from "../../hooks/useKeyPress";
import { AssetContext } from "../AssetLoader";

const Scan = memo(() => {
  const { updateSessionState } = useContext(SessionContext);
  const { arController } = useContext(ARContext);
  const { models, sfx } = useContext(AssetContext);
  const hasScanned = useRef(false);

  useArSettings({
    isGeorgeFloatLocked: false,
    isGeorgeCentered: true,
    isCoinDetectionEnabled: true,
  });

  const next = useCallback(() => {
    arController.george.model.visible = true;
    arController.music = sfx.scan[0];
    arController.music.play();
    arController.george.waitTimeout = setTimeout(() => {
      arController.george.say(sfx.intro);
    }, 5000);
    arController.george.playAnimation(models["appear"].animations[0]);
    updateSessionState((s) => {
      s.phase = "intro";
    });
  }, [arController, updateSessionState, sfx, models]);

  useEffect(() => {
    if (arController.webcamError) {
      next();
    } else {
      const listener = () => {
        if (hasScanned.current) return;
        hasScanned.current = true;
        arController.george.snapToQuarter();
        arController.triggerGlow();
        next();
      };
      arController.events.addEventListener(DETECT_START_EVENT, listener);

      const errorListener = () => {
        console.log("error");
        next();
      };

      arController.events.addEventListener(WEBCAM_ERROR_EVENT, errorListener);
      return () => {
        arController.events.removeEventListener(DETECT_START_EVENT, listener);
        arController.events.removeEventListener(
          WEBCAM_ERROR_EVENT,
          errorListener
        );
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
      <div className={styles.skip} onClick={() => next()}>
        Skip
      </div>
    </>
  );
});

export default Scan;
