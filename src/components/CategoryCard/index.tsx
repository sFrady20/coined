import React, { memo, useContext } from "react";
import styles from "./index.module.scss";
import Quarters from "../../routes/Collection/Quarters";
import { AssetContext } from "../../components/AssetLoader";
import { motion } from "framer-motion";
import _ from "lodash";

const CategoryCard = memo((props: { category: keyof typeof Quarters }) => {
  const { category } = props;
  const quarter = Quarters[category];
  const { images } = useContext(AssetContext);

  const CardComponent = quarter.card;

  return (
    <div className={styles.card}>
      <CardComponent />
      <img
        className={styles.quarter}
        src={images[quarter.imgBack]}
        alt={category}
      />
    </div>
  );
});

export default CategoryCard;
