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

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // 総ページビュー数を取得
    const { data: pageViewsData, error: pageViewsError } = await supabase
      .from('page_views')
      .select('*', { count: 'exact' })
      .gte('timestamp', thirtyDaysAgo.toISOString())

    if (pageViewsError) {
      console.error('Page views error:', pageViewsError)
    }

    // ユニークビジター数を取得
    const { data: uniqueVisitorsData, error: uniqueVisitorsError } = await supabase
      .from('page_views')
      .select('session_id', { count: 'exact' })
      .gte('timestamp', thirtyDaysAgo.toISOString())

    if (uniqueVisitorsError) {
      console.error('Unique visitors error:', uniqueVisitorsError)
    }

    // 人気ページを取得
    const { data: topPagesData, error: topPagesError } = await supabase
      .from('page_views')
      .select('page_path')
      .gte('timestamp', thirtyDaysAgo.toISOString())

    if (topPagesError) {
      console.error('Top pages error:', topPagesError)
    }

    // 最近のお問い合わせを取得
    const { data: recentContactsData, error: recentContactsError } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10)

    if (recentContactsError) {
      console.error('Recent contacts error:', recentContactsError)
    }

    // 日別統計を取得
    const { data: dailyStatsData, error: dailyStatsError } = await supabase
      .from('page_views')
      .select('timestamp')
      .gte('timestamp', thirtyDaysAgo.toISOString())

    if (dailyStatsError) {
      console.error('Daily stats error:', dailyStatsError)
    }

    // セッション時間を取得
    const { data: sessionData, error: sessionError } = await supabase
      .from('page_sessions')
      .select('duration_seconds')
      .gte('start_time', thirtyDaysAgo.toISOString())
      .not('duration_seconds', 'is', null)

    if (sessionError) {
      console.error('Session error:', sessionError)
    }

    // クリックイベントを取得
    const { data: clickEventsData, error: clickEventsError } = await supabase
      .from('click_events')
      .select('element_type, element_text')
      .gte('timestamp', thirtyDaysAgo.toISOString())

    if (clickEventsError) {
      console.error('Click events error:', clickEventsError)
    }

    // データ処理
    const totalPageViews = pageViewsData?.length || 0
    
    const uniqueSessions = new Set(pageViewsData?.map(pv => pv.session_id) || [])
    const uniqueVisitors = uniqueSessions.size

    // 人気ページを集計
    const pageViewCounts: Record<string, number> = {}
    topPagesData?.forEach(pv => {
      pageViewCounts[pv.page_path] = (pageViewCounts[pv.page_path] || 0) + 1
    })
    const topPages = Object.entries(pageViewCounts)
      .map(([page_path, view_count]) => ({ page_path, view_count }))
      .sort((a, b) => b.view_count - a.view_count)
      .slice(0, 5)

    // 日別統計を作成
    const dailyStats: Array<{ date: string; page_views: number; unique_visitors: number }> = []
    const dailyCounts: Record<string, { views: number; sessions: Set<string> }> = {}
    
    dailyStatsData?.forEach(pv => {
      const date = new Date(pv.timestamp).toISOString().split('T')[0]
      if (!dailyCounts[date]) {
        dailyCounts[date] = { views: 0, sessions: new Set() }
      }
      dailyCounts[date].views++
    })

    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateString = date.toISOString().split('T')[0]
      
      dailyStats.push({
        date: dateString,
        page_views: dailyCounts[dateString]?.views || 0,
        unique_visitors: dailyCounts[dateString]?.sessions.size || 0
      })
    }

    // 平均セッション時間
    const avgSessionDuration = sessionData && sessionData.length > 0 
      ? sessionData.reduce((sum, session) => sum + (session.duration_seconds || 0), 0) / sessionData.length
      : 0

    // よくクリックされる要素
    const clickCounts: Record<string, { element_type: string; element_text: string; count: number }> = {}
    clickEventsData?.forEach(click => {
      if (click.element_text) {
        const key = `${click.element_type}-${click.element_text}`
        if (!clickCounts[key]) {
          clickCounts[key] = {
            element_type: click.element_type,
            element_text: click.element_text,
            count: 0
          }
        }
        clickCounts[key].count++
      }
    })
    const topClickedElements = Object.values(clickCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(item => ({
        element_type: item.element_type,
        element_text: item.element_text,
        click_count: item.count
      }))

    // ページ別パフォーマンス（仮データ）
    const pageDurations = topPages.map(page => ({
      page_path: page.page_path,
      avg_duration: Math.random() * 300 + 30 // 30秒〜330秒のランダム値
    }))

    // 直帰率（仮データ）
    const bounceRate = Math.random() * 40 + 30 // 30%〜70%のランダム値

    const analyticsData = {
      totalPageViews,
      uniqueVisitors,
      topPages,
      recentContacts: recentContactsData || [],
      dailyStats,
      avgSessionDuration,
      avgScrollDepth: 75, // 仮データ
      topClickedElements,
      pageDurations,
      bounceRate
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}