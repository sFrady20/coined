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
import AnimCounter from "../../components/AnimCounter";
import Panel from "../../components/Panel";
import quarters from "../Collection/quarters.json";
import { motion } from "framer-motion";
import { ReactComponent as Timer } from "../../media/timer.svg";
import { AssetContext } from "../../components/AssetLoader";
import useKeyPress from "../../hooks/useKeyPress";

export type Question = {
  quarter: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prompt: string;
  correctAnswer: string;
  wrongAnswer1: string;
  wrongAnswer2: string;
  answers: Answer[];
};
export type Answer = {
  text: string;
  isCorrect?: boolean;
};

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
  const {
    sessionState,
    updateSessionState,
    itemCollected,
    collect,
    collection,
  } = useContext(SessionContext);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("starting");
  const [isPaused, setPaused] = useState(false);
  const { questions, sfx } = useContext(AssetContext);
  const { selectedCategory } = sessionState;

  //gather sfx
  const correctSounds = useMemo(
    () => [sfx.correct1, sfx.correct2, sfx.correct3],
    [sfx]
  );
  const wrongSounds = useMemo(() => [sfx.wrong1, sfx.wrong2, sfx.wrong3], [
    sfx,
  ]);
  const endSounds = useMemo(() => [sfx.end1, sfx.end2, sfx.end3], [sfx]);

  //
  const stopAllSounds = useCallback(() => {
    _.forEach(correctSounds, (s) => s.stop());
    _.forEach(wrongSounds, (s) => s.stop());
    _.forEach(endSounds, (s) => s.stop());
  }, [correctSounds, wrongSounds, endSounds]);

  //
  const finishGame = useCallback(() => {
    //play end sfx
    stopAllSounds();
    _(endSounds)
      .sort((s) => (Math.random() > 0.5 ? -1 : 1))
      .first()
      ?.play();

    if (!itemCollected) {
      const itemToCollect = _(quarters)
        .filter((q, i) => !_.includes(collection, i))
        .sortBy((i) => Math.random())
        .keys()
        .first();
      if (itemToCollect) {
        collect(itemToCollect);
      }
    }
    updateSessionState((s) => {
      s.phase = "leaderboard";
      s.finalScore = score;
    });
  }, [
    collection,
    collect,
    itemCollected,
    updateSessionState,
    endSounds,
    stopAllSounds,
    score,
  ]);

  //skip questions for quick debugging
  useKeyPress("q", () => {
    finishGame();
  });

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

  const shuffledQuestions = useMemo(
    () =>
      questions
        ? _(questions[selectedCategory!])
            .sort(() => (Math.random() > 0.5 ? 1 : -1))
            .value()
        : [],
    [selectedCategory, questions]
  );

  useEffect(() => {
    if (
      shuffledQuestions &&
      currentQuestionIndex >= shuffledQuestions.length &&
      gameState === "playing"
    )
      finishGame();
  }, [shuffledQuestions, currentQuestionIndex, gameState, finishGame]);

  return (
    <GameplayContext.Provider
      value={{
        score,
        setScore,
        questions: shuffledQuestions,
        secondsLeft,
        currentQuestionIndex,
        gameState,
      }}
    >
      <motion.div
        className={styles.timer}
        initial={{ translateY: -150, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        exit={{ translateY: -150, opacity: 0 }}
      >
        <Timer width={100} height={150} />
        <div className={styles.score}>
          <AnimCounter value={score} />
        </div>
        <div className={styles.time}>
          <AnimCounter value={secondsLeft} />
        </div>
      </motion.div>
      <div style={{ flex: 1 }} />
      <motion.div
        initial={{ opacity: 1, translateY: 0 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ translateY: 150, opacity: 0 }}
      >
        {gameState === "starting" ? (
          <Panel>Game Starting {countdown}</Panel>
        ) : gameState === "playing" ? (
          <motion.div
            variants={{
              hide: {},
              show: {
                transition: {
                  staggerChildren: 0.4 / shuffledQuestions.length,
                  staggerDirection: -1,
                  when: "beforeChildren",
                },
              },
            }}
            initial={"hide"}
            animate={"show"}
            className={styles.questionContainer}
          >
            {_(shuffledQuestions)
              .map((question, index) => {
                if (index < currentQuestionIndex - 1) return null;
                if (index > currentQuestionIndex + 5) return null;

                return (
                  <motion.div
                    variants={{
                      hide: {
                        translateY: 350,
                        translateZ: -20,
                        rotateX: 10,
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
                      onAsk={() => {
                        setPaused(false);
                      }}
                      onAnswered={(answer) => {
                        setPaused(true);
                        stopAllSounds();
                        if (answer.isCorrect) {
                          //play random correct sfx
                          _(correctSounds)
                            .sort((s) => (Math.random() > 0.5 ? -1 : 1))
                            .first()
                            ?.play();
                        } else {
                          //play random wrong sfx
                          _(wrongSounds)
                            .sort((s) => (Math.random() > 0.5 ? -1 : 1))
                            .first()
                            ?.play();
                        }
                      }}
                      onComplete={() => {
                        setCurrentQuestionIndex((i) => i + 1);
                      }}
                    />
                  </motion.div>
                );
              })
              .value()}
          </motion.div>
        ) : (
          <> </>
        )}
      </motion.div>
    </GameplayContext.Provider>
  );
};

export default memo(Gameplay);
