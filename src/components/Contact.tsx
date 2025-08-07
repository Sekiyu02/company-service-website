import Link from 'next/link'

const Contact = () => {
  return (
    <section className="section-padding gradient-bg-orange text-white relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              まずはお気軽に<br />
              ご相談ください
            </h2>
            
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              映像制作が初めての方も、お困りごとがある方も、<br />
              どんなことでもお聞かせください。
            </p>
            
            <div className="inline-flex items-center space-x-2 text-lg opacity-90 mb-8">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>営業時間：年中無休</span>
            </div>
          </div>
          
          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-primary-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg text-lg whitespace-nowrap"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              お問い合わせフォーム
            </Link>
            <a
              href="tel:08065471033"
              className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-primary-600 transition-all duration-200 shadow-lg text-lg whitespace-nowrap"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              080-6547-1033(代表)
            </a>
          </div>
          
          {/* 事業所情報 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors duration-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">東金事業所</h3>
                  <div className="space-y-1 opacity-90">
                    <p>〒283-0006</p>
                    <p>千葉県東金市東新宿12-5</p>
                    <p>富楽ビル301</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors duration-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">千葉事業所</h3>
                  <div className="space-y-1 opacity-90">
                    <p>〒264-0026</p>
                    <p>千葉県千葉市若葉区</p>
                    <p>西都賀３丁目</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 追加メッセージ */}
          <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg opacity-90 leading-relaxed">
                千葉・東京を中心に、中小企業様の映像制作をサポートしています。<br />
                初回のご相談は無料です。お客様の課題やご要望をお聞かせください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact