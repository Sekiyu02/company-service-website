import { NextRequest, NextResponse } from 'next/server'
import { recordPageView } from '@/lib/supabase-db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pagePath, sessionId, userAgent, referer } = body

    // IPアドレスを取得
    const forwarded = request.headers.get('x-forwarded-for')
    const ipAddress = forwarded ? forwarded.split(', ')[0] : request.headers.get('x-real-ip') || 'unknown'

    await recordPageView({
      pagePath,
      userAgent,
      referer,
      ipAddress,
      sessionId
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('PageView tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to record page view' },
      { status: 500 }
    )
  }
}