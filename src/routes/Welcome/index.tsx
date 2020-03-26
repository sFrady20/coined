import React from "react";
import styles from "./index.module.scss";
import { useHistory } from "react-router";
import { CATEGORY_SELECT_SCREEN } from "../../components/Router";
import Banner from "../../components/Banner";
import Panel from "../../components/Panel";
import ActionBar from "../../components/ActionBar";

export default () => {
  const history = useHistory();

  return (
    <div className={styles.root}>
      <Banner transitions={["fade", "down"]}>Coined Logo</Banner>
      <Panel>
        <h5>Welcome</h5>
        <p>
          Place a quarter heads-side up on a flat surface and line up in the
          target area to begin.
        </p>
        <ActionBar
          actions={{
            Continue: () => history.push(CATEGORY_SELECT_SCREEN)
          }}
        />
      </Panel>
    </div>
  );
};
