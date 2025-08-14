const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase環境変数が設定されていません')
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl)
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '設定済み' : '未設定')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createAdminUser() {
  const adminEmail = 'admin@furakufine.co.jp'
  const adminPassword = 'FurakuFine2024!'
  
  console.log('🔄 管理者アカウントを作成中...')
  
  try {
    // ユーザー作成
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      user_metadata: {
        is_admin: true,
        name: '管理者',
        role: 'admin'
      },
      email_confirm: true // メール確認をスキップ
    })

    if (error) {
      console.error('❌ エラーが発生しました:', error.message)
      return
    }

    console.log('✅ 管理者アカウントが作成されました！')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 メールアドレス:', adminEmail)
    console.log('🔐 パスワード    :', adminPassword)
    console.log('🌐 ログインURL   : https://furakufine.co.jp/manage-fk-2024')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('')
    console.log('⚠️  重要:')
    console.log('1. このパスワードを安全な場所に保存してください')
    console.log('2. 本番環境では必ずパスワードを変更してください')
    console.log('3. 管理者権限が正常に設定されています')
    
  } catch (err) {
    console.error('❌ 予期せぬエラー:', err.message)
  }
}

createAdminUser()