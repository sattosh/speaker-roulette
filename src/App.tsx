import React from 'react';
import { MemberManager } from './components/MemberManager';
import { Roulette } from './components/Roulette';
import { Timer } from './components/Timer';
import { Settings } from './components/Settings';
import { useMembers } from './hooks/useMembers';
import { useTimer } from './hooks/useTimer';
import { useSettings } from './hooks/useSettings';

function App() {
  const { members, isLoading: membersLoading, addMember, removeMember, clearAllMembers } = useMembers();
  const { settings, isLoading: settingsLoading, updateTimerDuration, resetToDefaults } = useSettings();

  const timer = useTimer({
    initialDuration: settings.timerDuration,
    onFinish: () => {
      // 時間終了時の処理（音声通知など）
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('スピーカールーレット', {
          body: '発表時間が終了しました！',
          icon: '/vite.svg',
        });
      }
    },
  });

  // 設定が変更された時にタイマーの初期時間を更新
  React.useEffect(() => {
    timer.setNewDuration(settings.timerDuration);
  }, [settings.timerDuration, timer]);

  // 通知許可を要求
  React.useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const isLoading = membersLoading || settingsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎲 スピーカールーレット</h1>
          <p className="text-gray-600">レトロスペクティブ用の発表順決定＆タイマーツール</p>
        </header>

        {/* メインコンテンツ */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* 左側：メンバー管理とルーレット */}
          <div className="space-y-6">
            <MemberManager
              members={members}
              onAddMember={addMember}
              onRemoveMember={removeMember}
              onClearAll={clearAllMembers}
              isLoading={membersLoading}
            />
            <Roulette members={members} />
          </div>

          {/* 右側：タイマーと設定 */}
          <div className="space-y-6">
            <Timer
              timeLeft={timer.timeLeft}
              formattedTime={timer.formattedTime}
              progress={timer.progress}
              status={timer.status}
              onStart={timer.start}
              onPause={timer.pause}
              onReset={timer.reset}
            />
            <Settings
              settings={settings}
              onUpdateTimerDuration={updateTimerDuration}
              onReset={resetToDefaults}
              isLoading={settingsLoading}
            />
          </div>
        </div>

        {/* フッター */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>© 2025 Speaker Roulette - レトロスペクティブをもっと楽しく</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
