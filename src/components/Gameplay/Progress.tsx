import React, { memo } from "react";
import styles from "./Progress.module.scss";
import { motion } from "framer-motion";

const Progress = memo((props: { current: number; max: number }) => {
  const { max, current } = props;
  const pct = current / max;

  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg className={styles.svg} viewBox="0 0 470.13 470.13">
        <defs>
          <linearGradient
            id="a91eb8fc-f1c4-4c4c-94f2-faa4e2453957"
            y1="235.07"
            x2="470.13"
            y2="235.07"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.15" stopColor="#faaf40" />
            <stop offset="1" stopColor="#a1662d" />
          </linearGradient>
        </defs>
        <motion.path
          d="M235.07,90A145.07,145.07,0,1,0,380.13,235.07,145.07,145.07,0,0,0,235.07,90"
          pathLength={1}
          style={{
            fill: "none",
            strokeMiterlimit: 10,
            strokeWidth: "180px",
            stroke: "url(#a91eb8fc-f1c4-4c4c-94f2-faa4e2453957)",
          }}
          custom={pct}
          initial={{
            strokeDasharray: `0, 1, 0.8`,
          }}
          animate={{
            strokeDasharray: `0, ${1 - pct}, ${pct}`,
            transition: {
              ease: "easeInOut",
            },
          }}
          exit={{
            strokeDasharray: `0, 1, 0.8`,
          }}
        />
      </svg>
      <div className={styles.counter}>
        {current}/{max}
      </div>
    </motion.div>
  );
});

export default Progress;
