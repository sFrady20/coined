import React, { memo, useContext, ReactNode } from "react";
import styles from "./index.module.scss";
import Quarters from "../Collection/Quarters";
import { ReactComponent as CloseSvg } from "../../media/close.svg";
import { AssetContext } from "../../components/AssetLoader";
import { motion } from "framer-motion";

const QuarterDetail = memo(
  (props: {
    category: keyof typeof Quarters;
    children?: ReactNode;
    onClose?: () => void;
  }) => {
    const { category, onClose, children } = props;
    const quarter = Quarters[category];
    const { images } = useContext(AssetContext);

    const DetailBgComponent = quarter.detailBg;

    return (
      <div className={styles.root}>
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
                delay: 0.2,
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
                delay: 0.2,
                duration: 0.4,
              },
            },
          }}
        />
        <div className={styles.detailContent}>
          <h3>{quarter.title}</h3>
          <p>{quarter.description}</p>
          <a
            href="https://www.usmint.gov"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.callToAction}>VISIT USMINT.GOV</div>
          </a>
          {children}
        </div>
        {onClose && (
          <div className={styles.close} onClick={onClose}>
            <CloseSvg />
          </div>
        )}
      </div>
    );
  }
);

export default QuarterDetail;
