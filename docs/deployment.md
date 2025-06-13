# デプロイメントガイド

## GitHub Pages への自動デプロイ

このプロジェクトは GitHub Actions を使用して GitHub Pages に自動デプロイされます。

### 設定手順

1. **GitHub リポジトリの設定**
   - リポジトリの Settings → Pages に移動
   - Source を "GitHub Actions" に設定

2. **自動デプロイ**
   - `main` ブランチにプッシュすると自動的にビルド・デプロイが実行されます
   - `.github/workflows/deploy.yml` でワークフローが定義されています

### 手動ビルド

```bash
# 依存関係のインストール
npm install

# 本番用ビルド
npm run build

# ビルド成果物は dist/ ディレクトリに生成されます
```

### 開発サーバーの起動

```bash
# 開発サーバーの起動
npm run dev

# ブラウザで http://localhost:5173 にアクセス
```

## 環境要件

- Node.js 18.x 以上
- npm 8.x 以上

## ブラウザサポート

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 機能

- レスポンシブデザイン（モバイル対応）
- LocalStorage による永続化
- ブラウザ通知（タイマー終了時）
- PWA 対応（オフライン利用可能）
