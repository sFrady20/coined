import React, { useMemo, useCallback, useState, useContext } from "react";
import styles from "./Question.module.scss";
import _ from "lodash";
import { Question, Answer } from ".";
import { SessionContext } from "../../components/Session";
import classnames from "classnames";

export default (props: {
  currentQuestionIndex: number;
  totalQuestions: number;
  question: Question;
  onComplete: (isCorrect: boolean) => void;
}) => {
  const { question, currentQuestionIndex, totalQuestions, onComplete } = props;
  const [selectedAnswer, selectAnswer] = useState<Answer>();
  const { setScore } = useContext(SessionContext);

  const answers = useMemo(
    () =>
      _(question.answers)
        .sort(() => Math.random())
        .take(5)
        .value(),
    [question]
  );

  const validateAnswer = useCallback(
    async (answer: Answer) => {
      if (!!selectedAnswer) return;
      selectAnswer(answer);
      if (answer.isCorrect) {
        setScore((s) => s + 100);
        window.navigator.vibrate(10);
      } else {
        window.navigator.vibrate(50);
      }
      await new Promise((resolve) => setTimeout(resolve, 400));
      onComplete(!!answer.isCorrect);
    },
    [onComplete, selectedAnswer, selectAnswer, setScore]
  );

  return (
    <div className={styles.root}>
      <h5>
        Question {currentQuestionIndex + 1}/{totalQuestions}
      </h5>
      <p>{question.text}</p>

      {_.map(answers, (answer, i) => {
        return (
          <div
            key={i}
            className={classnames(
              styles.answer,
              selectedAnswer === answer
                ? answer.isCorrect
                  ? styles["answer--correct"]
                  : styles["answer--incorrect"]
                : undefined
            )}
            onClick={() => validateAnswer(answer)}
          >
            {answer.text}
          </div>
        );
      })}
    </div>
  );
};
