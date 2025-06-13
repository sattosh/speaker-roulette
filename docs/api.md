# API仕様書

## データ型

### Member
```typescript
interface Member {
  id: string;
  name: string;
  createdAt: Date;
}
```

### TimerSettings
```typescript
interface TimerSettings {
  duration: number; // 秒数
}
```

### RouletteResult
```typescript
interface RouletteResult {
  members: Member[];
  timestamp: Date;
}
```

## LocalStorage仕様

### キー
- `speaker-roulette-members`: メンバー一覧
- `speaker-roulette-settings`: アプリケーション設定

### データ形式
```typescript
// speaker-roulette-members
Member[]

// speaker-roulette-settings
{
  timerDuration: number; // デフォルト: 180秒（3分）
}
```

## コンポーネント仕様

### MemberManager
- メンバーの追加・削除
- メンバー一覧表示
- LocalStorageとの同期

### Roulette
- ルーレット実行
- 結果表示
- 再シャッフル

### Timer
- カウントダウン表示
- 開始・停止・リセット
- 時間終了時の通知

### Settings
- タイマー時間設定
- 設定の保存
