import React, { createContext, useState } from "react";

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
  markCollected: () => {}
};
export const SessionContext = createContext(defaultValue);

export default (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [selectedCategory, selectCategory] = useState<string>();
  const [score, setScore] = useState(0);
  const [collection, updateCollection] = useState<string[]>([]);
  const [itemCollected, setItemCollected] = useState<string>();

  return (
    <SessionContext.Provider
      value={{
        selectedCategory,
        selectCategory,
        score,
        setScore,
        collection,
        collect: item => {
          updateCollection(c => [...c, item]);
          setItemCollected(item);
        },
        itemCollected,
        markCollected: () => setItemCollected(undefined)
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
