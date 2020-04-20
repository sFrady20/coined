import { useEffect, useCallback } from "react";

const useKeyPress = (
  targetKey: string,
  listener: (e: KeyboardEvent) => void
) => {
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === targetKey.toLowerCase()) listener(e);
    },
    [targetKey, listener]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  return null;
};

export default useKeyPress;
