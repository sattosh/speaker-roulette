import { useState, useEffect, useCallback } from 'react';
import type { AppSettings } from '../types';
import { storageUtils } from '../utils/storage';

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>({ timerDuration: 180 });
  const [isLoading, setIsLoading] = useState(true);

  // ページ読み込み時にLocalStorageからデータを復元
  useEffect(() => {
    const loadedSettings = storageUtils.loadSettings();
    setSettings(loadedSettings);
    setIsLoading(false);
  }, []);

  // 設定が変更されるたびにLocalStorageに保存
  useEffect(() => {
    if (!isLoading) {
      storageUtils.saveSettings(settings);
    }
  }, [settings, isLoading]);

  const updateTimerDuration = useCallback((duration: number): void => {
    if (duration > 0 && duration <= 3600) { // 最大1時間
      setSettings(prev => ({ ...prev, timerDuration: duration }));
    }
  }, []);

  const resetToDefaults = useCallback((): void => {
    setSettings({ timerDuration: 180 });
  }, []);

  return {
    settings,
    isLoading,
    updateTimerDuration,
    resetToDefaults,
  };
};
