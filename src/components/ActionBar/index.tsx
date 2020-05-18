import React from "react";
import styles from "./index.module.scss";
import _ from "lodash";

export default (props: {
  actions: { [key: string]: (() => void) | undefined };
}) => {
  const { actions } = props;
  return (
    <div className={styles.root}>
      {_.map(
        actions,
        (action, title) =>
          action && (
            <div
              className={styles.button}
              key={title}
              onClick={() => {
                window.navigator.vibrate(10);
                action();
              }}
            >
              {title}
            </div>
          )
      )}
    </div>
  );
};
