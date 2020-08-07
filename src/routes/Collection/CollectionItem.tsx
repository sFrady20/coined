import React, { memo, useContext } from "react";
import styles from "./CollectionItem.module.scss";
import { motion } from "framer-motion";
import _ from "lodash";
import { SessionContext } from "../../components/Session";
import { ReactComponent as QuarterHoleSvg } from "../../media/quarterHole.svg";
import { AssetContext } from "../../components/AssetLoader";
import Quarters from "./Quarters";
import Button from "../../components/Button";

const CollectionItem = memo(
  (props: {
    quarterKey: keyof typeof Quarters;
    onClick?: (isCollected: boolean) => void;
  }) => {
    const { quarterKey, onClick } = props;
    const { images } = useContext(AssetContext);
    const { gameState } = useContext(SessionContext);
    const { collection, visited } = gameState;
    const isCollected = _.includes(collection, quarterKey);
    const isNew = isCollected && !_.includes(visited, quarterKey);

    const BannerComponent = Quarters[quarterKey].banner;

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
        <div className={styles.quarterHole} key={quarterKey}>
          <QuarterHoleSvg />
          <div className={styles.count}>0/10</div>
          {isCollected && (
            <img
              className={styles.quarter}
              src={images[Quarters[quarterKey].imgFront]}
              alt={quarterKey}
            />
          )}
        </div>
        <div className={styles.action}>
          <Button
            type="primary"
            onClick={() => onClick && onClick(isCollected)}
            text="Collect"
          />
        </div>
      </motion.div>
    );
  }
);

export default CollectionItem;
