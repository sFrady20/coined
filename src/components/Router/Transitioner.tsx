import React, { memo } from "react";
import styles from "./index.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const Transitioner = (props: {
  children: React.ReactNode;
  pageKey: string;
}) => {
  const { children, pageKey } = props;

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className={styles.content}
        initial={{}}
        animate={{
          transition: { when: "beforeChildren", duration: 0 },
        }}
        exit={{
          transition: { when: "beforeChildren", duration: 0 },
        }}
        key={pageKey}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Transitioner);
