import React, { memo, useContext } from "react";
import QuarterDetail from "../../components/QuarterDetail";
import { Win } from "../../components/Feedback";
import Button from "../../components/Button";
import styles from "./index.module.scss";
import { SessionContext } from "../../components/Session";
import { motion } from "framer-motion";

const Reward = memo(() => {
  const {
    sessionState: { selectedCategory },
    updateSessionState,
  } = useContext(SessionContext);

  if (!selectedCategory) {
    updateSessionState((s) => {
      s.phase = "home";
    });
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.root}
    >
      <div className={styles.detail}>
        <div className={styles.feedback}>
          <Win />
        </div>
        <QuarterDetail category={selectedCategory}>
          <div className={styles.actions}>
            <Button
              type="primary"
              text="View in Collection"
              onClick={() => {
                updateSessionState((state) => {
                  state.isCollectionCollapsed = false;
                  state.phase = "intro";
                });
              }}
            />
          </div>
        </QuarterDetail>
      </div>
    </motion.div>
  );
});

export default Reward;
