import React, { memo } from "react";
import styles from "./LoadingScreen.module.scss";
import { ReactComponent as ScreenArt } from "../../media/loadingArt.svg";
import { motion, Variants } from "framer-motion";
import Logo from "./Logo";

const variants: { [s: string]: Variants } = {
  parent: {
    hidden: {
      opacity: 0,
      translateX: `-50%`,
      translateY: `-90%`,
      transition: {
        when: "afterChildren",
      },
    },
    shown: {
      opacity: 1,
      translateX: `-50%`,
      translateY: `-100%`,
      transition: {
        delay: 0,
        delayChildren: 0.5,
        staggerChildren: 0.03,
        duration: 1,
      },
    },
  },
  peek: {
    hidden: {
      opacity: 0,
    },
    shown: {
      opacity: 1,
    },
  },
};

const LoadingScreen = memo(
  (props: { progress: number; onStart: () => void }) => {
    const { progress, onStart } = props;

    return (
      <div className={styles.root}>
        <Logo />

        <div className={styles.art}>
          <ScreenArt />
        </div>

        <motion.div
          className={styles.panel}
          variants={variants.parent}
          initial={"hidden"}
          animate={"shown"}
          exit={"hidden"}
        >
          <div className={styles.panelInner}>
            <h2>Greetings!</h2>
            <p>
              <span>Catch George Washington in a</span>
              <span>lie during this classic trivia game.</span>
              <span>Think you're up to the challenge?</span>
              <span>George is waiting.</span>
            </p>
            <div className={styles.loadingBar}>
              <div
                className={styles.loadingBarInner}
                style={{
                  background: `linear-gradient(
                    90deg,
                    rgba(179, 138, 24, 1) ${progress * 100}%,
                    rgba(34, 43, 61, 1) ${progress * 100 + 10}%
                  )`,
                }}
              />
            </div>
          </div>
          <div
            className={
              progress < 1 ? styles.startButtonDisabled : styles.startButton
            }
            onClick={() => onStart()}
          >
            {progress < 1 ? (
              <>
                {"Loading".split("").map((char, i) => (
                  <span
                    className={styles.loadingLetter}
                    key={i}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {char}
                  </span>
                ))}
              </>
            ) : (
              "Start"
            )}
          </div>
        </motion.div>
      </div>
    );
  }
);

export default LoadingScreen;
