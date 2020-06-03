import React, { useContext, memo } from "react";
import styles from "./Result.module.scss";
import _ from "lodash";
import ActionBar from "../../components/ActionBar";
import Panel from "../../components/Panel";
import { GameplayContext } from ".";

const Result = (props: { onContinue: () => void }) => {
  const { onContinue } = props;
  const { score } = useContext(GameplayContext);

  return (
    <Panel>
      <h5>Score</h5>
      {score}
      <ActionBar actions={{ Continue: onContinue }} />
    </Panel>
  );
};

export default memo(Result);
