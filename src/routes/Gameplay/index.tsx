import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
  memo,
  createContext,
  useRef,
} from "react";
import styles from "./index.module.scss";
import _ from "lodash";
import { SessionContext } from "../../components/Session";
import Question from "./Question";
import quarters from "../Collection/quarters.json";
import { motion } from "framer-motion";
import { AssetContext } from "../../components/AssetLoader";
import useKeyPress from "../../hooks/useKeyPress";
import { ARContext } from "../../components/ARBridge";
import shortid from "shortid";

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

export type GameplayContext = {
  questions: Question[];
  currentQuestionIndex: number;
};
const defaultGameplayContext: GameplayContext = {
  currentQuestionIndex: 0,
  questions: [],
};
export const GameplayContext = createContext(defaultGameplayContext);

const QUESTION_GOAL = 10;
const MAX_QUESTIONS = 15;

const Gameplay = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const {
    events,
    sessionState,
    updateSessionState,
    gameState,
    updateGameState,
  } = useContext(SessionContext);
  const { questions, sfx } = useContext(AssetContext);
  const { arController } = useContext(ARContext);
  const { collection } = gameState;
  const { selectedCategory } = sessionState;
  const gameFinished = useRef(false);
  const batch = useRef(shortid());

  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const shuffleQuestions = useCallback(() => {
    batch.current = shortid();
    setShuffledQuestions(
      _(questions[selectedCategory!])
        .take(MAX_QUESTIONS)
        .filter((q) => !answeredQuestions.includes(q))
        .orderBy(() => Math.random())
        .value()
    );
  }, [
    selectedCategory,
    questions,
    setShuffledQuestions,
    answeredQuestions,
    batch,
  ]);

  useEffect(() => {
    shuffleQuestions();
  }, []);

  //gather sfx
  const correctSounds = useMemo(() => [sfx.correct], [sfx]);
  const gwCorrectSounds = useMemo(
    () => [sfx.correct1, sfx.correct2, sfx.correct3],
    [sfx]
  );
  const wrongSounds = useMemo(() => [sfx.wrong], [sfx]);
  const gwWrongSounds = useMemo(() => [sfx.wrong1, sfx.wrong2, sfx.wrong3], [
    sfx,
  ]);
  const endSounds = useMemo(() => [sfx.end1, sfx.end2, sfx.end3], [sfx]);

  const limitedEffect = useMemo(
    () =>
      _.throttle(
        (action: () => void) => {
          action();
        },
        15000,
        { leading: true, trailing: false }
      ),
    []
  );

  //
  const finishGame = useCallback(() => {
    if (gameFinished.current) return;

    //play end sfx
    arController.george.say(
      _(endSounds)
        .sort((s) => (Math.random() > 0.5 ? -1 : 1))
        .first()
    );

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

    //fire event
    events.dispatchEvent({ type: "endGame" });

    updateSessionState((s) => {
      s.phase = "collection";
    });

    gameFinished.current = true;
  }, [
    collection,
    updateSessionState,
    updateGameState,
    endSounds,
    arController,
    gameFinished,
    events,
  ]);

  //skip questions for quick debugging
  useKeyPress("q", () => {
    finishGame();
  });

  useEffect(() => {
    if (answeredQuestions.length >= QUESTION_GOAL) finishGame();
  }, [answeredQuestions, finishGame]);

  return (
    <GameplayContext.Provider
      value={{
        questions: shuffledQuestions,
        currentQuestionIndex,
      }}
    >
      <div className={styles.counter}>
        {_.times(QUESTION_GOAL, (i) => (
          <div
            key={i}
            className={
              answeredQuestions.length > i
                ? styles.counterItemFilled
                : styles.counterItem
            }
          />
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <motion.div
        initial={{ opacity: 1, translateY: 0 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ translateY: 150, opacity: 0 }}
      >
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
              if (index > currentQuestionIndex + 0) return null;

              return (
                <Question
                  key={batch.current + "-" + index}
                  question={question}
                  index={index}
                  currentQuestionIndex={currentQuestionIndex}
                  onAsk={() => {}}
                  onAnswered={(answer) => {
                    //setPaused(true);
                    if (answer.isCorrect) {
                      setAnsweredQuestions((a) => [...a, question]);

                      //play random correct sfx
                      _(correctSounds)
                        .orderBy(() => Math.random())
                        .first()
                        ?.play();

                      limitedEffect(() => {
                        arController.george.say(
                          _(gwCorrectSounds)
                            .orderBy(() => Math.random())
                            .first()
                        );
                      });
                    } else {
                      //play random wrong sfx
                      _(wrongSounds)
                        .orderBy(() => Math.random())
                        .first()
                        ?.play();

                      limitedEffect(() => {
                        arController.george.say(
                          _(gwWrongSounds)
                            .orderBy(() => Math.random())
                            .first()
                        );
                      });
                    }
                  }}
                  onComplete={() => {
                    setCurrentQuestionIndex((a) => {
                      if (a + 1 < shuffledQuestions.length) {
                        return a + 1;
                      } else {
                        shuffleQuestions();
                        return 0;
                      }
                    });
                  }}
                />
              );
            })
            .value()}
        </motion.div>
      </motion.div>
    </GameplayContext.Provider>
  );
};

export default memo(Gameplay);
