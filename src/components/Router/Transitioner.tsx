import React from "react";
import styles from "./Transitioner.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";

export default (props: { children: React.ReactNode }) => {
  const { children } = props;
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className={styles.page}
        initial={{}}
        animate={{
          transition: { when: "beforeChildren", duration: 0 }
        }}
        exit={{
          transition: { when: "beforeChildren", duration: 0 }
        }}
        key={location.pathname}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
