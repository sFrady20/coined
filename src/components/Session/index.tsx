import React, { createContext, useState, useContext, useMemo } from "react";
import { GameContext } from "../GameContext";
import _ from "lodash";

export type SessionContextType = {
  selectedCategory?: string;
  selectCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  collection: string[];
  collect: (item: string) => void;
  itemCollected?: string;
  markCollected: () => void;
};
const defaultValue: SessionContextType = {
  selectCategory: () => {},
  score: 0,
  setScore: () => {},
  collection: [],
  collect: () => {},
  markCollected: () => {},
};
export const SessionContext = createContext(defaultValue);

const SessionContextProvider = (props: { children: React.ReactNode }) => {
  const { gameState, updateGameState } = useContext(GameContext);
  const { children } = props;
  const [selectedCategory, selectCategory] = useState<string>();
  const [score, setScore] = useState(0);
  const [itemCollected, setItemCollected] = useState<string>();
  const collection = useMemo(() => gameState.collection, [gameState]);

  return (
    <SessionContext.Provider
      value={{
        selectedCategory,
        selectCategory,
        score,
        setScore,
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

export default SessionContextProvider;
