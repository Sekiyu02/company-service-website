-- アナリティクス用テーブルを作成

-- ページビューテーブル
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  page_path VARCHAR(500) NOT NULL,
  user_agent TEXT,
  referer VARCHAR(1000),
  ip_address INET,
  session_id VARCHAR(100),
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- セッションテーブル  
CREATE TABLE IF NOT EXISTS page_sessions (
  id BIGSERIAL PRIMARY KEY,
  session_id VARCHAR(100) NOT NULL,
  page_path VARCHAR(500) NOT NULL,
  start_time TIMESTAMPTZ DEFAULT NOW(),
  leave_time TIMESTAMPTZ,
  duration_seconds INTEGER,
  max_scroll_depth INTEGER DEFAULT 0,
  scroll_events INTEGER DEFAULT 0,
  click_events INTEGER DEFAULT 0,
  ip_address INET
);

-- クリックイベントテーブル
CREATE TABLE IF NOT EXISTS click_events (
  id BIGSERIAL PRIMARY KEY,
  session_id VARCHAR(100) NOT NULL,
  page_path VARCHAR(500) NOT NULL,
  element_type VARCHAR(100) NOT NULL,
  element_text VARCHAR(500),
  element_id VARCHAR(100),
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- スクロールイベントテーブル
CREATE TABLE IF NOT EXISTS scroll_events (
  id BIGSERIAL PRIMARY KEY,
  session_id VARCHAR(100) NOT NULL,
  page_path VARCHAR(500) NOT NULL,
  scroll_depth INTEGER NOT NULL,
  max_depth_reached INTEGER NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- お問い合わせテーブル
CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  company VARCHAR(200),
  email VARCHAR(200) NOT NULL,
  inquiry_type VARCHAR(100),
  ip_address INET,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON page_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_timestamp ON page_sessions(start_time);
CREATE INDEX IF NOT EXISTS idx_clicks_session ON click_events(session_id);
CREATE INDEX IF NOT EXISTS idx_scroll_session ON scroll_events(session_id);
CREATE INDEX IF NOT EXISTS idx_contacts_timestamp ON contact_submissions(timestamp);

-- 統計用の関数を作成

-- 人気ページランキング取得
CREATE OR REPLACE FUNCTION get_top_pages()
RETURNS TABLE(page_path VARCHAR, view_count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT pv.page_path, COUNT(*) as view_count
  FROM page_views pv
  GROUP BY pv.page_path
  ORDER BY view_count DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- 最もクリックされた要素取得
CREATE OR REPLACE FUNCTION get_top_clicked_elements()
RETURNS TABLE(element_type VARCHAR, element_text VARCHAR, click_count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT ce.element_type, ce.element_text, COUNT(*) as click_count
  FROM click_events ce
  WHERE ce.element_text IS NOT NULL
  GROUP BY ce.element_type, ce.element_text
  ORDER BY click_count DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- ページ別平均滞在時間取得
CREATE OR REPLACE FUNCTION get_page_durations()
RETURNS TABLE(page_path VARCHAR, avg_duration NUMERIC) AS $$
BEGIN
  RETURN QUERY
  SELECT ps.page_path, 
         ROUND(AVG(ps.duration_seconds)::NUMERIC, 2) as avg_duration
  FROM page_sessions ps
  WHERE ps.duration_seconds IS NOT NULL AND ps.duration_seconds > 0
  GROUP BY ps.page_path
  ORDER BY avg_duration DESC;
END;
$$ LANGUAGE plpgsql;

-- 日別統計取得
CREATE OR REPLACE FUNCTION get_daily_stats()
RETURNS TABLE(date DATE, page_views BIGINT, unique_visitors BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    DATE(pv.timestamp) as date,
    COUNT(*) as page_views,
    COUNT(DISTINCT pv.session_id) as unique_visitors
  FROM page_views pv
  WHERE pv.timestamp >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY DATE(pv.timestamp)
  ORDER BY date DESC;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) を無効化（管理画面からのみアクセスのため）
ALTER TABLE page_views DISABLE ROW LEVEL SECURITY;
ALTER TABLE page_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE click_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE scroll_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;