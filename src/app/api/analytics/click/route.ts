import { NextRequest, NextResponse } from 'next/server'
import { recordClickEvent } from '@/lib/supabase-db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, pagePath, elementType, elementText, elementId } = body

    await recordClickEvent({
      sessionId,
      pagePath,
      elementType,
      elementText,
      elementId
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Click tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to record click event' },
      { status: 500 }
    )
  }
}