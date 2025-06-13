export interface Member {
  id: string;
  name: string;
  createdAt: Date;
}

export interface TimerSettings {
  duration: number; // 秒数
}

export interface AppSettings {
  timerDuration: number; // デフォルト: 180秒（3分）
}

export interface RouletteResult {
  members: Member[];
  timestamp: Date;
}

export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';
