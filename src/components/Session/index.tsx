import React, { createContext, memo, useEffect, useRef } from "react";
import _ from "lodash";
import { EventDispatcher } from "three";
import { Draft } from "immer";
import { useImmer } from "use-immer";
import crypto from "crypto-js";
import shortid from "shortid";

const LOCAL_STORAGE_KEY = "coined_data";
const ENCRYPTION_KEY = "dcub2308cybe31y0";

export type GameState = {
  clientId: string;
  password?: string;
  name: string;
  collection: string[];
  visited: string[];
};
const defaultGameState: GameState = {
  clientId: shortid(),
  name: "",
  collection: [],
  visited: [],
};

export type SessionState = {
  phase: "scan" | "intro" | "category" | "play" | "leaderboard" | "collection";
  selectedCategory?: string;
  finalScore: number;
};
const defaultSessionState: SessionState = {
  phase: "scan",
  selectedCategory: undefined,
  finalScore: 0,
};

export type SessionContextType = {
  gameState: GameState;
  updateGameState: (
    updater: (gameState: Draft<GameState>) => void | GameState
  ) => void;
  sessionState: SessionState;
  updateSessionState: (
    updater: (sessionState: Draft<SessionState>) => void | SessionState
  ) => void;
  events: EventDispatcher;
};
const defaultValue: SessionContextType = {
  gameState: defaultGameState,
  updateGameState: () => {},
  sessionState: defaultSessionState,
  updateSessionState: () => {},
  events: new EventDispatcher(),
};
export const SessionContext = createContext(defaultValue);

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

const SessionContextProvider = (props: { children: React.ReactNode }) => {
  const [gameState, updateGameState] = useImmer<GameState>(loadedGame);
  const { children } = props;
  const [sessionState, updateSessionState] = useImmer<SessionState>(
    defaultSessionState
  );

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      crypto.AES.encrypt(JSON.stringify(gameState), ENCRYPTION_KEY).toString()
    );
  }, [gameState]);

  const events = useRef(new EventDispatcher()).current;

  return (
    <SessionContext.Provider
      value={{
        gameState,
        updateGameState,
        sessionState,
        updateSessionState,
        events,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default memo(SessionContextProvider);
