import { NextRequest, NextResponse } from 'next/server'
import { startPageSession } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, pagePath } = body

    // IPアドレスを取得
    const forwarded = request.headers.get('x-forwarded-for')
    const ipAddress = forwarded ? forwarded.split(', ')[0] : request.headers.get('x-real-ip') || 'unknown'

    await startPageSession({
      sessionId,
      pagePath,
      ipAddress
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Session start tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to start session tracking' },
      { status: 500 }
    )
  }
}