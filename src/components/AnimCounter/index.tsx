import React, { memo, useMemo, useEffect, useState, useRef } from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import { AnimatePresence, motion, useSpring } from "framer-motion";

const AnimCounter = (props: { value: number }) => {
  const { value } = props;
  const [displayValue, setDisplayValue] = useState(value);
  const direction = useRef(0);

  const spring = useSpring(value, { damping: 100 });
  useEffect(() => {
    spring.onChange((v) => {
      const nextVal = Math.round(v);
      direction.current = nextVal > displayValue ? 1 : -1;
      setDisplayValue(nextVal);
    });
  }, [spring]);
  useEffect(() => {
    spring.set(value);
  }, [value, displayValue, spring]);

  const chars = useMemo(() => displayValue.toString().split(""), [
    displayValue,
  ]);

  return (
    <>
      {_.map(chars, (char, index) => {
        return (
          <div className={styles.char}>
            <AnimatePresence exitBeforeEnter>
              <motion.div
                initial={{
                  opacity: 0.6,
                  translateY: direction.current < 0 ? "-20%" : "20%",
                }}
                animate={{
                  opacity: 1,
                  translateY: "0%",
                  transition: { duration: 0.1 },
                }}
                exit={{
                  opacity: 0.6,
                  translateY: direction.current < 0 ? "20%" : "-20%",
                  transition: { duration: 0.1 },
                }}
                key={index + ":" + char}
              >
                {char}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </>
  );
};

export default memo(AnimCounter);
