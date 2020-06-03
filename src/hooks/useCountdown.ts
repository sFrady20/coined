import { useEffect, useRef, useState } from "react";

const useCountdown = (
  time: number,
  isRunning: boolean,
  onExpire: () => void,
  intervalSpacing: number = 1000
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
        setTimeLeft((t) => t - intervalSpacing / 1000);
      }, intervalSpacing);
    }
  }, [isRunning, setTimeLeft, intervalSpacing]);

  useEffect(() => {
    if (timeLeft <= 0 && isRunning) {
      if (interval.current) clearInterval(interval.current);
      onExpire();
    }
  }, [timeLeft, onExpire, interval, isRunning]);

  return timeLeft;
};

export default useCountdown;
