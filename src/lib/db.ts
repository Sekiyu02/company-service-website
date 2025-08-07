import sqlite3 from 'sqlite3'
import { promisify } from 'util'

const db = new sqlite3.Database('./analytics.db')

// データベースの初期化
export const initDatabase = () => {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      // ページビューテーブル
      db.run(`
        CREATE TABLE IF NOT EXISTS page_views (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          page_path TEXT NOT NULL,
          user_agent TEXT,
          referer TEXT,
          ip_address TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          session_id TEXT
        )
      `)

      // セッション詳細テーブル
      db.run(`
        CREATE TABLE IF NOT EXISTS page_sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_id TEXT NOT NULL,
          page_path TEXT NOT NULL,
          enter_time DATETIME DEFAULT CURRENT_TIMESTAMP,
          leave_time DATETIME,
          duration_seconds INTEGER,
          max_scroll_depth REAL DEFAULT 0,
          scroll_events INTEGER DEFAULT 0,
          click_events INTEGER DEFAULT 0,
          ip_address TEXT
        )
      `)

      // クリックイベントテーブル
      db.run(`
        CREATE TABLE IF NOT EXISTS click_events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_id TEXT,
          page_path TEXT,
          element_type TEXT,
          element_text TEXT,
          element_id TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // スクロールイベントテーブル
      db.run(`
        CREATE TABLE IF NOT EXISTS scroll_events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_id TEXT,
          page_path TEXT,
          scroll_depth REAL,
          max_depth_reached REAL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // お問い合わせ統計テーブル
      db.run(`
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          company TEXT,
          email TEXT,
          inquiry_type TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          ip_address TEXT
        )
      `, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  })
}

// ページビューを記録
export const recordPageView = (data: {
  pagePath: string
  userAgent?: string
  referer?: string
  ipAddress?: string
  sessionId?: string
}) => {
  return new Promise<void>((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO page_views (page_path, user_agent, referer, ip_address, session_id)
      VALUES (?, ?, ?, ?, ?)
    `)
    
    stmt.run([
      data.pagePath,
      data.userAgent || null,
      data.referer || null,
      data.ipAddress || null,
      data.sessionId || null
    ], (err) => {
      if (err) reject(err)
      else resolve()
    })
    
    stmt.finalize()
  })
}

// お問い合わせを記録
export const recordContactSubmission = (data: {
  name: string
  company: string
  email: string
  inquiryType?: string
  ipAddress?: string
}) => {
  return new Promise<void>((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO contact_submissions (name, company, email, inquiry_type, ip_address)
      VALUES (?, ?, ?, ?, ?)
    `)
    
    stmt.run([
      data.name,
      data.company,
      data.email,
      data.inquiryType || null,
      data.ipAddress || null
    ], (err) => {
      if (err) reject(err)
      else resolve()
    })
    
    stmt.finalize()
  })
}

// セッション開始を記録
export const startPageSession = (data: {
  sessionId: string
  pagePath: string
  ipAddress?: string
}) => {
  return new Promise<number>((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO page_sessions (session_id, page_path, ip_address)
      VALUES (?, ?, ?)
    `)
    
    stmt.run([data.sessionId, data.pagePath, data.ipAddress || null], function(err) {
      if (err) reject(err)
      else resolve(this.lastID)
    })
    
    stmt.finalize()
  })
}

// セッション終了を記録
export const endPageSession = (data: {
  sessionId: string
  pagePath: string
  durationSeconds: number
  maxScrollDepth: number
  scrollEvents: number
  clickEvents: number
}) => {
  return new Promise<void>((resolve, reject) => {
    const stmt = db.prepare(`
      UPDATE page_sessions 
      SET leave_time = CURRENT_TIMESTAMP,
          duration_seconds = ?,
          max_scroll_depth = ?,
          scroll_events = ?,
          click_events = ?
      WHERE session_id = ? AND page_path = ? AND leave_time IS NULL
    `)
    
    stmt.run([
      data.durationSeconds,
      data.maxScrollDepth,
      data.scrollEvents,
      data.clickEvents,
      data.sessionId,
      data.pagePath
    ], (err) => {
      if (err) reject(err)
      else resolve()
    })
    
    stmt.finalize()
  })
}

// クリックイベントを記録
export const recordClickEvent = (data: {
  sessionId: string
  pagePath: string
  elementType: string
  elementText?: string
  elementId?: string
}) => {
  return new Promise<void>((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO click_events (session_id, page_path, element_type, element_text, element_id)
      VALUES (?, ?, ?, ?, ?)
    `)
    
    stmt.run([
      data.sessionId,
      data.pagePath,
      data.elementType,
      data.elementText || null,
      data.elementId || null
    ], (err) => {
      if (err) reject(err)
      else resolve()
    })
    
    stmt.finalize()
  })
}

