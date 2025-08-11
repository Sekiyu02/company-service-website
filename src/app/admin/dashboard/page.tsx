'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Analytics {
  totalPageViews: number
  uniqueVisitors: number
  topPages: Array<{ page_path: string; view_count: number }>
  recentContacts: Array<{
    name: string
    company: string
    email: string
    inquiry_type: string
    timestamp: string
  }>
  dailyStats: Array<{ date: string; page_views: number; unique_visitors: number }>
  avgSessionDuration: number
  avgScrollDepth: number
  topClickedElements: Array<{
    element_type: string
    element_text: string
    click_count: number
  }>
  pageDurations: Array<{
    page_path: string
    avg_duration: number
  }>
  bounceRate: number
}

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkAuth()
    fetchAnalytics()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/admin')
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.user_metadata?.is_admin) {
      router.push('/admin')
      return
    }

    setUserEmail(user.email || '')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics')
      
      if (!response.ok) {
        throw new Error('データの取得に失敗しました')
      }

      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      setError('アナリティクスデータの取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}秒`
    return `${Math.round(seconds / 60)}分${Math.round(seconds % 60)}秒`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            ログインページへ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">F</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">管理ダッシュボード</h1>
                <p className="text-sm text-gray-500">株式会社富楽ファイン</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">総ページビュー</p>
            <p className="text-3xl font-bold text-gray-900">
              {analytics?.totalPageViews.toLocaleString() || 0}
            </p>
            <p className="text-xs text-gray-500 mt-2">過去30日間</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">ユニークビジター</p>
            <p className="text-3xl font-bold text-gray-900">
              {analytics?.uniqueVisitors.toLocaleString() || 0}
            </p>
            <p className="text-xs text-gray-500 mt-2">過去30日間</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">平均滞在時間</p>
            <p className="text-3xl font-bold text-gray-900">
              {analytics ? formatDuration(analytics.avgSessionDuration) : '0秒'}
            </p>
            <p className="text-xs text-gray-500 mt-2">全ページ平均</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">直帰率</p>
            <p className="text-3xl font-bold text-gray-900">
              {analytics ? `${Math.round(analytics.bounceRate)}%` : '0%'}
            </p>
            <p className="text-xs text-gray-500 mt-2">過去30日間</p>
          </div>
        </div>

        {/* 日別統計グラフ */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">日別アクセス数</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analytics?.dailyStats?.map((stat, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t"
                  style={{ 
                    height: `${(stat.page_views / Math.max(...(analytics?.dailyStats.map(s => s.page_views) || [1]))) * 100}%`,
                    minHeight: '4px'
                  }}
                />
                <p className="text-xs text-gray-500 mt-2 rotate-45 origin-left">{formatDate(stat.date)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 人気ページ */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">人気ページ</h2>
            <div className="space-y-3">
              {analytics?.topPages?.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">{page.page_path}</span>
                  <span className="text-sm font-medium text-gray-900">{(page.view_count || 0).toLocaleString()}</span>
                </div>
              )) || <p className="text-sm text-gray-500">データがありません</p>}
            </div>
          </div>

          {/* ページ別滞在時間 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">ページ別パフォーマンス</h2>
            <div className="space-y-3">
              {analytics?.pageDurations.slice(0, 5).map((page, index) => (
                <div key={index} className="border-b pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">{page.page_path}</span>
                    <span className="text-sm font-medium text-gray-900">{formatDuration(page.avg_duration)}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>スクロール: {Math.round(page.avg_scroll)}%</span>
                    <span className="mx-2">•</span>
                    <span>セッション: {page.sessions}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 最近のお問い合わせ */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">最近のお問い合わせ</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">日時</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">お名前</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">会社名</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">種別</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">メール</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analytics?.recentContacts?.map((contact, index) => (
                  <tr key={index}>
                    <td className="py-3 text-sm text-gray-900">
                      {new Date(contact.timestamp).toLocaleDateString('ja-JP')}
                    </td>
                    <td className="py-3 text-sm text-gray-900">{contact.name}</td>
                    <td className="py-3 text-sm text-gray-600">{contact.company}</td>
                    <td className="py-3">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {contact.inquiry_type}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-600">{contact.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* クリック要素分析 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">よくクリックされる要素</h2>
          <div className="space-y-3">
            {analytics?.topClickedElements?.map((element, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b">
                <div>
                  <span className="text-sm font-medium text-gray-900">{element.element_text}</span>
                  <span className="text-xs text-gray-500 ml-2">({element.element_type})</span>
                </div>
                <span className="text-sm font-semibold text-primary-600">{element.click_count}クリック</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard