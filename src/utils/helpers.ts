import type { Member } from '../types';

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const createMember = (name: string): Member => {
  return {
    id: generateId(),
    name: name.trim(),
    createdAt: new Date(),
  };
};

export const validateMemberName = (name: string): string | null => {
  const trimmed = name.trim();
  if (!trimmed) {
    return '名前を入力してください';
  }
  if (trimmed.length > 50) {
    return '名前は50文字以下にしてください';
  }
  return null;
};
