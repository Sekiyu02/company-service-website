# Supabase Auth セットアップガイド

## 1. Supabaseダッシュボードでの設定

### 管理者ユーザーの作成

1. [Supabase Dashboard](https://app.supabase.com)にログイン
2. プロジェクトを選択
3. 左サイドバーから「Authentication」→「Users」を選択
4. 「Invite user」をクリック
5. 管理者のメールアドレスを入力して招待

### ユーザーメタデータの設定

SQLエディタで以下を実行して、管理者権限を付与：

```sql
-- 管理者ユーザーのIDを確認
SELECT id, email FROM auth.users WHERE email = 'admin@example.com';

-- 管理者フラグを設定
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{is_admin}',
  'true'
)
WHERE email = 'admin@example.com';
```

## 2. 環境変数の設定

`.env.local`に以下を追加：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. 初回セットアップスクリプト

管理者ユーザーを自動作成するには、以下のスクリプトを実行：

```bash
npm run setup:admin
```

## セキュリティ注意事項

- `SUPABASE_SERVICE_ROLE_KEY`は絶対に公開しない
- 本番環境では強力なパスワードポリシーを設定
- 2要素認証（MFA）の有効化を推奨