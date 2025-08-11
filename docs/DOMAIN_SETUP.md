# 独自ドメイン設定ガイド

## 1. ドメイン取得

### お名前.comでの取得手順
1. https://www.onamae.com/ にアクセス
2. 希望ドメインを検索（例：furakufine.com）
3. カートに追加して購入
4. Whois情報公開代行を有効化（プライバシー保護）

### 推奨ドメイン
- `furakufine.com` - グローバル向け
- `furakufine.co.jp` - 日本法人向け（信頼性高）
- `furaku-fine.com` - ハイフン付き

## 2. Vercel設定

### ダッシュボードでの設定
1. https://vercel.com/dashboard にログイン
2. プロジェクト選択 → Settings → Domains
3. 「Add」をクリック
4. 取得したドメインを入力（例：furakufine.com）
5. 「Add」をクリック

### 表示される設定値をメモ
- Aレコード: 76.76.21.21
- CNAMEレコード: cname.vercel-dns.com

## 3. DNS設定（お名前.com）

### DNSレコード設定
1. お名前.comにログイン
2. 「ドメイン設定」→「DNS設定」
3. 以下を設定：

#### Aレコード（推奨）
```
ホスト名: （空欄）
TYPE: A
VALUE: 76.76.21.21
```

#### またはCNAMEレコード
```
ホスト名: www
TYPE: CNAME
VALUE: cname.vercel-dns.com
```

## 4. SSL証明書

VercelがLet's Encryptを使用して自動的に設定されます。

## 5. 設定反映確認

### DNS反映確認（最大48時間）
```bash
nslookup furakufine.com
```

### Vercelダッシュボードで確認
- Domains設定画面で「Valid Configuration ✓」表示

## 6. コード内のURL更新

以下のファイルのURLを更新：

### src/app/layout.tsx
```typescript
openGraph: {
  url: 'https://furakufine.com',
  // ...
}
```

### src/app/sitemap.ts
```typescript
const baseUrl = 'https://furakufine.com'
```

### src/app/robots.ts
```typescript
sitemap: 'https://furakufine.com/sitemap.xml'
```

### src/components/StructuredData.tsx
```typescript
"url": "https://furakufine.com"
```

## トラブルシューティング

### DNS反映が遅い場合
- 最大48時間かかる場合があります
- Google DNS (8.8.8.8)で確認

### SSL証明書エラー
- Vercelで自動更新されるまで待つ（通常10分程度）

### wwwありなし両方対応
- Vercelで両方のドメインを追加
- リダイレクト設定で統一

## メリット

1. **SEO効果**: 独自ドメインは検索順位向上
2. **信頼性**: 企業サイトとして認識される
3. **ブランディング**: 覚えやすく、プロフェッショナル
4. **メール**: info@furakufine.com などのメールアドレス使用可能