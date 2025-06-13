import React, { useState } from 'react';
import type { AppSettings } from '../../types';
import { formatTime } from '../../utils/helpers';

interface SettingsProps {
  settings: AppSettings;
  onUpdateTimerDuration: (duration: number) => void;
  onReset: () => void;
  isLoading: boolean;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onUpdateTimerDuration, onReset, isLoading }) => {
  const [tempDuration, setTempDuration] = useState(settings.timerDuration);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTimerDuration(tempDuration);
    setIsOpen(false);
  };

  const handleMinutesChange = (minutes: number) => {
    const newDuration = minutes * 60;
    setTempDuration(newDuration);
  };

  const handleSecondsChange = (seconds: number) => {
    const minutes = Math.floor(tempDuration / 60);
    const newDuration = minutes * 60 + seconds;
    setTempDuration(newDuration);
  };

  const presetDurations = [
    { label: '1分', value: 60 },
    { label: '2分', value: 120 },
    { label: '3分', value: 180 },
    { label: '5分', value: 300 },
    { label: '10分', value: 600 },
  ];

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">設定</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
        >
          {isOpen ? '▼' : '▶️'}
        </button>
      </div>

      {/* 現在の設定表示 */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">発表時間:</span>
          <span className="font-semibold text-gray-900">{formatTime(settings.timerDuration)}</span>
        </div>
      </div>

      {/* 設定パネル */}
      {isOpen && (
        <div className="space-y-6">
          {/* プリセット時間 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">プリセット時間</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {presetDurations.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setTempDuration(preset.value)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    tempDuration === preset.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* カスタム時間設定 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">カスタム時間</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="minutes" className="text-sm font-medium text-gray-600">
                    分:
                  </label>
                  <input
                    id="minutes"
                    type="number"
                    min="0"
                    max="60"
                    value={Math.floor(tempDuration / 60)}
                    onChange={(e) => handleMinutesChange(parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="seconds" className="text-sm font-medium text-gray-600">
                    秒:
                  </label>
                  <input
                    id="seconds"
                    type="number"
                    min="0"
                    max="59"
                    value={tempDuration % 60}
                    onChange={(e) => handleSecondsChange(parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">設定時間: {formatTime(tempDuration)}</p>
                <div className="flex gap-2 justify-center">
                  <button
                    type="submit"
                    disabled={tempDuration <= 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    onClick={() => setTempDuration(settings.timerDuration)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* リセットボタン */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onReset}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            >
              設定をリセット
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
