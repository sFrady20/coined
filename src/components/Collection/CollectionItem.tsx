import React, { memo, useContext, useMemo } from "react";
import styles from "./CollectionItem.module.scss";
import { motion } from "framer-motion";
import _ from "lodash";
import { SessionContext } from "../../components/Session";
import { ReactComponent as QuarterHoleSvg } from "../../media/quarterHole.svg";
import { AssetContext } from "../../components/AssetLoader";
import Quarters from "./Quarters";
import Button from "../../components/Button";
import { QUESTION_GOAL } from "../Gameplay";

const CollectionItem = memo(
  (props: { category: keyof typeof Quarters; onClick?: () => void }) => {
    const { category, onClick } = props;
    const { images } = useContext(AssetContext);
    const { gameState } = useContext(SessionContext);
    const { collection, visited } = gameState;
    const isCollected = _.includes(collection, category);
    const answeredQuestions = useMemo(
      () => gameState.answeredQuestions[category] || [],
      [gameState, category]
    );

    const BannerComponent = Quarters[category].banner;

    return (
      <motion.div
        className={styles.container}
        variants={{
          hidden: { opacity: 0, scale: 0.4 },
          collapsed: { opacity: 0, scale: 0.4 },
          expanded: { opacity: 1, scale: 1 },
        }}
      >
        <motion.div
          className={styles.banner}
          variants={{
            hidden: { translateX: "-50%", translateY: "50%" },
            collapsed: { translateX: "-50%", translateY: "50%" },
            expanded: { translateX: "-50%", translateY: "-50%" },
          }}
        >
          <BannerComponent />
        </motion.div>
        <div
          className={styles.quarterHole}
          key={category}
          onClick={() => onClick && setTimeout(onClick, 200)}
        >
          <QuarterHoleSvg />
          <div
            className={
              answeredQuestions.length > 0 ? styles.count : styles.countEmpty
            }
          >
            {answeredQuestions.length}/{QUESTION_GOAL}
          </div>
          {isCollected && (
            <img
              className={styles.quarter}
              src={images[Quarters[category].imgBack]}
              alt={category}
            />
          )}
        </div>
        <div className={styles.action}>
          <Button
            type="primary"
            onClick={onClick}
            text={isCollected ? "View Coin" : "Collect"}
          />
        </div>
      </motion.div>
    );
  }
);

export default CollectionItem;
