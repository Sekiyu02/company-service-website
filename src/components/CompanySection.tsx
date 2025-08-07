const CompanySection = () => {
  const companyInfo = [
    { label: '会社名', value: '株式会社富楽ファイン' },
    { label: '設立', value: '2024年5月15日' },
    { label: '代表取締役', value: '冨山大貴' },
    { label: '執行役員', value: '関口友菜' },
    { label: '電話番号', value: '080-6547-1033(代表)' },
  ]

  const businessContent = [
    '映像制作・編集サービス',
    '採用ブランディング映像制作',
    '集客・PR映像制作',
    'イベントプロモーション動画制作',
    'SNS運用代行・ショート動画制作',
    '企業広報支援サービス'
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* ページタイトル */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              会社概要
            </h1>
          </div>

          {/* 会社情報テーブル */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <div className="space-y-6">
              {companyInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="md:w-1/3 mb-2 md:mb-0">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {info.label}
                    </span>
                  </div>
                  <div className="md:w-2/3">
                    <span className="text-lg text-gray-900 font-medium">
                      {info.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 所在地 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                東金事業所
              </h3>
              <div className="text-gray-700 space-y-1">
                <p>〒283-0006</p>
                <p>千葉県東金市東新宿12-5</p>
                <p>富楽ビル301</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                千葉事業所
              </h3>
              <div className="text-gray-700 space-y-1">
                <p>〒264-0026</p>
                <p>千葉県千葉市若葉区</p>
                <p>西都賀３丁目</p>
              </div>
            </div>
          </div>

          {/* 事業内容 */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              事業内容
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessContent.map((content, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-colors duration-200"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">{content}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 企業理念（簡易版） */}
          <div className="mt-16 text-center gradient-bg-mission rounded-2xl p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              企業理念
            </h3>
            <p className="text-xl md:text-2xl font-semibold">
              「すべての人に"豊かさ"と"楽しさ"を」
            </p>
            <div className="mt-8">
              <a
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
              >
                代表挨拶を見る
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanySection