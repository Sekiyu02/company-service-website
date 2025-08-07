-- ページビューテーブル
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  referer TEXT,
  ip_address TEXT,
  session_id TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- ページセッションテーブル
CREATE TABLE page_sessions (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  enter_time TIMESTAMP DEFAULT NOW(),
  leave_time TIMESTAMP,
  duration_seconds INTEGER,
  max_scroll_depth REAL DEFAULT 0,
  scroll_events INTEGER DEFAULT 0,
  click_events INTEGER DEFAULT 0,
  ip_address TEXT
);

-- クリックイベントテーブル
CREATE TABLE click_events (
  id SERIAL PRIMARY KEY,
  session_id TEXT,
  page_path TEXT,
  element_type TEXT,
  element_text TEXT,
  element_id TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- スクロールイベントテーブル
CREATE TABLE scroll_events (
  id SERIAL PRIMARY KEY,
  session_id TEXT,
  page_path TEXT,
  scroll_depth REAL,
  max_depth_reached REAL,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- お問い合わせ統計テーブル
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  inquiry_type TEXT,
  ip_address TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Row Level Security (RLS) を有効化
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE scroll_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 全ユーザーに読み書き権限を付与（開発用）
CREATE POLICY "Enable all access for page_views" ON page_views FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for page_sessions" ON page_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for click_events" ON click_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for scroll_events" ON scroll_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for contact_submissions" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);