'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center py-4 lg:py-6">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white' 
                : 'bg-white/90 text-primary-600 shadow-md'
            } group-hover:scale-105`}>
              F
            </div>
            <div className={`transition-colors duration-300 ${
              isScrolled ? 'text-secondary-800' : 'text-white drop-shadow-md'
            }`}>
              <div className="text-xl lg:text-2xl font-bold">富楽ファイン</div>
              <div className="text-xs lg:text-sm font-light tracking-wider opacity-80">FurakuFine</div>
            </div>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors duration-200 hover:text-primary-500 ${
                isScrolled ? 'text-secondary-700' : 'text-white/95 drop-shadow-sm'
              }`}
            >
              ホーム
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-colors duration-200 hover:text-primary-500 ${
                isScrolled ? 'text-secondary-700' : 'text-white/95 drop-shadow-sm'
              }`}
            >
              代表挨拶
            </Link>
            <Link
              href="/company"
              className={`font-medium transition-colors duration-200 hover:text-primary-500 ${
                isScrolled ? 'text-secondary-700' : 'text-white/95 drop-shadow-sm'
              }`}
            >
              会社概要
            </Link>
            <Link
              href="/contact"
              className="btn-primary text-base"
            >
              お問い合わせ
            </Link>
          </nav>

          {/* モバイルメニューボタン */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled 
                ? 'text-secondary-700 hover:bg-secondary-100' 
                : 'text-white/95 hover:bg-white/10 drop-shadow-sm'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
            aria-label="メニューを開く"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6">
            <div className="bg-white rounded-2xl shadow-xl border border-secondary-100 p-6 mt-2">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-secondary-700 hover:text-primary-500 transition-colors duration-200 font-medium py-2"
                >
                  ホーム
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-secondary-700 hover:text-primary-500 transition-colors duration-200 font-medium py-2"
                >
                  代表挨拶
                </Link>
                <Link
                  href="/company"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-secondary-700 hover:text-primary-500 transition-colors duration-200 font-medium py-2"
                >
                  会社概要
                </Link>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary w-full text-center"
                  >
                    お問い合わせ
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header