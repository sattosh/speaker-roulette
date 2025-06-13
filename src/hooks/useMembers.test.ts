import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMembers } from './useMembers';

describe('useMembers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty members', () => {
    const { result } = renderHook(() => useMembers());

    expect(result.current.members).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should add a member successfully', () => {
    const { result } = renderHook(() => useMembers());

    act(() => {
      const error = result.current.addMember('Test User');
      expect(error).toBeNull();
    });

    expect(result.current.members).toHaveLength(1);
    expect(result.current.members[0].name).toBe('Test User');
  });

  it('should return error for invalid member name', () => {
    const { result } = renderHook(() => useMembers());

    act(() => {
      const error = result.current.addMember('');
      expect(error).toBe('名前を入力してください');
    });

    expect(result.current.members).toHaveLength(0);
  });

  it('should return error for duplicate member name', () => {
    const { result } = renderHook(() => useMembers());

    act(() => {
      result.current.addMember('Test User');
    });

    act(() => {
      const error = result.current.addMember('Test User');
      expect(error).toBe('この名前は既に登録されています');
    });

    expect(result.current.members).toHaveLength(1);
  });

  it('should remove a member', () => {
    const { result } = renderHook(() => useMembers());

    act(() => {
      result.current.addMember('Test User');
    });

    const memberId = result.current.members[0].id;

    act(() => {
      result.current.removeMember(memberId);
    });

    expect(result.current.members).toHaveLength(0);
  });

  it('should clear all members', () => {
    const { result } = renderHook(() => useMembers());

    act(() => {
      result.current.addMember('User 1');
      result.current.addMember('User 2');
    });

    expect(result.current.members).toHaveLength(2);

    act(() => {
      result.current.clearAllMembers();
    });

    expect(result.current.members).toHaveLength(0);
  });

  it('should trim whitespace from member names', () => {
    const { result } = renderHook(() => useMembers());

    act(() => {
      result.current.addMember('  Test User  ');
    });

    expect(result.current.members[0].name).toBe('Test User');
  });
});
