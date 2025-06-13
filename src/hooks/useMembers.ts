import { useState, useEffect, useCallback } from 'react';
import type { Member } from '../types';
import { storageUtils } from '../utils/storage';
import { createMember, validateMemberName } from '../utils/helpers';

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ページ読み込み時にLocalStorageからデータを復元
  useEffect(() => {
    const loadedMembers = storageUtils.loadMembers();
    setMembers(loadedMembers);
    setIsLoading(false);
  }, []);

  // メンバーが変更されるたびにLocalStorageに保存
  useEffect(() => {
    if (!isLoading) {
      storageUtils.saveMembers(members);
    }
  }, [members, isLoading]);

  const addMember = useCallback((name: string): string | null => {
    const error = validateMemberName(name);
    if (error) return error;

    const trimmedName = name.trim();

    // 重複チェック
    if (members.some(member => member.name === trimmedName)) {
      return 'この名前は既に登録されています';
    }

    const newMember = createMember(trimmedName);
    setMembers(prev => [...prev, newMember]);
    return null;
  }, [members]);

  const removeMember = useCallback((id: string): void => {
    setMembers(prev => prev.filter(member => member.id !== id));
  }, []);

  const clearAllMembers = useCallback((): void => {
    setMembers([]);
  }, []);

  return {
    members,
    isLoading,
    addMember,
    removeMember,
    clearAllMembers,
  };
};
