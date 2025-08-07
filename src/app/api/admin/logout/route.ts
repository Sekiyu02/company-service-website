import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { message: 'ログアウトしました' },
    { status: 200 }
  )

  // Cookieを削除
  response.cookies.set('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0 // すぐに削除
  })

  return response
}