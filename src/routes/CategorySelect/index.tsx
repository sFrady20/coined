import React, { useState, useContext, memo } from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import { SessionContext } from "../../components/Session";
import { AssetContext } from "../../components/AssetLoader";
import ReactSwiper from "react-id-swiper";
import Button from "../../components/Button";
import Swiper from "swiper";
import { motion } from "framer-motion";
import { ReactComponent as HeaderSvg } from "../../media/categoryHeader.svg";
import { ReactComponent as CardSvg } from "../../media/science&Nature.svg";

const CategorySelect = memo(() => {
  const { updateSessionState } = useContext(SessionContext);
  const { questions } = useContext(AssetContext);
  const [swiper, setSwiper] = useState<Swiper | null>(null);

  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { when: "beforeChildren" } }}
      exit={{ opacity: 0, transition: { when: "afterChildren" } }}
    >
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, translateX: `-50%`, translateY: `-95%` }}
        animate={{ opacity: 1, translateX: `-50%`, translateY: `-100%` }}
        exit={{ opacity: 0, translateX: `-50%`, translateY: `-95%` }}
      >
        <HeaderSvg />
      </motion.div>
      <ReactSwiper
        getSwiper={setSwiper}
        centeredSlides
        grabCursor
        spaceBetween={8}
        slidesPerView={"auto"}
        autoHeight
        effect="coverflow"
      >
        {_.map(questions, (question, category) => (
          <div key={category} className={styles.card}>
            <CardSvg />
          </div>
        ))}
      </ReactSwiper>
      <div className={styles.button}>
        <Button
          text="SELECT"
          type="primary"
          onClick={() => {
            updateSessionState((s) => {
              s.selectedCategory = _.keys(questions)[swiper?.activeIndex || 0];
              s.phase = "play";
            });
          }}
        />
      </div>
    </motion.div>
  );
});

export default CategorySelect;
