import { describe, it, expect, beforeEach } from 'vitest';
import { storageUtils } from './storage';
import type { Member, AppSettings } from '../types';

describe('storageUtils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('saveMembers and loadMembers', () => {
    it('should save and load members correctly', () => {
      const members: Member[] = [
        {
          id: '1',
          name: 'Test User 1',
          createdAt: new Date('2023-01-01'),
        },
        {
          id: '2',
          name: 'Test User 2',
          createdAt: new Date('2023-01-02'),
        },
      ];

      storageUtils.saveMembers(members);
      const loaded = storageUtils.loadMembers();

      expect(loaded).toHaveLength(2);
      expect(loaded[0].id).toBe('1');
      expect(loaded[0].name).toBe('Test User 1');
      expect(loaded[0].createdAt).toEqual(new Date('2023-01-01'));
    });

    it('should return empty array when no data exists', () => {
      const loaded = storageUtils.loadMembers();
      expect(loaded).toEqual([]);
    });

    it('should handle corrupted data gracefully', () => {
      localStorage.setItem('speaker-roulette-members', 'invalid json');
      const loaded = storageUtils.loadMembers();
      expect(loaded).toEqual([]);
    });
  });

  describe('saveSettings and loadSettings', () => {
    it('should save and load settings correctly', () => {
      const settings: AppSettings = {
        timerDuration: 300,
      };

      storageUtils.saveSettings(settings);
      const loaded = storageUtils.loadSettings();

      expect(loaded.timerDuration).toBe(300);
    });

    it('should return default settings when no data exists', () => {
      const loaded = storageUtils.loadSettings();
      expect(loaded.timerDuration).toBe(180);
    });

    it('should handle corrupted settings data gracefully', () => {
      localStorage.setItem('speaker-roulette-settings', 'invalid json');
      const loaded = storageUtils.loadSettings();
      expect(loaded.timerDuration).toBe(180);
    });
  });
});
