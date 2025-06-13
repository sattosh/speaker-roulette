import React, { useState } from 'react';
import type { Member } from '../../types';
import { shuffleArray } from '../../utils/helpers';

interface RouletteProps {
  members: Member[];
}

export const Roulette: React.FC<RouletteProps> = ({ members }) => {
  const [shuffledMembers, setShuffledMembers] = useState<Member[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);

  const handleShuffle = async () => {
    if (members.length === 0) return;

    setIsSpinning(true);

    // ルーレット演出のため少し待機
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const shuffled = shuffleArray(members);
    setShuffledMembers(shuffled);
    setCurrentSpeakerIndex(0);
    setIsSpinning(false);
  };

  const handleNext = () => {
    if (currentSpeakerIndex < shuffledMembers.length - 1) {
      setCurrentSpeakerIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSpeakerIndex > 0) {
      setCurrentSpeakerIndex((prev) => prev - 1);
    }
  };

  const currentSpeaker = shuffledMembers[currentSpeakerIndex];
  const hasResult = shuffledMembers.length > 0;

  if (members.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">スピーカールーレット</h2>
        <div className="text-center py-8 text-gray-500">
          <p>メンバーが登録されていません</p>
          <p className="text-sm">先にメンバーを追加してください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">スピーカールーレット</h2>

      {/* ルーレットボタン */}
      <div className="text-center mb-6">
        <button
          onClick={handleShuffle}
          disabled={isSpinning}
          className={`px-8 py-4 text-lg font-bold text-white rounded-lg transition-all transform ${
            isSpinning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 active:scale-95'
          }`}
        >
          {isSpinning ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              シャッフル中...
            </span>
          ) : (
            '🎲 ルーレット開始'
          )}
        </button>
      </div>

      {/* 現在の発表者 */}
      {hasResult && currentSpeaker && (
        <div className="mb-6">
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-blue-200">
            <p className="text-sm text-gray-600 mb-2">{currentSpeakerIndex + 1}番目の発表者</p>
            <h3 className="text-3xl font-bold text-blue-600 mb-4">{currentSpeaker.name}</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentSpeakerIndex === 0}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                ← 前へ
              </button>
              <button
                onClick={handleNext}
                disabled={currentSpeakerIndex === shuffledMembers.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                次へ →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 発表順一覧 */}
      {hasResult && (
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3">発表順</h4>
          <div className="grid gap-2">
            {shuffledMembers.map((member, index) => (
              <div
                key={member.id}
                className={`flex items-center justify-between p-3 rounded-md border-2 transition-all ${
                  index === currentSpeakerIndex
                    ? 'bg-blue-50 border-blue-300 shadow-md'
                    : index < currentSpeakerIndex
                    ? 'bg-gray-50 border-gray-200 opacity-60'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === currentSpeakerIndex
                        ? 'bg-blue-500 text-white'
                        : index < currentSpeakerIndex
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className={`font-medium ${index === currentSpeakerIndex ? 'text-blue-700' : 'text-gray-700'}`}>
                    {member.name}
                  </span>
                </div>
                {index === currentSpeakerIndex && <span className="text-blue-500 text-sm font-semibold">現在</span>}
                {index < currentSpeakerIndex && <span className="text-green-500 text-sm">完了</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
