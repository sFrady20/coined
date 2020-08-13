import React, { useState, useContext, memo } from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import { SessionContext } from "../../components/Session";
import ReactSwiper from "react-id-swiper";
import Button from "../../components/Button";
import Swiper from "swiper";
import { motion } from "framer-motion";
import { ReactComponent as HeaderSvg } from "../../media/categoryHeader.svg";
import Quarters from "../Collection/Quarters";
import CategoryCard from "../../components/CategoryCard";

const CategorySelect = memo(() => {
  const { updateSessionState } = useContext(SessionContext);
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
        {_.map(Quarters, (quarter, category) => {
          return (
            <div key={category} className={styles.card}>
              <CategoryCard category={category as keyof typeof Quarters} />
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
              s.selectedCategory = _.keys(Quarters)[
                swiper?.activeIndex || 0
              ] as keyof typeof Quarters;
              s.phase = "play";
            });
          }}
        />
      </div>
    </motion.div>
  );
});

export default CategorySelect;
