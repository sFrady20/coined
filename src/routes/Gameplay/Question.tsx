import React, {
  useMemo,
  useCallback,
  useState,
  useContext,
  memo,
  useEffect,
  useRef,
} from "react";
import styles from "./Question.module.scss";
import _ from "lodash";
import { Question as QuestionDefinition, Answer, GameplayContext } from ".";
import classnames from "classnames";
import { SessionContext } from "../../components/Session";
import { motion, useAnimation } from "framer-motion";
import { createPortal } from "react-dom";

import { ReactComponent as CardSvg } from "../../media/categories/science&NatureQuestion.svg";
import { ReactComponent as CultureCardSvg } from "../../media/categories/cultureQuestion.svg";
import { ReactComponent as HistoryCardSvg } from "../../media/categories/historyQuestion.svg";
import { ReactComponent as ScienceCardSvg } from "../../media/categories/science&NatureQuestion.svg";
import { ReactComponent as StatesCardSvg } from "../../media/categories/states&TerritoriesQuestion.svg";
import { ReactComponent as WildlifeCardSvg } from "../../media/categories/wildlifeQuestion.svg";

const artMap = {
  default: CardSvg,
  Culture: CultureCardSvg,
  "History.": HistoryCardSvg,
  "Science & Nature": ScienceCardSvg,
  "State History": StatesCardSvg,
  "DC &amp; U.S. Territories History": StatesCardSvg,
  "States & Territories": StatesCardSvg,
  Wildlife: WildlifeCardSvg,
};

const Question = (props: {
  question: QuestionDefinition;
  index: number;
  currentQuestionIndex: number;
  onAsk?: () => void;
  onAnswered?: (answer: Answer) => void;
  onComplete?: (isCorrect: boolean) => void;
}) => {
  const {
    question,
    index,
    currentQuestionIndex,
    onAsk,
    onAnswered,
    onComplete,
  } = props;
  const [selectedAnswer, selectAnswer] = useState<Answer>();
  const { events, sessionState } = useContext(SessionContext);
  const { setScore } = useContext(GameplayContext);
  const [randRotation, setRandRotation] = useState(0);
  const answerClickEvent = useRef<MouseEvent>();
  const feedbackAnimation = useAnimation();
  const { selectedCategory } = sessionState;
  const anim = useAnimation();

  const diff = useMemo(() => {
    setRandRotation(Math.random() * 30 - 15);
    return currentQuestionIndex - index;
  }, [currentQuestionIndex, index]);

  useEffect(() => {
    if (diff === 0 && onAsk) onAsk();
  }, [diff, onAsk]);

  const answers = useMemo(
    () =>
      _([
        {
          isCorrect: true,
          text: question.correctAnswer,
        },
        {
          isCorrect: false,
          text: question.wrongAnswer1,
        },
        {
          isCorrect: false,
          text: question.wrongAnswer2,
        },
      ])
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
        .take(5)
        .value(),
    [question]
  );

  const validateAnswer = useCallback(
    async (answer: Answer) => {
      if (diff !== 0) return;
      if (!!selectedAnswer) return;
      selectAnswer(answer);
      if (answer.isCorrect) {
        //correct
        setScore((s) => s + 100);
        if (window.navigator.vibrate) window.navigator.vibrate(10);
        events.dispatchEvent({ type: "correct" });
      } else {
        //incorrect
        if (window.navigator.vibrate) window.navigator.vibrate(50);
        events.dispatchEvent({ type: "incorrect" });
      }
      if (onAnswered) onAnswered(answer);
      feedbackAnimation.set({
        opacity: 0,
        translateY: 0,
        left: `${answerClickEvent.current?.clientX}px`,
        top: `${answerClickEvent.current?.clientY}px`,
      });
      await feedbackAnimation.start({
        opacity: 1,
        translateY: -30,
        transition: {
          ease: "easeOut",
          duration: 0.6,
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      await feedbackAnimation.start({
        opacity: 0,
        translateY: -60,
        transition: {
          ease: "easeIn",
          duration: 0.6,
        },
      });
      if (onComplete) onComplete(answer.isCorrect || false);
    },
    [
      selectedAnswer,
      selectAnswer,
      setScore,
      events,
      diff,
      onAnswered,
      onComplete,
      feedbackAnimation,
    ]
  );

  useEffect(() => {
    anim.set({
      translateY: 350,
      translateZ: -200,
      rotateX: 10,
    });
  }, [anim]);
  useEffect(() => {
    anim.stop();
    anim.start(
      diff > 0
        ? {
            translateZ: 20,
            translateX: selectedAnswer?.isCorrect ? 500 : -500,
            transition: {
              stiffness: 10,
            },
            rotateX: 0,
            rotateZ: selectedAnswer?.isCorrect ? 30 : -30,
          }
        : {
            translateZ: diff * 20,
            translateY: 0,
            translateX: 0,
            rotateX: 0,
            rotateZ: randRotation * Math.abs(diff / 5),
            transition: {
              delay: Math.max(0, -diff * 0.1),
            },
          }
    );
  }, [anim, diff, selectedAnswer, randRotation]);

  const CardSvg = useMemo(
    () => _.get(artMap, selectedCategory || "default") || artMap["default"],
    [selectedCategory]
  );

  return (
    <motion.div
      animate={anim}
      custom={{ diff, isCorrect: selectedAnswer?.isCorrect }}
      className={styles.animations}
    >
      <div className={styles.root}>
        <CardSvg />
        <div className={styles.number}>{index + 1}</div>
        <div className={styles.content}>
          <div className={styles.questionText}>
            <h5>{question.prompt}</h5>
          </div>
          <div className={styles.answers}>
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
                  onClick={(e) => {
                    answerClickEvent.current = e.nativeEvent;
                    validateAnswer(answer);
                  }}
                >
                  {answer.text}
                </div>
              );
            })}
          </div>
          {createPortal(
            <motion.div className={styles.feedback} animate={feedbackAnimation}>
              <div
                className={
                  selectedAnswer?.isCorrect
                    ? styles.feedbackTrue
                    : styles.feedbackFalse
                }
              />
            </motion.div>,
            document.body
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(Question);
