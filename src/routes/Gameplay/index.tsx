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
import Quarters from "../Collection/Quarters";
import { motion, AnimatePresence } from "framer-motion";
import { AssetContext } from "../../components/AssetLoader";
import useKeyPress from "../../hooks/useKeyPress";
import { ARContext } from "../../components/ARBridge";
import shortid from "shortid";
import Progress from "./Progress";

export type QuestionDefinition = {
  category: string;
  question: string;
  answer: boolean;
  explanation: string;
};

export type GameplayContext = {
  questions: QuestionDefinition[];
  currentQuestionIndex: number;
};
const defaultGameplayContext: GameplayContext = {
  currentQuestionIndex: 0,
  questions: [],
};
export const GameplayContext = createContext(defaultGameplayContext);

export const QUESTION_GOAL = 10;
const MAX_QUESTIONS = 15;

const Gameplay = (props: { category: keyof typeof Quarters }) => {
  const { category } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { events, updateSessionState, gameState, updateGameState } = useContext(
    SessionContext
  );
  const { questions, sfx } = useContext(AssetContext);
  const { arController } = useContext(ARContext);
  const { collection } = gameState;
  const gameFinished = useRef(false);
  const batch = useRef(shortid());
  const quarter = useMemo(() => category && Quarters[category], [category]);
  const [shuffledQuestions, setShuffledQuestions] = useState<
    QuestionDefinition[]
  >([]);
  const currentQuestion = useMemo(
    () => shuffledQuestions[currentQuestionIndex],
    [shuffledQuestions, currentQuestionIndex]
  );
  const answeredQuestions = useMemo(
    () => gameState.answeredQuestions[category] || [],
    [gameState, category]
  );

  const shuffleQuestions = useCallback(() => {
    batch.current = shortid();
    setShuffledQuestions(
      _(questions[quarter.questionDataId])
        .take(MAX_QUESTIONS)
        .filter((q) => !answeredQuestions.includes(q))
        .orderBy(() => Math.random())
        .value()
    );
  }, [quarter, questions, setShuffledQuestions, answeredQuestions, batch]);

  useEffect(() => {
    shuffleQuestions();
  }, []);

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
    arController.george.say(sfx["gwEnd"]);

    const itemToCollect = _(Quarters)
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
      s.phase = "home";
    });

    gameFinished.current = true;
  }, [
    collection,
    updateSessionState,
    updateGameState,
    sfx,
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
  }, [answeredQuestions, category, finishGame]);

  if (!quarter) return null;
  const PanelComponent = quarter.panel;

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.panel}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <PanelComponent />
      </motion.div>

      <div className={styles.progress}>
        <Progress current={answeredQuestions.length} max={QUESTION_GOAL} />
      </div>

      <motion.div
        className={styles.questions}
        initial={{ translateY: 0 }}
        animate={{ translateY: 0 }}
        exit={{ translateY: "50vh" }}
      >
        <GameplayContext.Provider
          value={{
            questions: shuffledQuestions,
            currentQuestionIndex,
          }}
        >
          <AnimatePresence exitBeforeEnter>
            {currentQuestion && (
              <Question
                key={batch.current + "-" + currentQuestionIndex}
                question={currentQuestion}
                index={currentQuestionIndex}
                currentQuestionIndex={currentQuestionIndex}
                onAsk={() => {}}
                onAnswered={(answer) => {
                  //setPaused(true);
                  if (answer === currentQuestion.answer) {
                    updateGameState((s) => {
                      s.answeredQuestions[category] = [
                        ...answeredQuestions,
                        currentQuestion,
                      ];
                    });

                    //play random correct sfx
                    _(sfx["correct"])
                      .orderBy(() => Math.random())
                      .first()
                      ?.play();

                    limitedEffect(() => {
                      arController.george.say(sfx["gwCorrect"]);
                    });
                  } else {
                    //play random wrong sfx
                    _(sfx["wrong"])
                      .orderBy(() => Math.random())
                      .first()
                      ?.play();

                    limitedEffect(() => {
                      arController.george.say(sfx["gwWrong"]);
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
            )}
          </AnimatePresence>
        </GameplayContext.Provider>
      </motion.div>
    </div>
  );
};

export default memo(Gameplay);
