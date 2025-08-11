import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'

export const metadata: Metadata = {
  title: '株式会社富楽ファイン（フラクファイン）｜千葉の映像制作会社・動画制作・PR支援',
  description: '千葉県を拠点に映像制作・動画制作を行う株式会社富楽ファイン（ふらくふぁいん）。採用動画、PR動画、集客動画、イベント撮影など企業の想いを映像で届けます。中小企業の広報・採用・集客を映像でサポート。',
  keywords: '富楽ファイン,ふらくふぁいん,フラクファイン,映像制作会社 千葉,千葉 映像制作,動画制作 千葉,採用動画,PR動画,集客動画,動画 委託,採用動画制作,PR 集客,映像制作,広報支援,中小企業 映像,イベント撮影',
  authors: [{ name: '株式会社富楽ファイン' }],
  openGraph: {
    title: '株式会社富楽ファイン｜千葉の映像制作会社',
    description: '千葉県を拠点に映像制作・動画制作を行う株式会社富楽ファイン。採用動画、PR動画、集客動画など企業の想いを映像で届けます。',
    url: 'https://furakufine.co.jp',
    siteName: '株式会社富楽ファイン',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '株式会社富楽ファイン - 千葉の映像制作会社',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '株式会社富楽ファイン｜千葉の映像制作会社',
    description: '千葉県を拠点に映像制作・動画制作。採用動画、PR動画、集客動画で企業の想いを届けます。',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://furakufine.co.jp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
      </head>
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