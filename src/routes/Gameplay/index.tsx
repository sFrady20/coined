import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
  memo,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import { SessionContext } from "../../components/Session";
import Question from "./Question";
import useCountdown from "../../hooks/useCountdown";
import Result from "./Result";
import QUESTIONS from "./questions.json";
import AnimCounter from "../../components/AnimCounter";
import Panel from "../../components/Panel";
import { Redirect, useHistory } from "react-router";
import {
  CATEGORY_SELECT_SCREEN,
  COLLECTION_SCREEN,
} from "../../components/Router";
import { COLLECTION_ITEMS } from "../Collection";
import { motion } from "framer-motion";
import { ReactComponent as Timer } from "../../media/timer.svg";
import Leaderboard from "./Leaderboard";
import imgLogo from "../../media/coined.png";

export type Question = {
  text: string;
  correctMessage: string;
  incorrectMessage: string;
  answers: Answer[];
};
export type Answer = {
  text: string;
  isCorrect?: boolean;
};
const QUESTION_COUNT = 10;

export type GameState = "starting" | "playing" | "finished" | "leaderboard";

export type GameplayContext = {
  gameState: GameState;
  secondsLeft: number;
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  questions: Question[];
  currentQuestionIndex: number;
};
const defaultGameplayContext: GameplayContext = {
  gameState: "starting",
  score: 0,
  setScore: () => {},
  secondsLeft: 0,
  currentQuestionIndex: 0,
  questions: [],
};
export const GameplayContext = createContext(defaultGameplayContext);

const Gameplay = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { selectedCategory, itemCollected, collect, collection } = useContext(
    SessionContext
  );
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("starting");
  const history = useHistory();
  const [isPaused, setPaused] = useState(false);

  const finishGame = useCallback(() => {
    if (!itemCollected) {
      const itemToCollect = _(COLLECTION_ITEMS)
        .filter((i) => !_.includes(collection, i))
        .sortBy((i) => Math.random())
        .first();
      if (itemToCollect) {
        collect(itemToCollect);
      }
    }
    setGameState("finished");
  }, [setGameState, collection, collect, itemCollected]);

  //TODO: change back to 3
  const countdown = useCountdown(0, gameState === "starting", () => {
    setGameState("playing");
  });
  const secondsLeft = useCountdown(
    25,
    gameState === "playing" && !isPaused,
    () => {
      finishGame();
    },
    30
  );

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
    if (currentQuestionIndex >= questions.length && gameState === "playing")
      finishGame();
  }, [questions, currentQuestionIndex, gameState, finishGame]);

  if (!selectedCategory) {
    return <Redirect to={CATEGORY_SELECT_SCREEN} />;
  }

  return (
    <GameplayContext.Provider
      value={{
        score,
        setScore,
        questions,
        secondsLeft,
        currentQuestionIndex,
        gameState,
      }}
    >
      <div className={styles.logo}>
        <img src={imgLogo} />
      </div>
      <div className={styles.timer}>
        <Timer width={100} height={150} />
        <div className={styles.score}>
          <AnimCounter value={score} />
        </div>
        <div className={styles.time}>
          <AnimCounter value={secondsLeft} />
        </div>
      </div>
      <div style={{ flex: 1 }} />
      {gameState === "starting" ? (
        <Panel>Game Starting {countdown}</Panel>
      ) : gameState === "playing" ? (
        <motion.div
          variants={{
            hide: {},
            show: {
              transition: {
                staggerChildren: 0.4 / questions.length,
                staggerDirection: -1,
                when: "beforeChildren",
              },
            },
          }}
          initial={"hide"}
          animate={"show"}
          className={styles.questionContainer}
        >
          {_.map(questions, (question, index) => {
            return (
              <motion.div
                variants={{
                  hide: {
                    translateY: 350,
                    translateZ: 20,
                    rotateX: -10,
                  },
                  show: { translateY: 0, translateZ: 0, rotateX: 0 },
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                key={index}
              >
                <Question
                  question={question}
                  index={index}
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestions={questions.length}
                  onAsk={() => {
                    setPaused(false);
                  }}
                  onAnswered={() => {
                    setPaused(true);
                  }}
                  onComplete={() => {
                    setCurrentQuestionIndex((i) => i + 1);
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      ) : gameState === "finished" ? (
        <Result
          onContinue={() => {
            setGameState("leaderboard");
          }}
        />
      ) : gameState === "leaderboard" ? (
        <Leaderboard onContinue={() => history.push(COLLECTION_SCREEN)} />
      ) : (
        <> </>
      )}
    </GameplayContext.Provider>
  );
};

export default memo(Gameplay);
