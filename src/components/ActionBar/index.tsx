import React from "react";
import styles from "./index.module.scss";
import _ from "lodash";

export default (props: { actions: { [key: string]: () => void } }) => {
  const { actions } = props;
  return (
    <div className={styles.root}>
      {_.map(actions, (action, title) => (
        <div className={styles.button} onClick={action}>
          {title}
        </div>
      ))}
    </div>
  );
};
