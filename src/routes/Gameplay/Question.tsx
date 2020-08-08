import React, { memo, useState, useEffect, useContext } from "react";
import styles from "./Question.module.scss";
import _ from "lodash";
import { QuestionDefinition } from ".";
import { ReactComponent as QuestionCardBgSvg } from "../../media/questionCardBg.svg";
import { ReactComponent as TrueAnswerBgSvg } from "../../media/trueAnswerCard.svg";
import { ReactComponent as FalseAnswerBgSvg } from "../../media/falseAnswerCard.svg";
import Button from "../../components/Button";
import { motion } from "framer-motion";
import { AssetContext } from "../../components/AssetLoader";

const Question = (props: {
  question: QuestionDefinition;
  index: number;
  currentQuestionIndex: number;
  onAsk?: () => void;
  onAnswered?: (answer: boolean) => void;
  onComplete?: () => void;
}) => {
  const { question, onAnswered, onComplete } = props;
  const [answer, setAnswer] = useState<boolean>();
  const { sfx } = useContext(AssetContext);

  useEffect(() => {
    if (answer === undefined) {
      const timerSfx = sfx.timer[0];
      timerSfx.volume(0);
      timerSfx.play();
      var i = 0;
      const space = 0.1;

      const interval = setInterval(() => {
        const pct = i / timerSfx.duration();
        timerSfx.volume(pct * 0.7);
        i += space;
        if (pct > 1) {
          setAnswer(!question.answer);
          onAnswered && onAnswered(!question.answer);
        }
      }, space * 1000);
      return () => {
        timerSfx.stop();
        clearInterval(interval);
      };
    }
  }, [sfx, answer, onAnswered, setAnswer]);

  return (
    <motion.div
      className={styles.root}
      initial={{ translateY: "50vh" }}
      animate={{ translateY: 0 }}
      exit={{ translateY: "50vh" }}
    >
      <motion.div
        className={styles.question}
        variants={{
          default: { rotateY: "0deg" },
          flipped: { rotateY: "180deg" },
        }}
        initial={"default"}
        animate={answer === undefined ? "default" : "flipped"}
        exit={"flipped"}
      >
        <div className={styles.questionBg}>
          <QuestionCardBgSvg />
        </div>

        <div className={styles.questionText}>{question.question}</div>

        <div className={styles.questionActions}>
          <Button
            type="secondary"
            text="TRUE"
            onClick={() => {
              setAnswer(true);
              onAnswered && onAnswered(true);
            }}
          />
          <Button
            type="secondary"
            text="FALSE"
            onClick={() => {
              setAnswer(false);
              onAnswered && onAnswered(false);
            }}
          />
        </div>
      </motion.div>
      <motion.div
        className={styles.answer}
        variants={{
          default: { rotateY: "180deg" },
          flipped: { rotateY: "0deg" },
        }}
        initial={"default"}
        animate={answer === undefined ? "default" : "flipped"}
        exit={"flipped"}
      >
        <div className={styles.answerBg}>
          {question.answer ? <TrueAnswerBgSvg /> : <FalseAnswerBgSvg />}
        </div>

        <div className={styles.answerHeader}>
          {question.answer === true ? "That's True!" : "That's False!"}
        </div>
        <div className={styles.answerText}>
          {question.explanation.replace(/^That.s\s(true|false)!/gi, "")}
        </div>

        <div className={styles.answerActions}>
          <Button
            type="secondary"
            text="Next"
            onClick={() => {
              onComplete && onComplete();
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default memo(Question);
