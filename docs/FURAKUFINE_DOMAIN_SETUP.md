# furakufine.co.jp ドメイン設定手順

## ✅ 完了: ドメイン取得
- ドメイン: `furakufine.co.jp`
- 取得元: お名前.com

## 📝 次のステップ

### 1. Vercelでドメイン追加

1. [Vercel Dashboard](https://vercel.com/yuna-sekiguchis-projects/company-service-website)にアクセス
2. **Settings** → **Domains** をクリック
3. **Add** ボタンをクリック
4. `furakufine.co.jp` を入力して **Add** をクリック
5. `www.furakufine.co.jp` も追加（オプション）

### 2. Vercel側で表示される設定値

以下のいずれかが表示されます：

#### Option A: Aレコード（推奨）
```
Type: A
Name: @
Value: 76.76.21.21
```

#### Option B: CNAMEレコード
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. お名前.comでDNS設定

1. [お名前.com](https://www.onamae.com/) にログイン
2. **ドメイン設定** → **DNS関連機能の設定** をクリック
3. `furakufine.co.jp` を選択
4. **DNSレコード設定を利用する** → **設定する** をクリック

#### DNSレコード追加

**Aレコード設定（推奨）**
```
ホスト名: （空欄）
TYPE: A
TTL: 3600
VALUE: 76.76.21.21
```

**www付きも対応する場合**
```
ホスト名: www
TYPE: CNAME
TTL: 3600
VALUE: cname.vercel-dns.com
```

5. **確認画面へ進む** → **設定する** をクリック

### 4. 設定確認

#### Vercel側で確認（即時～10分）
- Domainsページで `✓ Valid Configuration` が表示されればOK

#### DNS反映確認（最大48時間）
```bash
# Windowsの場合
nslookup furakufine.co.jp

# 期待される結果
Server: xxx.xxx.xxx.xxx
Address: xxx.xxx.xxx.xxx

Non-authoritative answer:
Name: furakufine.co.jp
Address: 76.76.21.21
```

### 5. SSL証明書

- Vercelが自動的にLet's Encrypt証明書を発行
- 通常10分以内に有効化
- https://furakufine.co.jp でアクセス可能になる

## 🎯 重要な設定

### リダイレクト設定

`vercel.json` を作成（プロジェクトルート）：

```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "www.furakufine.co.jp"
        }
      ],
      "destination": "https://furakufine.co.jp/$1",
      "permanent": true
    }
  ]
}
```

### メール設定（オプション）

お名前.comでメールアドレスも設定可能：
- info@furakufine.co.jp
- contact@furakufine.co.jp

## ⚠️ トラブルシューティング

### DNS反映が遅い場合
- 最大48時間待つ
- ブラウザのキャッシュをクリア
- `Ctrl + F5` で強制リロード

### SSL証明書エラー
- Vercel Dashboardで証明書の状態確認
- 「Renew Certificate」をクリック

### アクセスできない場合
1. DNS設定を再確認
2. Vercelのドメイン設定を確認
3. お名前.comのDNS反映状況を確認

## ✅ 完了後の確認事項

- [ ] https://furakufine.co.jp でアクセス可能
- [ ] SSL証明書が有効（緑の鍵マーク）
- [ ] www付きからリダイレクトされる
- [ ] Google Search Consoleに新ドメインを登録
- [ ] 名刺・パンフレットのURL更新

## 📊 SEO効果

独自ドメイン使用により：
- 検索順位向上（3-6ヶ月で効果）
- 企業の信頼性向上
- 「富楽ファイン」検索で上位表示
- 地域検索「千葉 映像制作」で有利