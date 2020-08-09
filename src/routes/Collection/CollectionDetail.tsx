import React, { memo, useContext } from "react";
import styles from "./CollectionDetail.module.scss";
import Quarters from "./Quarters";
import { ReactComponent as CloseSvg } from "../../media/close.svg";
import { AssetContext } from "../../components/AssetLoader";
import { motion } from "framer-motion";
import { SessionContext } from "../../components/Session";
import _ from "lodash";
import Button from "../../components/Button";

const CollectionDetail = memo(
  (props: { category: keyof typeof Quarters; onClose?: () => void }) => {
    const { category, onClose } = props;
    const quarter = Quarters[category];
    const { images } = useContext(AssetContext);
    const { gameState, updateSessionState } = useContext(SessionContext);
    const { collection } = gameState;
    const isCollected = _.includes(collection, category);

    const CardComponent = quarter.card;
    const DetailBgComponent = quarter.detailBg;

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
            <DetailBgComponent />
            <motion.img
              className={styles.back}
              src={images[quarter.imgBack]}
              alt={category}
              variants={{
                hidden: {
                  opacity: 0,
                  rotateZ: "-60deg",
                  translateX: "-60%",
                  translateY: "-50%",
                },
                visible: {
                  opacity: 1,
                  rotateZ: 0,
                  translateX: "-50%",
                  translateY: "-50%",
                  transition: {
                    delay: 0.4,
                    duration: 0.4,
                  },
                },
              }}
            />
            <motion.img
              className={styles.front}
              src={images[quarter.imgFront]}
              alt={category}
              variants={{
                hidden: {
                  opacity: 0,
                  rotateZ: "60deg",
                  translateX: "-40%",
                  translateY: "-50%",
                },
                visible: {
                  opacity: 1,
                  rotateZ: 0,
                  translateX: "-50%",
                  translateY: "-50%",
                  transition: {
                    delay: 0.4,
                    duration: 0.4,
                  },
                },
              }}
            />
            <div className={styles.detailContent}>
              <h3>{quarter.title}</h3>
              <p>{quarter.description}</p>
              <div className={styles.callToAction}>VISIT USMINT.GOV</div>
            </div>
            <div className={styles.close} onClick={onClose}>
              <CloseSvg />
            </div>
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
              <CardComponent />
              <img
                className={styles.quarter}
                src={images[quarter.imgBack]}
                alt={category}
              />
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
