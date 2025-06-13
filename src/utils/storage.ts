import type { Member, AppSettings } from '../types';

const STORAGE_KEYS = {
  MEMBERS: 'speaker-roulette-members',
  SETTINGS: 'speaker-roulette-settings',
} as const;

export const storageUtils = {
  // メンバー関連
  saveMembers: (members: Member[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    } catch (error) {
      console.error('Failed to save members to localStorage:', error);
    }
  },

  loadMembers: (): Member[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MEMBERS);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      return parsed.map((member: { id: string; name: string; createdAt: string }) => ({
        ...member,
        createdAt: new Date(member.createdAt),
      }));
    } catch (error) {
      console.error('Failed to load members from localStorage:', error);
      return [];
    }
  },

  // 設定関連
  saveSettings: (settings: AppSettings): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings to localStorage:', error);
    }
  },

  loadSettings: (): AppSettings => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!stored) {
        return { timerDuration: 180 }; // デフォルト3分
      }

      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error);
      return { timerDuration: 180 };
    }
  },
};
