import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimer } from './useTimer';

// タイマーをモック化
vi.useFakeTimers();

describe('useTimer', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  it('should initialize with correct values', () => {
    const { result } = renderHook(() => useTimer({ initialDuration: 180 }));

    expect(result.current.timeLeft).toBe(180);
    expect(result.current.formattedTime).toBe('03:00');
    expect(result.current.progress).toBe(1);
    expect(result.current.status).toBe('idle');
  });

  it('should start the timer', () => {
    const { result } = renderHook(() => useTimer({ initialDuration: 5 }));

    act(() => {
      result.current.start();
    });

    expect(result.current.status).toBe('running');
  });

  it('should countdown correctly', () => {
    const { result } = renderHook(() => useTimer({ initialDuration: 5 }));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(4);
    expect(result.current.formattedTime).toBe('00:04');
  });

  it('should pause the timer', () => {
    const { result } = renderHook(() => useTimer({ initialDuration: 5 }));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    act(() => {
      result.current.pause();
    });

    expect(result.current.status).toBe('paused');
    expect(result.current.timeLeft).toBe(3);

    // タイマーが停止していることを確認
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(3);
  });

  it('should reset the timer', () => {
    const { result } = renderHook(() => useTimer({ initialDuration: 5 }));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.status).toBe('idle');
    expect(result.current.timeLeft).toBe(5);
    expect(result.current.progress).toBe(1);
  });

  it('should call onFinish when timer ends', () => {
    const onFinish = vi.fn();
    const { result } = renderHook(() => useTimer({
      initialDuration: 2,
      onFinish
    }));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.status).toBe('finished');
    expect(result.current.timeLeft).toBe(0);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('should not call onFinish multiple times', () => {
    const onFinish = vi.fn();
    const { result } = renderHook(() => useTimer({
      initialDuration: 2,
      onFinish
    }));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(3000); // 時間を過ぎても
    });

    expect(onFinish).toHaveBeenCalledTimes(1); // 一度だけ呼ばれる
  });

  it('should update duration when setNewDuration is called', () => {
    const { result } = renderHook(() => useTimer({ initialDuration: 5 }));

    act(() => {
      result.current.setNewDuration(10);
    });

    expect(result.current.timeLeft).toBe(10);
    expect(result.current.progress).toBe(1);
  });

  it('should not update timeLeft when timer is running and duration changes', () => {
    const { result } = renderHook(() => useTimer({ initialDuration: 5 }));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.setNewDuration(10);
    });

    // タイマーが実行中の場合、timeLeftは変更されない
    expect(result.current.timeLeft).toBe(4);
  });
});
