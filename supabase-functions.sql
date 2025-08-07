-- 人気ページランキング取得関数
CREATE OR REPLACE FUNCTION get_top_pages()
RETURNS TABLE (
  page_path TEXT,
  views BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pv.page_path,
    COUNT(*) as views
  FROM page_views pv
  GROUP BY pv.page_path
  ORDER BY views DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- よくクリックされる要素取得関数
CREATE OR REPLACE FUNCTION get_top_clicked_elements()
RETURNS TABLE (
  element_type TEXT,
  element_text TEXT,
  clicks BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ce.element_type,
    COALESCE(ce.element_text, '') as element_text,
    COUNT(*) as clicks
  FROM click_events ce
  WHERE ce.element_text IS NOT NULL AND ce.element_text != ''
  GROUP BY ce.element_type, ce.element_text
  ORDER BY clicks DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- ページ別平均滞在時間取得関数
CREATE OR REPLACE FUNCTION get_page_durations()
RETURNS TABLE (
  page_path TEXT,
  avg_duration NUMERIC,
  avg_scroll NUMERIC,
  sessions BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ps.page_path,
    AVG(ps.duration_seconds) as avg_duration,
    AVG(ps.max_scroll_depth) as avg_scroll,
    COUNT(*) as sessions
  FROM page_sessions ps
  WHERE ps.duration_seconds IS NOT NULL
  GROUP BY ps.page_path
  ORDER BY avg_duration DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- 日別統計取得関数
CREATE OR REPLACE FUNCTION get_daily_stats()
RETURNS TABLE (
  date DATE,
  views BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    DATE(pv.timestamp) as date,
    COUNT(*) as views
  FROM page_views pv
  WHERE pv.timestamp >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY DATE(pv.timestamp)
  ORDER BY date DESC;
END;
$$ LANGUAGE plpgsql;