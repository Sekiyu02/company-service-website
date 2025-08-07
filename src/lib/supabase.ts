import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// デバッグ用ログ（本番環境でも確認）
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', !!supabaseKey)
console.log('Supabase Key length:', supabaseKey?.length)

export const supabase = createClient(supabaseUrl, supabaseKey)

// データベーステーブルの型定義
export interface PageView {
  id?: number
  page_path: string
  user_agent?: string
  referer?: string
  ip_address?: string
  session_id?: string
  timestamp?: string
}

export interface PageSession {
  id?: number
  session_id: string
  page_path: string
  enter_time?: string
  leave_time?: string
  duration_seconds?: number
  max_scroll_depth?: number
  scroll_events?: number
  click_events?: number
  ip_address?: string
}

export interface ClickEvent {
  id?: number
  session_id?: string
  page_path?: string
  element_type?: string
  element_text?: string
  element_id?: string
  timestamp?: string
}

export interface ScrollEvent {
  id?: number
  session_id?: string
  page_path?: string
  scroll_depth?: number
  max_depth_reached?: number
  timestamp?: string
}

export interface ContactSubmission {
  id?: number
  name: string
  company: string
  email: string
  inquiry_type?: string
  ip_address?: string
  timestamp?: string
}