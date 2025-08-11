const { createClient } = require('@supabase/supabase-js')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function setupAdmin() {
  console.log('管理者アカウント セットアップ')
  console.log('================================\n')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('エラー: 環境変数が設定されていません')
    console.log('NEXT_PUBLIC_SUPABASE_URLとSUPABASE_SERVICE_ROLE_KEYを.env.localに設定してください')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  rl.question('管理者メールアドレス: ', async (email) => {
    rl.question('パスワード: ', async (password) => {
      try {
        // ユーザー作成
        const { data, error } = await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            is_admin: true,
            role: 'admin'
          }
        })

        if (error) {
          console.error('エラー:', error.message)
        } else {
          console.log('\n✅ 管理者アカウントが作成されました')
          console.log('メールアドレス:', email)
          console.log('ユーザーID:', data.user.id)
        }
      } catch (error) {
        console.error('予期しないエラー:', error)
      } finally {
        rl.close()
      }
    })
  })
}

setupAdmin()