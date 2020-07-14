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
import { ReactComponent as CultureCardSvg } from "../../media/categories/culture.svg";
import { ReactComponent as HistoryCardSvg } from "../../media/categories/history.svg";
import { ReactComponent as ScienceCardSvg } from "../../media/categories/science&Nature.svg";
import { ReactComponent as StatesCardSvg } from "../../media/categories/states&Territories.svg";
import { ReactComponent as WildlifeCardSvg } from "../../media/categories/wildlife.svg";

const artMap = {
  default: CardSvg,
  Culture: CultureCardSvg,
  "History.": HistoryCardSvg,
  "Science & Nature": ScienceCardSvg,
  "State History": StatesCardSvg,
  "DC &amp; U.S. Territories History": StatesCardSvg,
  "States & Territories": StatesCardSvg,
  Wildlife: WildlifeCardSvg,
};

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
        navigation={{
          nextEl: `.${styles.next}`,
          prevEl: `.${styles.prev}`,
        }}
        renderNextButton={() => <div className={styles.next} />}
        renderPrevButton={() => <div className={styles.prev} />}
      >
        {_.map(questions, (question, category) => {
          const CMP = _.get(artMap, category) || artMap["default"];
          return (
            <div key={category} className={styles.card}>
              <CMP />
            </div>
          );
        })}
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
