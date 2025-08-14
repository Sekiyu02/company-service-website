import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
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

    // URLパラメータから年を取得
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year') || new Date().getFullYear().toString()

    const monthlyData = []

    // 指定年の12ヶ月分のデータを取得
    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(parseInt(year), month - 1, 1)
      const endDate = new Date(parseInt(year), month, 0, 23, 59, 59, 999)

      // ページビュー数を取得
      const { data: pageViewsData } = await supabase
        .from('page_views')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())

      // ユニークビジター数を算出
      const uniqueSessions = new Set(pageViewsData?.map(pv => pv.session_id) || [])
      const uniqueVisitors = uniqueSessions.size

      // お問い合わせ数を取得
      const { data: contactsData } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact' })
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())

      // セッション時間を取得
      const { data: sessionData } = await supabase
        .from('page_sessions')
        .select('duration_seconds')
        .gte('start_time', startDate.toISOString())
        .lte('start_time', endDate.toISOString())
        .not('duration_seconds', 'is', null)

      // 人気ページを取得
      const pageViewCounts: Record<string, number> = {}
      pageViewsData?.forEach(pv => {
        pageViewCounts[pv.page_path] = (pageViewCounts[pv.page_path] || 0) + 1
      })
      const topPages = Object.entries(pageViewCounts)
        .map(([page_path, view_count]) => ({ page_path, view_count }))
        .sort((a, b) => b.view_count - a.view_count)
        .slice(0, 5)

      // 平均セッション時間を算出
      const avgSessionDuration = sessionData && sessionData.length > 0 
        ? sessionData.reduce((sum, session) => sum + (session.duration_seconds || 0), 0) / sessionData.length
        : 0

      // 直帰率（仮データ）
      const bounceRate = Math.random() * 40 + 30 // 30%〜70%のランダム値

      monthlyData.push({
        month: `${year}-${month.toString().padStart(2, '0')}`,
        pageViews: pageViewsData?.length || 0,
        uniqueVisitors,
        contacts: contactsData?.length || 0,
        avgSessionDuration,
        topPages,
        bounceRate
      })
    }

    return NextResponse.json(monthlyData)
  } catch (error) {
    console.error('Monthly API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}