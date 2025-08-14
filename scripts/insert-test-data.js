const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase環境変数が設定されていません')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function insertTestData() {
  console.log('🔄 テストデータを作成中...')
  
  try {
    // ページビューのテストデータ
    const pageViews = [
      { page_path: '/', session_id: 'session1', user_agent: 'Mozilla/5.0', ip_address: '192.168.1.1' },
      { page_path: '/about', session_id: 'session1', user_agent: 'Mozilla/5.0', ip_address: '192.168.1.1' },
      { page_path: '/contact', session_id: 'session2', user_agent: 'Mozilla/5.0', ip_address: '192.168.1.2' },
      { page_path: '/', session_id: 'session3', user_agent: 'Mozilla/5.0', ip_address: '192.168.1.3' },
      { page_path: '/', session_id: 'session4', user_agent: 'Mozilla/5.0', ip_address: '192.168.1.4' }
    ]

    const { error: pvError } = await supabase
      .from('page_views')
      .insert(pageViews)

    if (pvError) throw pvError

    // セッションのテストデータ
    const sessions = [
      { session_id: 'session1', page_path: '/', duration_seconds: 45, max_scroll_depth: 80, scroll_events: 3, click_events: 2 },
      { session_id: 'session1', page_path: '/about', duration_seconds: 120, max_scroll_depth: 95, scroll_events: 5, click_events: 1 },
      { session_id: 'session2', page_path: '/contact', duration_seconds: 60, max_scroll_depth: 70, scroll_events: 2, click_events: 3 },
      { session_id: 'session3', page_path: '/', duration_seconds: 25, max_scroll_depth: 40, scroll_events: 1, click_events: 0 },
      { session_id: 'session4', page_path: '/', duration_seconds: 180, max_scroll_depth: 100, scroll_events: 8, click_events: 5 }
    ]

    const { error: sessionError } = await supabase
      .from('page_sessions')
      .insert(sessions)

    if (sessionError) throw sessionError

    // クリックイベントのテストデータ
    const clicks = [
      { session_id: 'session1', page_path: '/', element_type: 'button', element_text: 'お問い合わせ' },
      { session_id: 'session1', page_path: '/', element_type: 'link', element_text: '会社概要' },
      { session_id: 'session2', page_path: '/contact', element_type: 'button', element_text: '送信' },
      { session_id: 'session4', page_path: '/', element_type: 'button', element_text: 'サービス詳細' }
    ]

    const { error: clickError } = await supabase
      .from('click_events')
      .insert(clicks)

    if (clickError) throw clickError

    // お問い合わせのテストデータ
    const contacts = [
      { name: '田中太郎', company: '株式会社テスト', email: 'tanaka@test.com', inquiry_type: '映像制作' },
      { name: '佐藤花子', company: 'サンプル商事', email: 'sato@sample.com', inquiry_type: 'PR動画' }
    ]

    const { error: contactError } = await supabase
      .from('contact_submissions')
      .insert(contacts)

    if (contactError) throw contactError

    console.log('✅ テストデータの作成が完了しました！')
    console.log('')
    console.log('📊 作成されたデータ:')
    console.log(`- ページビュー: ${pageViews.length}件`)
    console.log(`- セッション: ${sessions.length}件`)
    console.log(`- クリック: ${clicks.length}件`)
    console.log(`- お問い合わせ: ${contacts.length}件`)
    console.log('')
    console.log('🌐 管理ダッシュボードで確認してください:')
    console.log('https://furakufine.co.jp/manage-fk-2024/dashboard')
    
  } catch (err) {
    console.error('❌ テストデータ作成エラー:', err.message)
  }
}

insertTestData()