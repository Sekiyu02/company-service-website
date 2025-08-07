'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const Analytics = () => {
  const pathname = usePathname()
  const sessionDataRef = useRef({
    startTime: Date.now(),
    maxScrollDepth: 0,
    scrollEvents: 0,
    clickEvents: 0,
    sessionId: ''
  })

  useEffect(() => {
    // セッションIDを生成（初回訪問時のみ）
    let sessionId = localStorage.getItem('session_id')
    if (!sessionId) {
      sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('session_id', sessionId)
    }
    sessionDataRef.current.sessionId = sessionId
    sessionDataRef.current.startTime = Date.now()

    // ページビューを記録
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/pageview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pagePath: pathname,
            sessionId,
            userAgent: navigator.userAgent,
            referer: document.referrer
          }),
        })

        // セッション開始を記録
        await fetch('/api/analytics/session/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            pagePath: pathname
          }),
        })
      } catch (error) {
        console.error('Analytics tracking error:', error)
      }
    }

    // スクロール追跡
    const trackScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollDepth = Math.round((scrollTop + windowHeight) / documentHeight * 100)
      
      if (scrollDepth > sessionDataRef.current.maxScrollDepth) {
        sessionDataRef.current.maxScrollDepth = scrollDepth
      }
      sessionDataRef.current.scrollEvents++

      // スクロールイベントを送信（20%刻みで）
      if (scrollDepth % 20 === 0 && scrollDepth > 0) {
        fetch('/api/analytics/scroll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            pagePath: pathname,
            scrollDepth,
            maxDepthReached: sessionDataRef.current.maxScrollDepth
          }),
        }).catch(console.error)
      }
    }

    // クリック追跡
    const trackClick = (event: MouseEvent) => {
      const target = event.target as Element
      if (target) {
        sessionDataRef.current.clickEvents++
        
        const elementData = {
          sessionId,
          pagePath: pathname,
          elementType: target.tagName.toLowerCase(),
          elementText: target.textContent?.slice(0, 100) || '',
          elementId: target.id || target.className || ''
        }

        fetch('/api/analytics/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(elementData),
        }).catch(console.error)
      }
    }

    // セッション終了時の処理
    const endSession = () => {
      const duration = Math.round((Date.now() - sessionDataRef.current.startTime) / 1000)
      
      fetch('/api/analytics/session/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          pagePath: pathname,
          durationSeconds: duration,
          maxScrollDepth: sessionDataRef.current.maxScrollDepth,
          scrollEvents: sessionDataRef.current.scrollEvents,
          clickEvents: sessionDataRef.current.clickEvents
        }),
      }).catch(console.error)
    }

    // イベントリスナーを追加
    const throttledScroll = throttle(trackScroll, 1000) // 1秒に1回
    window.addEventListener('scroll', throttledScroll, { passive: true })
    document.addEventListener('click', trackClick, true)
    window.addEventListener('beforeunload', endSession)
    window.addEventListener('pagehide', endSession) // モバイル対応

    // 初期トラッキング
    const timer = setTimeout(trackPageView, 100)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', throttledScroll)
      document.removeEventListener('click', trackClick, true)
      window.removeEventListener('beforeunload', endSession)
      window.removeEventListener('pagehide', endSession)
      endSession() // コンポーネント終了時もセッション終了
    }
  }, [pathname])

  return null // UIは表示しない
}

// スロットリング関数
function throttle(func: Function, limit: number) {
  let inThrottle: boolean
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export default Analytics