import React, { useMemo, useCallback, useState, useContext, memo } from "react";
import styles from "./Question.module.scss";
import _ from "lodash";
import { Question as QuestionDefinition, Answer } from ".";
import classnames from "classnames";
import { SessionContext } from "../../components/Session";

const Question = (props: {
  currentQuestionIndex: number;
  totalQuestions: number;
  question: QuestionDefinition;
  onComplete: (isCorrect: boolean) => void;
}) => {
  const { question, currentQuestionIndex, totalQuestions, onComplete } = props;
  const [selectedAnswer, selectAnswer] = useState<Answer>();
  const { setScore, events } = useContext(SessionContext);

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
        //correct
        setScore((s) => s + 100);
        window.navigator.vibrate(10);
        events.dispatchEvent({ type: "correct" });
      } else {
        //incorrect
        window.navigator.vibrate(50);
        events.dispatchEvent({ type: "incorrect" });
      }
      await new Promise((resolve) => setTimeout(resolve, 400));
      onComplete(!!answer.isCorrect);
    },
    [onComplete, selectedAnswer, selectAnswer, setScore, events]
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

export default memo(Question);
