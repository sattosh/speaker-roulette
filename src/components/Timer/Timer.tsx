import React from 'react';
import type { TimerStatus } from '../../types';

interface TimerProps {
  timeLeft: number;
  formattedTime: string;
  progress: number;
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, formattedTime, progress, status, onStart, onPause, onReset }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return 'text-green-600';
      case 'paused':
        return 'text-yellow-600';
      case 'finished':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getProgressColor = () => {
    if (progress > 0.5) return 'text-green-500';
    if (progress > 0.25) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusText = () => {
    switch (status) {
      case 'running':
        return '実行中';
      case 'paused':
        return '一時停止';
      case 'finished':
        return '時間終了';
      default:
        return '待機中';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">発表タイマー</h2>

      {/* タイマー表示 */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          {/* 円形プログレスバー */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress)}`}
              className={`transition-all duration-1000 ${getProgressColor()}`}
              strokeLinecap="round"
            />
          </svg>

          {/* 時間表示 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getProgressColor()}`}>{formattedTime}</div>
              <div className={`text-xs ${getStatusColor()}`}>{getStatusText()}</div>
            </div>
          </div>
        </div>

        {/* 時間終了アニメーション */}
        {status === 'finished' && (
          <div className="mt-4 text-center">
            <div className="animate-bounce text-red-500 text-lg font-bold">⏰ 時間終了！</div>
          </div>
        )}
      </div>

      {/* コントロールボタン */}
      <div className="flex justify-center gap-4">
        {status === 'idle' || status === 'paused' ? (
          <button
            onClick={onStart}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors flex items-center gap-2"
          >
            <span>▶️</span>
            {status === 'paused' ? '再開' : '開始'}
          </button>
        ) : (
          <button
            onClick={onPause}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors flex items-center gap-2"
          >
            <span>⏸️</span>
            一時停止
          </button>
        )}

        <button
          onClick={onReset}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors flex items-center gap-2"
        >
          <span>🔄</span>
          リセット
        </button>
      </div>

      {/* 残り時間の詳細表示 */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>
          残り時間: {Math.floor(timeLeft / 60)}分{timeLeft % 60}秒
        </p>
      </div>
    </div>
  );
};
