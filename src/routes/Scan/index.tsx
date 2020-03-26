import React from "react";
import styles from "./index.module.scss";
import { useHistory } from "react-router";
import TransitionWrapper from "../../components/TransitionWrapper";
import { WELCOME_SCREEN } from "../../components/Router";
import Banner from "../../components/Banner";
import Panel from "../../components/Panel";
import ActionBar from "../../components/ActionBar";

export default () => {
  const history = useHistory();

  return (
    <div className={styles.root}>
      <Banner transitions={["fade", "down"]}>Coined Logo</Banner>
      <TransitionWrapper type={["fade", "scale"]}>
        <div className={styles.scanner} />
      </TransitionWrapper>
      <Panel>
        <p>
          Place a quarter heads-side up on a flat surface and line up in the
          target area to begin.
        </p>
        <ActionBar
          actions={{
            Start: () => history.push(WELCOME_SCREEN)
          }}
        />
      </Panel>
    </div>
  );
};
