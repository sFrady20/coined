import React, { memo, useContext } from "react";
import styles from "./CollectionDetail.module.scss";
import Quarters from "./Quarters";
import { ReactComponent as CloseSvg } from "../../media/close.svg";
import { motion } from "framer-motion";
import { SessionContext } from "../../components/Session";
import _ from "lodash";
import Button from "../../components/Button";
import QuarterDetail from "../../components/QuarterDetail";
import CategoryCard from "../../components/CategoryCard";

const CollectionDetail = memo(
  (props: { category: keyof typeof Quarters; onClose?: () => void }) => {
    const { category, onClose } = props;
    const { gameState, updateSessionState } = useContext(SessionContext);
    const { collection } = gameState;
    const isCollected = _.includes(collection, category);

    return (
      <motion.div
        className={styles.wrapper}
        variants={{
          hidden: {},
          visible: {},
        }}
        initial={"hidden"}
        animate={"visible"}
        exit={"hidden"}
      >
        <motion.div
          className={styles.fade}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0.6 },
          }}
        />
        {isCollected ? (
          <motion.div
            className={styles.detail}
            variants={{
              hidden: { translateX: "-50%", translateY: "100%" },
              visible: { translateX: "-50%", translateY: "-50%" },
            }}
          >
            <QuarterDetail category={category} onClose={onClose} />
          </motion.div>
        ) : (
          <>
            <motion.div
              className={styles.card}
              variants={{
                hidden: { translateX: "-50%", translateY: "100%" },
                visible: { translateX: "-50%", translateY: "-50%" },
              }}
            >
              <CategoryCard category={category} />
              <div className={styles.cardClose} onClick={onClose}>
                <CloseSvg />
              </div>
            </motion.div>
            <motion.div
              className={styles.cardButton}
              variants={{
                hidden: {
                  opacity: 0,
                  translateX: "-50%",
                  translateY: "-10%",
                },
                visible: {
                  opacity: 1,
                  translateX: "-50%",
                  translateY: "-50%",
                },
              }}
            >
              <Button
                text="PLAY & COLLECT"
                type="primary"
                onClick={() => {
                  updateSessionState((s) => {
                    s.selectedCategory = category;
                    s.phase = "play";
                    s.isCollectionCollapsed = true;
                  });
                  onClose && onClose();
                }}
              />
            </motion.div>
          </>
        )}
      </motion.div>
    );
  }
);

export default CollectionDetail;
