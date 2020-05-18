import React, { memo } from "react";
import styles from "./index.module.scss";
import TransitionWrapper, { TransitionType } from "../TransitionWrapper";

const Panel = (props: {
  children: React.ReactNode;
  transitions?: TransitionType[];
}) => {
  const { children, transitions } = props;
  return (
    <TransitionWrapper
      type={transitions || ["fade", "up"]}
      className={styles.root}
    >
      {children}
    </TransitionWrapper>
  );
};

export default memo(Panel);
