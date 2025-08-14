'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname()
  
  // 管理ページかどうかを判定
  const isAdminPage = pathname?.startsWith('/manage-fk-2024')
  
  if (isAdminPage) {
    // 管理ページの場合：ヘッダー・フッターなしで直接children表示
    return <>{children}</>
  }
  
  // 通常ページの場合：ヘッダー・フッター付きで表示
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default ConditionalLayout