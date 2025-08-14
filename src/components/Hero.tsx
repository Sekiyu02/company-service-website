import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 gradient-bg-orange"></div>
      
      {/* 装飾的な背景要素 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent-300 to-primary-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative container-custom py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* メインコンテンツ */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight">
                  <span className="whitespace-nowrap">届けたい相手に、</span><br />
                  <span className="whitespace-nowrap">きちんと届く</span><br />
                  <span className="whitespace-nowrap text-yellow-200 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold drop-shadow-lg">映像</span><span className="whitespace-nowrap">を。</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  千葉の映像制作会社 富楽ファイン｜採用動画・PR動画・集客動画
                </p>
              </div>

              {/* CTAボタン */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Link href="/contact" className="btn-primary text-xl whitespace-nowrap">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  今すぐ相談する
                </Link>
                <Link href="#target-appeal" className="btn-secondary text-xl whitespace-nowrap">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  詳しく見る
                </Link>
              </div>
            </div>

            {/* 右側：ビジュアル要素（チラシ風デザイン） */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-secondary-100">
                {/* 装飾的な要素 */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full"></div>
                
                {/* コンテンツ */}
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl text-white text-2xl font-bold">
                    F
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary-800">
                    映像制作で<br />
                    <span className="text-gradient">「共感」</span>を生む
                  </h3>
                  
                  <div className="space-y-3 text-secondary-600">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>採用ブランディング</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>集客・PR映像</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>イベント動画</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>SNS運用代行</span>
                    </div>
                  </div>

                  <div className="pt-4 text-sm text-secondary-500">
                    千葉・東京を中心に<br />
                    中小企業様をサポート
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero