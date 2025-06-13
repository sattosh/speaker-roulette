import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemberManager } from './MemberManager';
import type { Member } from '../../types';

const mockMembers: Member[] = [
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

describe('MemberManager', () => {
  const defaultProps = {
    members: [],
    onAddMember: vi.fn(),
    onRemoveMember: vi.fn(),
    onClearAll: vi.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state', () => {
    render(<MemberManager {...defaultProps} isLoading={true} />);

    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('should render empty state when no members', () => {
    render(<MemberManager {...defaultProps} />);

    expect(screen.getByText('メンバーが登録されていません')).toBeInTheDocument();
    expect(screen.getByText('上のフォームからメンバーを追加してください')).toBeInTheDocument();
  });

  it('should render member list', () => {
    render(<MemberManager {...defaultProps} members={mockMembers} />);

    expect(screen.getByText('Test User 1')).toBeInTheDocument();
    expect(screen.getByText('Test User 2')).toBeInTheDocument();
    expect(screen.getByText('メンバー管理 (2人)')).toBeInTheDocument();
  });

  it('should call onAddMember when form is submitted', async () => {
    const user = userEvent.setup();
    const onAddMember = vi.fn().mockReturnValue(null);

    render(<MemberManager {...defaultProps} onAddMember={onAddMember} />);

    const input = screen.getByPlaceholderText('メンバー名を入力');
    const addButton = screen.getByText('追加');

    await user.type(input, 'New User');
    await user.click(addButton);

    expect(onAddMember).toHaveBeenCalledWith('New User');
  });

  it('should display error message', async () => {
    const user = userEvent.setup();
    const onAddMember = vi.fn().mockReturnValue('エラーメッセージ');

    render(<MemberManager {...defaultProps} onAddMember={onAddMember} />);

    const input = screen.getByPlaceholderText('メンバー名を入力');
    const addButton = screen.getByText('追加');

    await user.type(input, 'Invalid User');
    await user.click(addButton);

    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();
  });

  it('should clear input after successful add', async () => {
    const user = userEvent.setup();
    const onAddMember = vi.fn().mockReturnValue(null);

    render(<MemberManager {...defaultProps} onAddMember={onAddMember} />);

    const input = screen.getByPlaceholderText('メンバー名を入力') as HTMLInputElement;
    const addButton = screen.getByText('追加');

    await user.type(input, 'New User');
    await user.click(addButton);

    expect(input.value).toBe('');
  });

  it('should call onRemoveMember when delete button is clicked', async () => {
    const user = userEvent.setup();
    const onRemoveMember = vi.fn();

    render(<MemberManager {...defaultProps} members={mockMembers} onRemoveMember={onRemoveMember} />);

    const deleteButtons = screen.getAllByText('削除');
    await user.click(deleteButtons[0]);

    expect(onRemoveMember).toHaveBeenCalledWith('1');
  });

  it('should call onClearAll when clear all button is clicked', async () => {
    const user = userEvent.setup();
    const onClearAll = vi.fn();

    render(<MemberManager {...defaultProps} members={mockMembers} onClearAll={onClearAll} />);

    const clearAllButton = screen.getByText('全て削除');
    await user.click(clearAllButton);

    expect(onClearAll).toHaveBeenCalled();
  });

  it('should disable add button when input is empty', () => {
    render(<MemberManager {...defaultProps} />);

    const addButton = screen.getByText('追加');
    expect(addButton).toBeDisabled();
  });

  it('should clear error when input changes', async () => {
    const user = userEvent.setup();
    const onAddMember = vi.fn().mockReturnValue('エラーメッセージ');

    render(<MemberManager {...defaultProps} onAddMember={onAddMember} />);

    const input = screen.getByPlaceholderText('メンバー名を入力');
    const addButton = screen.getByText('追加');

    // エラーを発生させる
    await user.type(input, 'Invalid User');
    await user.click(addButton);

    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();

    // 入力を変更するとエラーが消える
    await user.clear(input);
    await user.type(input, 'a');

    expect(screen.queryByText('エラーメッセージ')).not.toBeInTheDocument();
  });
});
