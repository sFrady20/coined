import React, { createContext, useRef, useEffect, useMemo } from "react";
import { EventDispatcher } from "three";
import _ from "lodash";
import { useImmer } from "use-immer";
import { Draft } from "immer";
import crypto from "crypto-js";

const LOCAL_STORAGE_KEY = "coined_data";
const ENCRYPTION_KEY = "dcub2308cybe31y0";

export type GameContextType = {
  events: EventDispatcher;
  gameState: GameState;
  updateGameState: (
    updater: (gameState: Draft<GameState>) => void | GameState
  ) => void;
};
export type GameState = {
  name: string;
  collection: string[];
};

const defaultGameState: GameState = {
  name: "",
  collection: [],
};
const defaultValue: GameContextType = {
  events: new EventDispatcher(),
  gameState: defaultGameState,
  updateGameState: () => {},
};

export const GameContext = createContext(defaultValue);

const loadedGameStr = localStorage.getItem(LOCAL_STORAGE_KEY);
const loadedGame = loadedGameStr
  ? _.defaults(
      JSON.parse(
        crypto.AES.decrypt(loadedGameStr, ENCRYPTION_KEY).toString(
          crypto.enc.Utf8
        )
      ) as GameState,
      defaultGameState
    )
  : defaultGameState;

const GameContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const [gameState, updateGameState] = useImmer<GameState>(loadedGame);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      crypto.AES.encrypt(JSON.stringify(gameState), ENCRYPTION_KEY).toString()
    );
  }, [gameState]);

  const events = useRef(new EventDispatcher()).current;

  const valMemo = useMemo(() => ({ events, gameState, updateGameState }), [
    events,
    gameState,
    updateGameState,
  ]);

  return (
    <GameContext.Provider value={valMemo}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
