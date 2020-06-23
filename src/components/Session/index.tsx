import React, {
  createContext,
  useState,
  useMemo,
  memo,
  useEffect,
  useRef,
} from "react";
import _ from "lodash";
import { EventDispatcher } from "three";
import { Draft } from "immer";
import { useImmer } from "use-immer";
import crypto from "crypto-js";
import shortid from "shortid";
import LogRocket from "logrocket";

const LOCAL_STORAGE_KEY = "coined_data";
const ENCRYPTION_KEY = "dcub2308cybe31y0";

export type GameState = {
  clientId: string;
  password?: string;
  name: string;
  collection: string[];
};
const defaultGameState: GameState = {
  clientId: shortid(),
  name: "",
  collection: [],
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
  collection: string[];
  collect: (item: string) => void;
  itemCollected?: string;
  markCollected: () => void;
};
const defaultValue: SessionContextType = {
  gameState: defaultGameState,
  updateGameState: () => {},
  sessionState: defaultSessionState,
  updateSessionState: () => {},
  events: new EventDispatcher(),
  collection: [],
  collect: () => {},
  markCollected: () => {},
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

//set logging id
LogRocket.init("y2ubu0/coined");
LogRocket.identify(loadedGame.clientId);

const SessionContextProvider = (props: { children: React.ReactNode }) => {
  const [gameState, updateGameState] = useImmer<GameState>(loadedGame);
  const { children } = props;
  const [itemCollected, setItemCollected] = useState<string>();
  const collection = useMemo(() => gameState.collection, [gameState]);
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
        collection,
        collect: (item) => {
          setItemCollected(item);
          updateGameState((s) => {
            s.collection = _.uniq([...s.collection, item]);
          });
        },
        itemCollected,
        markCollected: () => {
          setItemCollected(undefined);
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default memo(SessionContextProvider);
