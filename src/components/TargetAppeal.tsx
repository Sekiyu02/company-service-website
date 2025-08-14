const TargetAppeal = () => {
  return (
    <section id="target-appeal" className="section-padding bg-white relative overflow-visible">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto text-center relative">
          
          {/* セクションタイトル */}
          <div className="mb-16 animate-fade-in-up">
            <div className="text-sm font-light text-gray-500 mb-4 tracking-[0.4em] font-['Noto_Sans_JP']">
              MESSAGE
            </div>
            <div className="text-lg text-gray-800 font-['Noto_Sans_JP'] font-medium tracking-wide">
              映像制作への想い
            </div>
          </div>

          {/* メインメッセージ */}
          <div className="space-y-12 animate-fade-in-up mb-20">
            {/* キーメッセージ */}
            <div className="space-y-8">
              <h2 className="font-['Noto_Serif_JP'] text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 tracking-wide" style={{ lineHeight: '1.7' }}>
                企業の想い、商品、サービス──<br />
                それは<span className="text-gradient font-bold">「見せ方」次第</span>で<br />
                評価が<span className="text-primary-600 font-bold text-3xl md:text-4xl lg:text-5xl">180度変わります</span>
              </h2>
            </div>

            {/* コアメッセージ */}
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="bg-gradient-to-br from-gray-50 via-white to-primary-50/20 rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
                <div className="space-y-8">
                  <div className="font-['Noto_Sans_JP'] text-lg md:text-xl text-gray-700 leading-loose font-light">
                    私たちは御社の言葉を<br />
                    <span className="font-semibold text-primary-600 bg-primary-100/60 px-3 py-1 rounded-lg font-['Noto_Serif_JP']">"顧客の目線"</span>
                    で翻訳し
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
                  </div>
                  
                  <div className="font-['Noto_Sans_JP'] text-lg md:text-xl text-gray-700 leading-loose font-light">
                    映像という伝達手段で<br />
                    <span className="font-semibold text-primary-600 bg-primary-100/60 px-3 py-1 rounded-lg font-['Noto_Serif_JP']">"共感"</span>
                    に変えて届けます。
                  </div>
                </div>
              </div>
            </div>

            {/* 結論メッセージ */}
            <div className="space-y-6">
              <div className="font-['Noto_Serif_JP'] text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 leading-relaxed tracking-wide">
                だからこそ、<span className="text-gray-900">伝わる。</span><br />
                だからこそ、<span className="text-gray-900">届く。</span>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>
                <div className="font-['Noto_Sans_JP'] text-base text-gray-600 font-light tracking-wide leading-relaxed">
                  映像に込められた想いは、<br />
                  見る人の心に確実に響きます。
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative pt-8 animate-fade-in-up lg:flex lg:items-end lg:justify-between" style={{ animationDelay: '0.3s' }}>
            <div className="lg:w-1/2 lg:pr-8 space-y-6 text-center lg:text-left">
              <div className="relative bg-gradient-to-r from-primary-50/90 via-white/95 to-primary-50/90 backdrop-blur-sm border border-primary-200/60 rounded-2xl py-8 px-6 md:px-8 shadow-xl">
                <div className="font-['Noto_Serif_JP'] text-xl md:text-2xl lg:text-3xl text-gray-800 font-semibold tracking-wide leading-relaxed">
                  あなたの想いを、<br className="sm:hidden" />確実に届けませんか？
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="/contact" className="btn-primary text-lg whitespace-nowrap">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  無料相談を申し込む
                </a>
                <a href="#services" className="btn-secondary text-lg whitespace-nowrap">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  サービスを見る
                </a>
              </div>
            </div>
            
            {/* 右側の画像スペース - デスクトップのみ */}
            <div className="hidden lg:block lg:w-1/2"></div>
          </div>

          {/* 画像 - モバイルとデスクトップで異なる配置 */}
          {/* モバイル・タブレット用画像 */}
          <div className="lg:hidden mt-8 mb-4">
            <img 
              src="/images/target-appeal-bg.png" 
              alt="映像制作チーム" 
              className="w-full max-w-md mx-auto object-contain"
              style={{ maxHeight: '300px' }}
            />
          </div>
          
          {/* デスクトップ用画像 */}
          <div 
            className="absolute bottom-0 right-0 z-10 hidden lg:block"
            style={{
              transform: 'translateY(30%)',
              width: '600px',
              height: '400px'
            }}
          >
            <img 
              src="/images/target-appeal-bg.png" 
              alt="映像制作チーム" 
              className="w-full h-full object-contain object-bottom"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default TargetAppeal