// スクロールイベントを記録
export const recordScrollEvent = (data: {
  sessionId: string
  pagePath: string
  scrollDepth: number
  maxDepthReached: number
}) => {
  return new Promise<void>((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO scroll_events (session_id, page_path, scroll_depth, max_depth_reached)
      VALUES (?, ?, ?, ?)
    `)
    
    stmt.run([
      data.sessionId,
      data.pagePath,
      data.scrollDepth,
      data.maxDepthReached
    ], (err) => {
      if (err) reject(err)
      else resolve()
    })
    
    stmt.finalize()
  })
}

// 統計データを取得
export const getAnalytics = () => {
  return new Promise<any>((resolve, reject) => {
    const analytics = {
      totalPageViews: 0,
      uniqueVisitors: 0,
      topPages: [],
      recentContacts: [],
      dailyStats: [],
      // 新しい詳細統計
      avgSessionDuration: 0,
      avgScrollDepth: 0,
      topClickedElements: [],
      pageDurations: [],
      bounceRate: 0
    }

    db.serialize(() => {
      // 総ページビュー数
      db.get(`SELECT COUNT(*) as count FROM page_views`, (err, row: any) => {
        if (err) {
          reject(err)
          return
        }
        analytics.totalPageViews = row.count

        // ユニーク訪問者数（セッションIDベース）
        db.get(`SELECT COUNT(DISTINCT session_id) as count FROM page_views WHERE session_id IS NOT NULL`, (err, row: any) => {
          if (err) {
            reject(err)
            return
          }
          analytics.uniqueVisitors = row.count

          // 人気ページランキング
          db.all(`
            SELECT page_path, COUNT(*) as views 
            FROM page_views 
            GROUP BY page_path 
            ORDER BY views DESC 
            LIMIT 10
          `, (err, rows: any) => {
            if (err) {
              reject(err)
              return
            }
            analytics.topPages = rows

            // 最近のお問い合わせ
            db.all(`
              SELECT name, company, email, inquiry_type, timestamp 
              FROM contact_submissions 
              ORDER BY timestamp DESC 
              LIMIT 10
            `, (err, rows: any) => {
              if (err) {
                reject(err)
                return
              }
              analytics.recentContacts = rows

              // 日別統計（過去30日）
              db.all(`
                SELECT 
                  DATE(timestamp) as date,
                  COUNT(*) as views
                FROM page_views 
                WHERE timestamp >= datetime('now', '-30 days')
                GROUP BY DATE(timestamp)
                ORDER BY date DESC
              `, (err, rows: any) => {
                if (err) {
                  reject(err)
                  return
                }
                analytics.dailyStats = rows

                // 平均セッション時間
                db.get(`
                  SELECT AVG(duration_seconds) as avg_duration 
                  FROM page_sessions 
                  WHERE duration_seconds IS NOT NULL
                `, (err, row: any) => {
                  if (err) {
                    reject(err)
                    return
                  }
                  analytics.avgSessionDuration = Math.round(row.avg_duration || 0)

                  // 平均スクロール深度
                  db.get(`
                    SELECT AVG(max_scroll_depth) as avg_scroll 
                    FROM page_sessions 
                    WHERE max_scroll_depth > 0
                  `, (err, row: any) => {
                    if (err) {
                      reject(err)
                      return
                    }
                    analytics.avgScrollDepth = Math.round(row.avg_scroll || 0)

                    // 最もクリックされた要素
                    db.all(`
                      SELECT 
                        element_type,
                        element_text,
                        COUNT(*) as clicks
                      FROM click_events 
                      WHERE element_text != ''
                      GROUP BY element_type, element_text 
                      ORDER BY clicks DESC 
                      LIMIT 10
                    `, (err, rows: any) => {
                      if (err) {
                        reject(err)
                        return
                      }
                      analytics.topClickedElements = rows

                      // ページ別平均滞在時間
                      db.all(`
                        SELECT 
                          page_path,
                          AVG(duration_seconds) as avg_duration,
                          AVG(max_scroll_depth) as avg_scroll,
                          COUNT(*) as sessions
                        FROM page_sessions 
                        WHERE duration_seconds IS NOT NULL 
                        GROUP BY page_path
                        ORDER BY avg_duration DESC
                      `, (err, rows: any) => {
                        if (err) {
                          reject(err)
                          return
                        }
                        analytics.pageDurations = rows

                        // バウンス率（滞在時間30秒未満をバウンスとする）
                        db.get(`
                          SELECT 
                            COUNT(CASE WHEN duration_seconds < 30 THEN 1 END) * 100.0 / COUNT(*) as bounce_rate
                          FROM page_sessions 
                          WHERE duration_seconds IS NOT NULL
                        `, (err, row: any) => {
                          if (err) {
                            reject(err)
                            return
                          }
                          analytics.bounceRate = Math.round(row.bounce_rate || 0)
                          resolve(analytics)
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}

// データベース初期化
initDatabase().catch(console.error)

export default db