import { NextRequest, NextResponse } from 'next/server'
import { recordScrollEvent } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, pagePath, scrollDepth, maxDepthReached } = body

    await recordScrollEvent({
      sessionId,
      pagePath,
      scrollDepth,
      maxDepthReached
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Scroll tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to record scroll event' },
      { status: 500 }
    )
  }
}