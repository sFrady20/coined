import React, { memo } from "react";
import styles from "./CollectionDetail.module.scss";
import quarters from "./quarters.json";
import { ReactComponent as CloseSvg } from "../../media/close.svg";

const CollectionDetail = memo(
  (props: { quarterKey: keyof typeof quarters; onClose?: () => void }) => {
    const { quarterKey, onClose } = props;
    const quarter = quarters[quarterKey];

    return (
      <div className={styles.wrapper}>
        <div className={styles.panel}>
          <div className={styles.sidebar}>
            <img
              className={styles.back}
              src={quarter.imgBack}
              alt={quarterKey}
            />
            <img
              className={styles.front}
              src={quarter.imgFront}
              alt={quarterKey}
            />
          </div>
          <div className={styles.content}>
            <h3>{quarter.title}</h3>
            <p>{quarter.text}</p>
            <div className={styles.callToAction}>VISIT USMINT.GOV</div>
          </div>
          <div className={styles.close} onClick={onClose}>
            <CloseSvg />
          </div>
        </div>
      </div>
    );
  }
);

export default CollectionDetail;
