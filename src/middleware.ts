import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname

  // 管理画面へのアクセス制御
  if (pathname.startsWith('/admin/dashboard')) {
    const supabase = createMiddlewareClient({ req, res })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    // 管理者権限の確認（ユーザーのメタデータまたはロールをチェック）
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.user_metadata?.is_admin) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
}