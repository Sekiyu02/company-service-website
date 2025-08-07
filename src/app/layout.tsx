import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'

export const metadata: Metadata = {
  title: '株式会社富楽ファイン｜映像制作・広報支援',
  description: '企業の想いを映像で届ける。採用ブランディング映像、PR映像、イベント動画、SNS運用代行まで。千葉・東京を中心に中小企業の映像制作をサポートします。',
  keywords: '映像制作,採用動画,PR動画,千葉,東京,中小企業,広報支援',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-white text-gray-900">
        <Analytics />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}