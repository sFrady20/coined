import React, { memo } from "react";
import styles from "./index.module.scss";
import TransitionWrapper, { TransitionType } from "../TransitionWrapper";

const Banner = (props: {
  children: React.ReactNode;
  transitions?: TransitionType[];
}) => {
  const { children, transitions } = props;
  return (
    <TransitionWrapper
      type={transitions || ["fade", "down"]}
      className={styles.root}
    >
      {children}
    </TransitionWrapper>
  );
};

export default memo(Banner);
