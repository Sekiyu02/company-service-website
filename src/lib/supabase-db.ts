import { supabase } from './supabase'
import type { PageView, PageSession, ClickEvent, ScrollEvent, ContactSubmission } from './supabase'

// ページビューを記録
export const recordPageView = async (data: {
  pagePath: string
  userAgent?: string
  referer?: string
  ipAddress?: string
  sessionId?: string
}): Promise<void> => {
  try {
    const { error } = await supabase
      .from('page_views')
      .insert({
        page_path: data.pagePath,
        user_agent: data.userAgent || null,
        referer: data.referer || null,
        ip_address: data.ipAddress || null,
        session_id: data.sessionId || null
      })

    if (error) {
      console.error('Error recording page view:', error)
      throw error
    }
  } catch (error) {
    console.error('Failed to record page view:', error)
    throw error
  }
}

// お問い合わせを記録
export const recordContactSubmission = async (data: {
  name: string
  company: string
  email: string
  inquiryType?: string
  ipAddress?: string
}): Promise<void> => {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: data.name,
        company: data.company,
        email: data.email,
        inquiry_type: data.inquiryType || null,
        ip_address: data.ipAddress || null
      })

    if (error) {
      console.error('Error recording contact submission:', error)
      throw error
    }
  } catch (error) {
    console.error('Failed to record contact submission:', error)
    throw error
  }
}

// セッション開始を記録
export const startPageSession = async (data: {
  sessionId: string
  pagePath: string
  ipAddress?: string
}): Promise<number> => {
  try {
    const { data: result, error } = await supabase
      .from('page_sessions')
      .insert({
        session_id: data.sessionId,
        page_path: data.pagePath,
        ip_address: data.ipAddress || null
      })
      .select('id')
      .single()

    if (error) {
      console.error('Error starting page session:', error)
      throw error
    }

    return result?.id || 0
  } catch (error) {
    console.error('Failed to start page session:', error)
    throw error
  }
}

// セッション終了を記録
export const endPageSession = async (data: {
  sessionId: string
  pagePath: string
  durationSeconds: number
  maxScrollDepth: number
  scrollEvents: number
  clickEvents: number
}): Promise<void> => {
  try {
    const { error } = await supabase
      .from('page_sessions')
      .update({
        leave_time: new Date().toISOString(),
        duration_seconds: data.durationSeconds,
        max_scroll_depth: data.maxScrollDepth,
        scroll_events: data.scrollEvents,
        click_events: data.clickEvents
      })
      .eq('session_id', data.sessionId)
      .eq('page_path', data.pagePath)
      .is('leave_time', null)

    if (error) {
      console.error('Error ending page session:', error)
      throw error
    }
  } catch (error) {
    console.error('Failed to end page session:', error)
    throw error
  }
}

// クリックイベントを記録
export const recordClickEvent = async (data: {
  sessionId: string
  pagePath: string
  elementType: string
  elementText?: string
  elementId?: string
}): Promise<void> => {
  try {
    const { error } = await supabase
      .from('click_events')
      .insert({
        session_id: data.sessionId,
        page_path: data.pagePath,
        element_type: data.elementType,
        element_text: data.elementText || null,
        element_id: data.elementId || null
      })

    if (error) {
      console.error('Error recording click event:', error)
      throw error
    }
  } catch (error) {
    console.error('Failed to record click event:', error)
    throw error
  }
}

// スクロールイベントを記録
export const recordScrollEvent = async (data: {
  sessionId: string
  pagePath: string
  scrollDepth: number
  maxDepthReached: number
}): Promise<void> => {
  try {
    const { error } = await supabase
      .from('scroll_events')
      .insert({
        session_id: data.sessionId,
        page_path: data.pagePath,
        scroll_depth: data.scrollDepth,
        max_depth_reached: data.maxDepthReached
      })

    if (error) {
      console.error('Error recording scroll event:', error)
      throw error
    }
  } catch (error) {
    console.error('Failed to record scroll event:', error)
    throw error
  }
}

// 統計データを取得
export const getAnalytics = async () => {
  try {
    // 総ページビュー数
    const { count: totalPageViews, error: pageViewError } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })

    if (pageViewError) throw pageViewError

    // ユニーク訪問者数
    const { data: uniqueData, error: uniqueError } = await supabase
      .from('page_views')
      .select('session_id')
      .not('session_id', 'is', null)

    if (uniqueError) throw uniqueError

    const uniqueVisitors = new Set(uniqueData.map(item => item.session_id)).size

    // 人気ページランキング
    const { data: topPagesData, error: topPagesError } = await supabase
      .rpc('get_top_pages')

    const topPages = topPagesData || []

    // 最近のお問い合わせ
    const { data: recentContacts, error: contactsError } = await supabase
      .from('contact_submissions')
      .select('name, company, email, inquiry_type, timestamp')
      .order('timestamp', { ascending: false })
      .limit(10)

    if (contactsError) throw contactsError

    // 平均セッション時間
    const { data: sessionData, error: sessionError } = await supabase
      .from('page_sessions')
      .select('duration_seconds')
      .not('duration_seconds', 'is', null)

    if (sessionError) throw sessionError

    const avgSessionDuration = sessionData.length > 0
      ? Math.round(sessionData.reduce((sum, session) => sum + (session.duration_seconds || 0), 0) / sessionData.length)
      : 0

    // 平均スクロール深度
    const { data: scrollData, error: scrollError } = await supabase
      .from('page_sessions')
      .select('max_scroll_depth')
      .gt('max_scroll_depth', 0)

    if (scrollError) throw scrollError

    const avgScrollDepth = scrollData.length > 0
      ? Math.round(scrollData.reduce((sum, session) => sum + (session.max_scroll_depth || 0), 0) / scrollData.length)
      : 0

    // 最もクリックされた要素
    const { data: clickData, error: clickError } = await supabase
      .rpc('get_top_clicked_elements')

    const topClickedElements = clickData || []

    // ページ別平均滞在時間
    const { data: pageDurationData, error: pageDurationError } = await supabase
      .rpc('get_page_durations')

    const pageDurations = pageDurationData || []

    // バウンス率（滞在時間30秒未満）
    const { data: bounceData, error: bounceError } = await supabase
      .from('page_sessions')
      .select('duration_seconds')
      .not('duration_seconds', 'is', null)

    if (bounceError) throw bounceError

    const bounceRate = bounceData.length > 0
      ? Math.round((bounceData.filter(session => (session.duration_seconds || 0) < 30).length / bounceData.length) * 100)
      : 0

    // 日別統計
    const { data: dailyStats, error: dailyError } = await supabase
      .rpc('get_daily_stats')

    return {
      totalPageViews: totalPageViews || 0,
      uniqueVisitors,
      topPages,
      recentContacts,
      dailyStats: dailyStats || [],
      avgSessionDuration,
      avgScrollDepth,
      topClickedElements,
      pageDurations,
      bounceRate
    }
  } catch (error) {
    console.error('Failed to get analytics:', error)
    throw error
  }
}