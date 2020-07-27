import React, { memo, useContext } from "react";
import Scan from "../Scan";
import Transitioner from "../../components/Router/Transitioner";
import Welcome from "../Welcome";
import CategorySelect from "../CategorySelect";
import Gameplay from "../Gameplay";
import Collection from "../Collection";
import { SessionContext } from "../../components/Session";
import Leaderboard from "../Leaderboard";

const MainRoute = memo(() => {
  const { sessionState } = useContext(SessionContext);
  const { phase } = sessionState;

  return (
    <Transitioner pageKey={phase}>
      {phase === "scan" ? (
        <Scan />
      ) : phase === "intro" ? (
        <Welcome />
      ) : phase === "category" ? (
        <CategorySelect />
      ) : phase === "play" ? (
        <Gameplay />
      ) : phase === "leaderboard" ? (
        <Leaderboard />
      ) : phase === "collection" ? (
        <Collection />
      ) : null}
    </Transitioner>
  );
});

export default MainRoute;
