import { useState, useEffect, useCallback } from 'react';

interface UseCountdownReturn {
  timeLeft: number;
  isRunning: boolean;
  isFinished: boolean;
  start: (seconds: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  formatTime: (seconds: number) => string;
}

export const useCountdown = (): UseCountdownReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft]);

  const start = useCallback((seconds: number): void => {
    setTimeLeft(seconds);
    setIsRunning(true);
    setIsFinished(false);
  }, []);

  const pause = useCallback((): void => {
    setIsRunning(false);
  }, []);

  const resume = useCallback((): void => {
    if (timeLeft > 0 && !isFinished) {
      setIsRunning(true);
    }
  }, [timeLeft, isFinished]);

  const reset = useCallback((): void => {
    setTimeLeft(0);
    setIsRunning(false);
    setIsFinished(false);
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }, []);

  return {
    timeLeft,
    isRunning,
    isFinished,
    start,
    pause,
    resume,
    reset,
    formatTime
  };
};
