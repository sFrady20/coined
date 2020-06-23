import React, {
  memo,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import styles from "./Leaderboard.module.scss";
import Axios from "axios";
import _ from "lodash";
import { LEADERBOARD_API_URL } from "../../config";
import { GameplayContext } from "../Gameplay";
import { SessionContext } from "../../components/Session";
import { ReactComponent as LeaderboardBgSvg } from "../../media/leaderboardBg.svg";
import Button from "../../components/Button";
import { motion } from "framer-motion";
import AnimCounter from "../../components/AnimCounter";

const fetchLeaderboard = async () => {
  const result = await Axios.get(LEADERBOARD_API_URL);
  return result.data.body as LeaderboardScore[];
};

const Leaderboard = memo(() => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardScore[]>([]);
  const { gameState, updateGameState, updateSessionState } = useContext(
    SessionContext
  );
  const { sessionState } = useContext(SessionContext);
  const { score } = useContext(GameplayContext);
  const [error, setError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { finalScore } = sessionState;

  const postScoreToLeaderboard = useCallback(async () => {
    try {
      const result = await Axios.post(
        LEADERBOARD_API_URL,
        {
          clientId: gameState.clientId,
          initials: gameState.name,
          score,
        },
        {
          headers: {
            "x-api-key": "cCbihWMHLL1y5f6myVixI7ULPIEmNBes9DiW5NNa",
          },
        }
      );
      setHasSubmitted(true);
      return result.data;
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  }, [score, gameState, setHasSubmitted]);

  useEffect(() => {
    fetchLeaderboard()
      .then(setLeaderboard)
      .catch((err) => console.error(err));
  }, [setLeaderboard, score, setError]);

  return (
    <motion.div
      className={styles.container}
      initial={{ translateY: `100%` }}
      animate={{ translateY: 0 }}
      exit={{ translateY: `100%` }}
    >
      <LeaderboardBgSvg />
      <div className={styles.finalScore}>
        <AnimCounter initialValue={0} value={finalScore} />
      </div>
      <div className={styles.content}>
        <div className={styles.leaderboard}>
          {!hasSubmitted && (
            <input
              value={gameState.name}
              onChange={(e) => {
                const name = e.target.value;
                updateGameState((gs) => {
                  gs.name = name;
                });
              }}
            />
          )}
          {_.map(leaderboard, (leader, index) => (
            <div className={styles.score} key={index}>
              <span>{leader.initials}</span>
              <span>{leader.score}</span>
            </div>
          ))}
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
        <div className={styles.actions}>
          <Button
            type="secondary"
            text="SKIP"
            onClick={() => {
              updateSessionState((s) => {
                s.phase = "collection";
              });
            }}
          />
          <Button
            type="primary"
            text="ADD YOUR SCORE"
            onClick={async () => {
              try {
                await postScoreToLeaderboard();
                const scores = await fetchLeaderboard();
                setLeaderboard(scores);
              } catch (err) {
                console.error(err);
              }
            }}
          />
        </div>
      </div>
    </motion.div>
  );
});

export default Leaderboard;
