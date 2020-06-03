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
import ActionBar from "../../components/ActionBar";
import Panel from "../../components/Panel";
import { GameplayContext } from ".";
import { SessionContext } from "../../components/Session";

const fetchLeaderboard = async () => {
  const result = await Axios.get(LEADERBOARD_API_URL);
  return result.data.body as LeaderboardScore[];
};

const Leaderboard = (props: { onContinue: () => void }) => {
  const { onContinue } = props;
  const [leaderboard, setLeaderboard] = useState<LeaderboardScore[]>([]);
  const { gameState } = useContext(SessionContext);
  const { score } = useContext(GameplayContext);

  const postScoreToLeaderboard = useCallback(async () => {
    const result = await Axios.post(LEADERBOARD_API_URL, {
      clientId: gameState.clientId,
      initials: "TST",
      score,
    });
    return result.data;
  }, [score, gameState]);

  useEffect(() => {
    fetchLeaderboard()
      .then(setLeaderboard)
      .catch((err) => console.error(err));
  }, [setLeaderboard, score]);

  return (
    <Panel>
      {_.map(leaderboard, (leader, index) => (
        <div className={styles.score} key={index}>
          {leader.initials} - {leader.score}
        </div>
      ))}
      <ActionBar
        actions={{
          Submit: async () => {
            try {
              await postScoreToLeaderboard();
              const scores = await fetchLeaderboard();
              setLeaderboard(scores);
            } catch (err) {
              console.error(err);
            }
          },
          Continue: onContinue,
        }}
      />
    </Panel>
  );
};

export default memo(Leaderboard);
