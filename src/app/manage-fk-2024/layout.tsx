import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '管理画面 - 株式会社富楽ファイン',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}