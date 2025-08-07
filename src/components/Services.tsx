import Link from 'next/link'

const Services = () => {
  const services = [
    {
      title: '採用ブランディング映像',
      description: 'ただ「採用映像を作る」のではなく、どんな人と働きたいのか、どんな未来を描いているのか──その"企業の想い"を、映像で形にします。',
      details: 'ミスマッチを防ぎ、想いに共感した人が集まる採用へ。幹部候補、熱量の高い求職者との出会いをつくります。',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-blue-50 to-primary-50',
      iconBg: 'from-blue-400 to-purple-500'
    },
    {
      title: '集客・PR映像',
      description: 'お客様の声 × 事業者の想い をつなげる、共感型プロモーション。商品やサービスの魅力は、"語り手の温度"によって変わります。',
      details: '私たちは、お客様やサービス提供者のリアルな言葉をインタビュー形式で丁寧に引き出し、共感で動くPR映像に仕立てます。',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      gradient: 'from-primary-50 to-accent-50',
      iconBg: 'from-pink-400 to-red-500'
    },
    {
      title: 'イベントプロモーション動画',
      description: '空気感・臨場感が"次の集客"に効く。イベントの一瞬の熱狂も、主催者の想いも、映像で残せば、次のプロモーションやリピート率アップにも活かせます。',
      details: '撮って出しエンドロールやダイジェスト映像など、スピード対応も可能です。',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-accent-50 to-orange-50',
      iconBg: 'from-orange-400 to-yellow-500'
    },
    {
      title: 'SNS運用代行（＋ショート動画）',
      description: '「うまくいかない」に、寄り添います。SNSが苦手、何を投稿したらいいかわからない、継続できない──そんな課題に、映像制作と投稿運用をセットでご提案。',
      details: '「リアル」と「オンライン」をつなぎ、企業の"人柄"と"想い"が届く投稿を伴走型で支援します。',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      gradient: 'from-green-50 to-primary-50',
      iconBg: 'from-green-400 to-teal-500'
    }
  ]

  return (
    <section id="services" className="section-padding gradient-bg-orange">
      <div className="container-custom">
        {/* セクションタイトル */}
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            サービス紹介
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            御社の課題とニーズに合わせて、<br />
            最適な映像ソリューションをご提案します
          </p>
        </div>

        {/* サービス一覧 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group card card-hover p-8 lg:p-10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* アイコンとタイトル */}
              <div className="flex items-start space-x-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold text-secondary-800 group-hover:text-primary-600 transition-colors duration-300 mb-2">
                    {service.title}
                  </h3>
                </div>
              </div>
              
              {/* 説明文 */}
              <div className="space-y-4 mb-6">
                <p className="text-secondary-600 leading-relaxed">
                  {service.description}
                </p>
                
                <p className="text-secondary-500 text-sm leading-relaxed">
                  {service.details}
                </p>
              </div>
              
              {/* アクション */}
              <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors duration-300 cursor-pointer">
                <span>詳しく相談する</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* 追加サービス */}
        <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="card p-10 lg:p-12 bg-gradient-to-br from-primary-50 via-white to-accent-50 border-primary-100">
            <div className="max-w-3xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold text-secondary-800 mb-4">
                撮影・編集のみの対応も
              </h3>
              
              <p className="text-lg text-secondary-600 leading-relaxed mb-6">
                撮影だけ、編集だけ、といったスポット対応も可能です。<br />
                「映像を完成させたいけど手が足りない」という現場にも、柔軟に伴走します。
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center text-sm text-secondary-500">
                <span className="px-3 py-1 bg-white rounded-full border border-secondary-200">✓ 撮影のみ</span>
                <span className="px-3 py-1 bg-white rounded-full border border-secondary-200">✓ 編集のみ</span>
                <span className="px-3 py-1 bg-white rounded-full border border-secondary-200">✓ スポット対応</span>
                <span className="px-3 py-1 bg-white rounded-full border border-secondary-200">✓ 柔軟なサポート</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="mb-6">
            <p className="text-lg text-white/90 mb-8">
              どのサービスも、まずはお気軽にご相談ください。<br />
              お客様の状況に合わせて最適なプランをご提案いたします。
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-lg whitespace-nowrap">
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              サービスについて相談する
            </Link>
            <a href="tel:08065471033" className="btn-secondary text-lg whitespace-nowrap">
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              電話で相談する
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services