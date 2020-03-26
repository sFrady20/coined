import React, { useContext } from "react";
import { SessionContext } from "../../components/Session";
import ActionBar from "../../components/ActionBar";
import Panel from "../../components/Panel";

export default (props: {
  correctCount: number;
  totalQuestions: number;
  onContinue: () => void;
}) => {
  const { correctCount, totalQuestions, onContinue } = props;
  const { score } = useContext(SessionContext);

  return (
    <Panel>
      <h5>Correct Answers</h5>
      {correctCount}/{totalQuestions}
      <h5>Score</h5>
      {score}
      <ActionBar actions={{ Continue: onContinue }} />
    </Panel>
  );
};
