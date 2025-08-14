import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 会社情報 */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gradient">富楽ファイン</h3>
            <p className="text-gray-300 mb-4">
              すべての人に"豊かさ"と"楽しさ"を
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>株式会社富楽ファイン（ふらくふぁいん）</p>
              <p>千葉県東金市東新宿12-5 富楽ビル301</p>
              <p>TEL: 080-6547-1033(代表)</p>
              <p>営業時間：年中無休</p>
            </div>
          </div>

          {/* ナビゲーション */}
          <div>
            <h3 className="text-lg font-semibold mb-4">サイトマップ</h3>
            <nav className="space-y-2">
              <Link
                href="/"
                className="block text-gray-300 hover:text-primary-400 transition-colors duration-200"
              >
                ホーム
              </Link>
              <Link
                href="/about"
                className="block text-gray-300 hover:text-primary-400 transition-colors duration-200"
              >
                代表挨拶
              </Link>
              <Link
                href="/company"
                className="block text-gray-300 hover:text-primary-400 transition-colors duration-200"
              >
                会社概要
              </Link>
              <Link
                href="/contact"
                className="block text-gray-300 hover:text-primary-400 transition-colors duration-200"
              >
                お問い合わせ
              </Link>
            </nav>
          </div>

          {/* サービス一覧 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">サービス</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>採用動画制作・採用ブランディング</p>
              <p>PR動画・集客動画制作</p>
              <p>イベント撮影・プロモーション動画</p>
              <p>SNS運用代行・動画コンテンツ制作</p>
              <p>映像制作・動画編集サポート</p>
            </div>
            <div className="mt-6">
              <Link
                href="/contact"
                className="btn-primary"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <p className="text-gray-400 text-sm text-center">
            © 2024 株式会社富楽ファイン. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer