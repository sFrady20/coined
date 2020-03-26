import { useEffect, useRef, useState } from "react";

const useCountdown = (
  time: number,
  isRunning: boolean,
  onExpire: () => void
) => {
  const interval = useRef<NodeJS.Timeout>();
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    if (interval.current) clearInterval(interval.current);
    if (isRunning) {
      interval.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    }
  }, [isRunning, setTimeLeft]);

  useEffect(() => {
    if (timeLeft <= 0 && isRunning) {
      if (interval.current) clearInterval(interval.current);
      onExpire();
    }
  }, [timeLeft, onExpire, interval, isRunning]);

  return timeLeft;
};

export default useCountdown;
