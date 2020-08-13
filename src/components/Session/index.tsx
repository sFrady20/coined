import React, { createContext, memo, useEffect, useRef } from "react";
import _ from "lodash";
import { EventDispatcher } from "three";
import { Draft } from "immer";
import { useImmer } from "use-immer";
import crypto from "crypto-js";
import shortid from "shortid";
import Quarters from "../../routes/Collection/Quarters";
import { QuestionDefinition } from "../../routes/Gameplay";

const LOCAL_STORAGE_KEY = "coined_data_2";
const ENCRYPTION_KEY = "dcub2308cybe31y0";

export type GameState = {
  clientId: string;
  password?: string;
  name: string;
  answeredQuestions: {
    [s: string]: QuestionDefinition[];
  };
  collection: (keyof typeof Quarters)[];
  visited: string[];
};
const defaultGameState: GameState = {
  clientId: shortid(),
  name: "",
  answeredQuestions: {},
  collection: [],
  visited: [],
};

export type SessionState = {
  phase: "scan" | "intro" | "home" | "play" | "reward";
  selectedCategory?: keyof typeof Quarters;
  isCollectionCollapsed: boolean;
};
const defaultSessionState: SessionState = {
  phase: "scan",
  selectedCategory: undefined,
  isCollectionCollapsed: true,
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
