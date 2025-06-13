import React, { useState } from 'react';
import type { Member } from '../../types';

interface MemberManagerProps {
  members: Member[];
  onAddMember: (name: string) => string | null;
  onRemoveMember: (id: string) => void;
  onClearAll: () => void;
  isLoading: boolean;
}

export const MemberManager: React.FC<MemberManagerProps> = ({ members, onAddMember, onRemoveMember, onClearAll, isLoading }) => {
  const [newMemberName, setNewMemberName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errorMessage = onAddMember(newMemberName);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setNewMemberName('');
      setError(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMemberName(e.target.value);
    if (error) setError(null);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <p className="text-center text-gray-500 mt-4">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">メンバー管理 ({members.length}人)</h2>

      {/* メンバー追加フォーム */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMemberName}
            onChange={handleInputChange}
            placeholder="メンバー名を入力"
            className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            maxLength={50}
          />
          <button
            type="submit"
            disabled={!newMemberName.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            追加
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      {/* メンバー一覧 */}
      {members.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>メンバーが登録されていません</p>
          <p className="text-sm">上のフォームからメンバーを追加してください</p>
        </div>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {members.map((member) => (
              <li key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium text-gray-700">{member.name}</span>
                <button
                  onClick={() => onRemoveMember(member.id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1 transition-colors"
                  aria-label={`${member.name}を削除`}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={onClearAll}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          >
            全て削除
          </button>
        </>
      )}
    </div>
  );
};
