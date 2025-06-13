import { describe, it, expect } from 'vitest';
import {
  generateId,
  shuffleArray,
  formatTime,
  createMember,
  validateMemberName,
} from './helpers';

describe('helpers', () => {
  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
    });
  });

  describe('shuffleArray', () => {
    it('should return an array with the same length', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);

      expect(shuffled).toHaveLength(original.length);
    });

    it('should contain all original elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);

      original.forEach(item => {
        expect(shuffled).toContain(item);
      });
    });

    it('should not modify the original array', () => {
      const original = [1, 2, 3, 4, 5];
      const originalCopy = [...original];
      shuffleArray(original);

      expect(original).toEqual(originalCopy);
    });

    it('should handle empty array', () => {
      const result = shuffleArray([]);
      expect(result).toEqual([]);
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(59)).toBe('00:59');
      expect(formatTime(60)).toBe('01:00');
      expect(formatTime(125)).toBe('02:05');
      expect(formatTime(3661)).toBe('61:01');
    });
  });

  describe('createMember', () => {
    it('should create a member with correct properties', () => {
      const name = 'Test User';
      const member = createMember(name);

      expect(member).toHaveProperty('id');
      expect(member).toHaveProperty('name', name);
      expect(member).toHaveProperty('createdAt');
      expect(member.createdAt).toBeInstanceOf(Date);
    });

    it('should trim whitespace from name', () => {
      const member = createMember('  Test User  ');
      expect(member.name).toBe('Test User');
    });
  });

  describe('validateMemberName', () => {
    it('should return null for valid names', () => {
      expect(validateMemberName('Test User')).toBeNull();
      expect(validateMemberName('A')).toBeNull();
    });

    it('should return error for empty names', () => {
      expect(validateMemberName('')).toBe('名前を入力してください');
      expect(validateMemberName('   ')).toBe('名前を入力してください');
    });

    it('should return error for names that are too long', () => {
      const longName = 'a'.repeat(51);
      expect(validateMemberName(longName)).toBe('名前は50文字以下にしてください');
    });
  });
});
