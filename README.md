# 🎲 スピーカールーレット

レトロスペクティブで使用するスピーカールーレットアプリケーション。チームメンバーの発表順をランダムに決定し、発表時間を管理するためのツールです。

## 🌟 特徴

- **メンバー管理**: チームメンバーの追加・削除
- **ランダム順番決定**: 公平なルーレット機能
- **タイマー機能**: 発表時間の管理（デフォルト3分、カスタマイズ可能）
- **データ永続化**: LocalStorageによるメンバー情報の保存
- **レスポンシブデザイン**: モバイル・デスクトップ対応

## 🚀 デモ

[GitHub Pages で試す](https://hirosh.github.io/speaker_roulette/)

## 🛠️ 技術スタック

- **フロントエンド**: React 19, TypeScript
- **スタイリング**: Tailwind CSS 4
- **ビルドツール**: Vite 6
- **テスト**: Vitest, Testing Library
- **CI/CD**: GitHub Actions

## 📦 インストール

```bash
# リポジトリをクローン
git clone https://github.com/hirosh/speaker_roulette.git
cd speaker_roulette

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## 🧪 スクリプト

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト実行
npm run test

# リント
npm run lint

# 型チェック
npm run typecheck
```

## 📱 使い方

1. **メンバー追加**: 左上のフォームからチームメンバーを追加
2. **ルーレット実行**: 「🎲 ルーレット開始」ボタンをクリック
3. **発表開始**: タイマーを開始して発表時間を管理
4. **設定調整**: 右下の設定から発表時間を変更可能

## 🏗️ プロジェクト構成

```
src/
├── components/          # Reactコンポーネント
│   ├── MemberManager/   # メンバー管理
│   ├── Roulette/        # ルーレット機能
│   ├── Timer/           # タイマー機能
│   └── Settings/        # 設定機能
├── hooks/               # カスタムフック
├── types/               # TypeScript型定義
├── utils/               # ユーティリティ関数
└── test/                # テスト設定
```

## 🧪 テスト

```bash
# 全テスト実行
npm run test

# ウォッチモードでテスト実行
npm run test -- --watch

# カバレッジ付きテスト実行
npm run test -- --coverage
```

## 🚀 デプロイ

GitHub Pagesへの自動デプロイが設定されています：

1. `main` ブランチにプッシュ
2. GitHub Actions が自動実行
3. GitHub Pages に自動デプロイ

## 📄 ライセンス

MIT License

## 🤝 コントリビューション

プルリクエストやイシューはいつでも歓迎です！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成
