import { NextRequest, NextResponse } from 'next/server'
import { endPageSession } from '@/lib/supabase-db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, pagePath, durationSeconds, maxScrollDepth, scrollEvents, clickEvents } = body

    await endPageSession({
      sessionId,
      pagePath,
      durationSeconds,
      maxScrollDepth,
      scrollEvents,
      clickEvents
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Session end tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to end session tracking' },
      { status: 500 }
    )
  }
}