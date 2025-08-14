import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // 認証チェック
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 管理者権限チェック
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.user_metadata?.is_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    console.log('🔄 アナリティクスデータをリセット中...')

    // 各テーブルのデータを削除
    const tables = [
      'page_views',
      'page_sessions', 
      'click_events',
      'scroll_events',
      'contact_submissions'
    ]

    const results = []
    
    for (const table of tables) {
      try {
        const { error } = await supabase
          .from(table)
          .delete()
          .neq('id', 0) // すべてのレコードを削除

        if (error) {
          console.error(`❌ ${table}の削除でエラー:`, error)
          results.push({ table, status: 'error', error: error.message })
        } else {
          console.log(`✅ ${table}のデータを削除しました`)
          results.push({ table, status: 'success' })
        }
      } catch (err) {
        console.error(`❌ ${table}の削除で予期せぬエラー:`, err)
        results.push({ table, status: 'error', error: err.message })
      }
    }

    const successCount = results.filter(r => r.status === 'success').length
    const errorCount = results.filter(r => r.status === 'error').length

    console.log(`📊 リセット完了: 成功 ${successCount}/${tables.length}`)

    return NextResponse.json({
      message: 'データリセットが完了しました',
      results,
      summary: {
        total: tables.length,
        success: successCount,
        errors: errorCount
      }
    })

  } catch (error) {
    console.error('❌ データリセットでエラー:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message }, 
      { status: 500 }
    )
  }
}