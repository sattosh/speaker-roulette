# スピーカールーレット

## 概要
レトロスペクティブで使用するスピーカールーレットアプリケーション。チームメンバーの発表順をランダムに決定し、発表時間を管理するためのツールです。

## 🚀 ライブデモ
[GitHub Pages でデモを見る](https://YOUR_USERNAME.github.io/speaker_roulette/)

## ✨ 主な機能

### 1. メンバー管理
- ✅ メンバーの名前を追加・削除
- ✅ LocalStorageによる自動保存
- ✅ メンバー一覧の表示
- ✅ 重複チェック・バリデーション

### 2. ルーレット機能
- ✅ ランダムな発表順の決定
- ✅ 視覚的なルーレット演出
- ✅ 発表者ナビゲーション（前へ/次へ）
- ✅ 現在の発表者ハイライト
- ✅ 発表状況の表示（現在/完了）

### 3. タイマー機能
- ✅ カウントダウンタイマー
- ✅ 円形プログレスバー
- ✅ 開始・一時停止・リセット機能
- ✅ ブラウザ通知（時間終了時）
- ✅ 視覚的な残り時間表示

### 4. 設定機能
- ✅ 発表時間のカスタマイズ
- ✅ 設定の永続化
- ✅ デフォルト値へのリセット

## 技術仕様

### フロントエンド
- React 19.1.0
- TypeScript
- Tailwind CSS 4.1.10
- Vite

### テスト
- Vitest
- Testing Library

### デプロイ
- GitHub Pages

## 🛠️ 技術スタック

- **Frontend**: React 19.1.0 + TypeScript
- **Styling**: Tailwind CSS 4.1.10
- **Build Tool**: Vite 6.3.5
- **Testing**: Vitest + Testing Library
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages

## 📊 テストカバレッジ

- ✅ 50+ テストケース
- ✅ コンポーネントテスト
- ✅ カスタムフックテスト
- ✅ ユーティリティ関数テスト
- ✅ 型チェック

## 🏗️ プロジェクト構造

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

## 🚀 開発・デプロイ

### 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/YOUR_USERNAME/speaker_roulette.git
cd speaker_roulette

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 利用可能なスクリプト

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 型チェック
npm run typecheck

# Lintチェック
npm run lint

# テスト実行
npm run test
```

### GitHub Pages へのデプロイ

1. GitHubリポジトリの Settings → Pages に移動
2. Source を "GitHub Actions" に設定
3. `main` ブランチにプッシュすると自動デプロイ

## 📖 使い方

1. **メンバー追加**: 左上のフォームからチームメンバーの名前を登録
2. **ルーレット実行**: 「🎲 ルーレット開始」ボタンをクリック
3. **発表順確認**: シャッフル結果を確認し、「前へ/次へ」で発表者を切り替え
4. **タイマー開始**: 右上のタイマーで発表時間を管理
5. **設定調整**: 必要に応じて発表時間を変更

## 🎯 特徴

- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **データ永続化**: ブラウザを閉じても設定・メンバー情報を保持
- **アクセシビリティ**: キーボード操作・スクリーンリーダー対応
- **パフォーマンス**: 軽量・高速動作
- **型安全**: TypeScriptによる堅牢な型システム

## 🤝 コントリビュート

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 📞 サポート

何か問題や質問がありましたら、[Issues](https://github.com/YOUR_USERNAME/speaker_roulette/issues) でお知らせください。
