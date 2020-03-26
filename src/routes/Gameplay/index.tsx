import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback
} from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import { SessionContext } from "../../components/Session";
import Question from "./Question";
import { AnimatePresence, motion } from "framer-motion";
import useCountdown from "../../hooks/useCountdown";
import Result from "./Result";
import QUESTIONS from "./questions.json";
import Banner from "../../components/Banner";
import Panel from "../../components/Panel";
import { Redirect, useHistory } from "react-router";
import {
  CATEGORY_SELECT_SCREEN,
  COLLECTION_SCREEN
} from "../../components/Router";
import { COLLECTION_ITEMS } from "../Collection";

export type Question = {
  text: string;
  answers: Answer[];
};
export type Answer = {
  text: string;
  isCorrect?: boolean;
};
/*
const QUESTIONS: Question[] = _.times(20, q => {
  const correctAnswer = q % 3;
  return {
    text: `Question ${q + 1}`,
    answers: _.times(3, a => ({
      text: `answer ${a}${a === correctAnswer ? " ✓" : ""}`,
      isCorrect: a === correctAnswer
    }))
  };
});
*/
const QUESTION_COUNT = 10;

export type GameState = "starting" | "playing" | "finished";

export default () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const {
    score,
    setScore,
    selectedCategory,
    itemCollected,
    collect,
    collection
  } = useContext(SessionContext);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameState, setGameState] = useState<GameState>("starting");
  const history = useHistory();

  if (!selectedCategory) {
    return <Redirect to={CATEGORY_SELECT_SCREEN} />;
  }

  const finishGame = useCallback(() => {
    if (!itemCollected) {
      const itemToCollect = _(COLLECTION_ITEMS)
        .filter(i => !_.includes(collection, i))
        .sortBy(i => Math.random())
        .first();
      if (itemToCollect) {
        collect(itemToCollect);
      }
    }
    setGameState("finished");
  }, [setGameState, collection, collect, itemCollected]);

  const countdown = useCountdown(3, gameState === "starting", () => {
    setGameState("playing");
  });
  const secondsLeft = useCountdown(25, gameState === "playing", () => {
    finishGame();
  });

  useEffect(() => {
    setScore(0);
  }, [setScore]);

  const questions = useMemo(
    () =>
      _(QUESTIONS)
        .sort(() => Math.random())
        .take(QUESTION_COUNT)
        .value(),
    []
  );

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) finishGame();
  }, [questions, currentQuestionIndex]);
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [
    currentQuestionIndex,
    questions
  ]);

  return (
    <div className={styles.root}>
      <AnimatePresence initial={false} exitBeforeEnter>
        {gameState === "starting" || gameState === "playing" ? (
          <Banner transitions={["fade", "down"]} key="playbanner">
            <div className={styles.status}>Category: {selectedCategory}</div>
            <div className={styles.status}>Score: {score}</div>
            <div className={styles.status}>Time: {secondsLeft}</div>
          </Banner>
        ) : (
          <Banner transitions={["fade", "down"]} key="resultbanner">
            Coined Logo
          </Banner>
        )}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {gameState === "starting" ? (
          <Panel key="countdown">Game Starting {countdown}</Panel>
        ) : gameState === "playing" ? (
          currentQuestion && (
            <motion.div
              key={currentQuestionIndex}
              initial={{ translateX: 32, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: -32, opacity: 0 }}
            >
              <Question
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                question={currentQuestion}
                onComplete={isCorrect => {
                  if (isCorrect) setCorrectCount(c => c + 1);
                  setCurrentQuestionIndex(i => i + 1);
                }}
              />
            </motion.div>
          )
        ) : (
          <Result
            correctCount={correctCount}
            totalQuestions={questions.length}
            onContinue={() => {
              history.push(COLLECTION_SCREEN);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
