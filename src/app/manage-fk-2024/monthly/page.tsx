'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface MonthlyData {
  month: string
  pageViews: number
  uniqueVisitors: number
  contacts: number
  avgSessionDuration: number
  topPages: Array<{ page_path: string; view_count: number }>
  bounceRate: number
}

const MonthlyAnalytics = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkAuth()
    fetchMonthlyData()
  }, [selectedYear])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/manage-fk-2024')
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.user_metadata?.is_admin) {
      router.push('/manage-fk-2024')
      return
    }

    setUserEmail(user.email || '')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/manage-fk-2024')
  }

  const fetchMonthlyData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/analytics/monthly?year=${selectedYear}`)
      
      if (!response.ok) {
        throw new Error('データの取得に失敗しました')
      }

      const data = await response.json()
      setMonthlyData(data)
    } catch (error) {
      setError('月別データの取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}秒`
    return `${Math.round(seconds / 60)}分${Math.round(seconds % 60)}秒`
  }

  const getMonthName = (monthString: string) => {
    const month = parseInt(monthString.split('-')[1])
    return `${month}月`
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
          <Link
            href="/manage-fk-2024/dashboard"
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            ダッシュボードへ戻る
          </Link>
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
              <Link
                href="/manage-fk-2024/dashboard"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                ← ダッシュボード
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">F</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">月別分析</h1>
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
        {/* 年選択 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">分析年度</h2>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - i
                return (
                  <option key={year} value={year}>
                    {year}年
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        {/* 月別データテーブル */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">{selectedYear}年 月別実績</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    月
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ページビュー
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ユニークビジター
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    お問い合わせ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    平均滞在時間
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    直帰率
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {monthlyData.map((data, index) => (
                  <tr key={data.month} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getMonthName(data.month)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.pageViews.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.uniqueVisitors.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.contacts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDuration(data.avgSessionDuration)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Math.round(data.bounceRate)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 月別グラフ */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">月別推移グラフ</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t"
                  style={{ 
                    height: `${(data.pageViews / Math.max(...monthlyData.map(d => d.pageViews))) * 100}%`,
                    minHeight: '4px'
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">{getMonthName(data.month)}</p>
                <p className="text-xs text-gray-700 font-medium">{data.pageViews}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default MonthlyAnalytics