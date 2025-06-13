import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Roulette } from './Roulette';
import type { Member } from '../../types';

// shuffleArrayをモック化
vi.mock('../../utils/helpers', () => ({
  shuffleArray: vi.fn((array) => [...array].reverse()), // テスト用に逆順にする
}));

const mockMembers: Member[] = [
  { id: '1', name: 'Alice', createdAt: new Date('2024-01-01') },
  { id: '2', name: 'Bob', createdAt: new Date('2024-01-02') },
  { id: '3', name: 'Charlie', createdAt: new Date('2024-01-03') },
];

describe('Roulette', () => {
  it('should render empty state when no members', () => {
    render(<Roulette members={[]} />);

    expect(screen.getByText('スピーカールーレット')).toBeInTheDocument();
    expect(screen.getByText('メンバーが登録されていません')).toBeInTheDocument();
    expect(screen.getByText('先にメンバーを追加してください')).toBeInTheDocument();
  });

  it('should render roulette button when members exist', () => {
    render(<Roulette members={mockMembers} />);

    expect(screen.getByText('スピーカールーレット')).toBeInTheDocument();
    expect(screen.getByText('🎲 ルーレット開始')).toBeInTheDocument();
  });

  it('should show spinning state when roulette is running', async () => {
    render(<Roulette members={mockMembers} />);

    const rouletteButton = screen.getByText('🎲 ルーレット開始');
    fireEvent.click(rouletteButton);

    expect(screen.getByText('シャッフル中...')).toBeInTheDocument();
    expect(rouletteButton).toBeDisabled();
  });

  it('should show shuffled results after roulette', async () => {
    render(<Roulette members={mockMembers} />);

    const rouletteButton = screen.getByText('🎲 ルーレット開始');
    fireEvent.click(rouletteButton);

    // スピニングが終了するのを待つ
    await waitFor(
      () => {
        expect(screen.getByText('1番目の発表者')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    expect(screen.getByText('発表順')).toBeInTheDocument();
    // h3要素（現在の発表者エリア）にCharlie名前があることを確認
    expect(screen.getByRole('heading', { level: 3, name: 'Charlie' })).toBeInTheDocument();
  });

  it('should navigate between speakers', async () => {
    render(<Roulette members={mockMembers} />);

    const rouletteButton = screen.getByText('🎲 ルーレット開始');
    fireEvent.click(rouletteButton);

    // スピニングが終了するのを待つ
    await waitFor(
      () => {
        expect(screen.getByText('1番目の発表者')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // 次へボタンをクリック
    const nextButton = screen.getByText('次へ →');
    fireEvent.click(nextButton);

    expect(screen.getByText('2番目の発表者')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Bob' })).toBeInTheDocument();

    // 前へボタンをクリック
    const prevButton = screen.getByText('← 前へ');
    fireEvent.click(prevButton);

    expect(screen.getByText('1番目の発表者')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Charlie' })).toBeInTheDocument();
  });

  it('should disable navigation buttons at boundaries', async () => {
    render(<Roulette members={mockMembers} />);

    const rouletteButton = screen.getByText('🎲 ルーレット開始');
    fireEvent.click(rouletteButton);

    await waitFor(
      () => {
        expect(screen.getByText('1番目の発表者')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // 最初の位置では前へボタンが無効
    expect(screen.getByText('← 前へ')).toBeDisabled();

    // 最後の位置に移動
    const nextButton = screen.getByText('次へ →');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    // 最後の位置では次へボタンが無効
    expect(screen.getByText('次へ →')).toBeDisabled();
  });

  it('should show current speaker status correctly', async () => {
    render(<Roulette members={mockMembers} />);

    const rouletteButton = screen.getByText('🎲 ルーレット開始');
    fireEvent.click(rouletteButton);

    await waitFor(
      () => {
        expect(screen.getByText('1番目の発表者')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // 現在の発表者には「現在」ステータスが表示される
    expect(screen.getByText('現在')).toBeInTheDocument();

    // 次の発表者に移動
    const nextButton = screen.getByText('次へ →');
    fireEvent.click(nextButton);

    // 前の発表者には「完了」ステータスが表示される
    expect(screen.getByText('完了')).toBeInTheDocument();
  });
});
