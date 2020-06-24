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
  useRef,
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

export type GamePhase = "starting" | "playing" | "finished" | "leaderboard";

export type GameplayContext = {
  gamePhase: GamePhase;
  secondsLeft: number;
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  questions: Question[];
  currentQuestionIndex: number;
};
const defaultGameplayContext: GameplayContext = {
  gamePhase: "starting",
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
    gameState,
    updateGameState,
  } = useContext(SessionContext);
  const [score, setScore] = useState(0);
  const [gamePhase, setGamePhase] = useState<GamePhase>("starting");
  const [isPaused, setPaused] = useState(false);
  const { questions, sfx } = useContext(AssetContext);
  const { collection } = gameState;
  const { selectedCategory } = sessionState;
  const gameFinished = useRef(false);

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
    if (gameFinished.current) return;

    //play end sfx
    stopAllSounds();
    _(endSounds)
      .sort((s) => (Math.random() > 0.5 ? -1 : 1))
      .first()
      ?.play();

    const itemToCollect = _(quarters)
      .keys()
      .filter((q) => !_.includes(collection, q))
      .sortBy((i) => Math.random())
      .first();
    if (itemToCollect) {
      updateGameState((gs) => {
        gs.collection = _(gs.collection).push(itemToCollect).uniq().value();
      });
    }

    updateSessionState((s) => {
      s.phase = "leaderboard";
      s.finalScore = score;
    });

    gameFinished.current = true;
  }, [
    collection,
    updateSessionState,
    updateGameState,
    endSounds,
    stopAllSounds,
    score,
    gameFinished,
  ]);

  //skip questions for quick debugging
  useKeyPress("q", () => {
    finishGame();
  });

  //TODO: change back to 3
  const countdown = useCountdown(0, gamePhase === "starting", () => {
    setGamePhase("playing");
  });
  const secondsLeft = useCountdown(
    25,
    gamePhase === "playing" && !isPaused,
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
      gamePhase === "playing"
    )
      finishGame();
  }, [shuffledQuestions, currentQuestionIndex, gamePhase, finishGame]);

  return (
    <GameplayContext.Provider
      value={{
        score,
        setScore,
        questions: shuffledQuestions,
        secondsLeft,
        currentQuestionIndex,
        gamePhase,
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
        {gamePhase === "starting" ? (
          <Panel>Game Starting {countdown}</Panel>
        ) : gamePhase === "playing" ? (
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
            className={styles.questions}
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
                    className={styles.questionContainer}
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
