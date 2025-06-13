import { useState, useEffect, useCallback, useRef } from 'react';
import type { TimerStatus } from '../types';
import { formatTime } from '../utils/helpers';

interface UseTimerProps {
  initialDuration: number; // 秒数
  onFinish?: () => void;
}

export const useTimer = ({ initialDuration, onFinish }: UseTimerProps) => {
  const [duration, setDuration] = useState(initialDuration);
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [status, setStatus] = useState<TimerStatus>('idle');
  const intervalRef = useRef<number | null>(null);
  const hasFinishedRef = useRef<boolean>(false);

  // 初期時間が変更された時にリセット
  useEffect(() => {
    if (status === 'idle') {
      setDuration(initialDuration);
      setTimeLeft(initialDuration);
      hasFinishedRef.current = false; // リセット
    }
  }, [initialDuration, status]);

  const start = useCallback(() => {
    if (status === 'running') return;

    setStatus('running');
    hasFinishedRef.current = false; // リセット
    intervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // タイマー終了時にインターバルをクリア
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setStatus('finished');
          // 一度だけonFinishを呼ぶ
          if (!hasFinishedRef.current) {
            hasFinishedRef.current = true;
            onFinish?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [status, onFinish]);

  const pause = useCallback(() => {
    if (status !== 'running') return;

    setStatus('paused');
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [status]);

  const reset = useCallback(() => {
    setStatus('idle');
    setTimeLeft(duration);
    hasFinishedRef.current = false; // リセット
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [duration]);

  const setNewDuration = useCallback((newDuration: number) => {
    setDuration(newDuration);
    if (status === 'idle') {
      setTimeLeft(newDuration);
    }
  }, [status]);

  // コンポーネントがアンマウントされた時にタイマーをクリア
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formattedTime = formatTime(timeLeft);
  const progress = timeLeft / duration;

  return {
    timeLeft,
    formattedTime,
    progress,
    status,
    start,
    pause,
    reset,
    setNewDuration,
  };
};
