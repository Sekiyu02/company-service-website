import Image from 'next/image'

const AboutSection = () => {
  return (
    <section className="section-padding gradient-bg">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* ページタイトル */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              代表挨拶
            </h1>
            <p className="text-xl text-gray-600">
              すべての人に"豊かさ"と"楽しさ"を
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 代表写真 */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="w-full max-w-md mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-6">
                  <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-inner">
                    <Image
                      src="/images/representative.jpg"
                      alt="代表取締役 冨山大貴"
                      width={400}
                      height={400}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                </div>
                
                {/* 装飾要素 */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-secondary-300 to-primary-300 rounded-full opacity-20"></div>
              </div>
              
              {/* 代表者情報 */}
              <div className="text-center mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">冨山 大貴</h2>
                <p className="text-sm text-gray-500 font-light tracking-wider mb-2">Tomiyama Daiki</p>
                <p className="text-primary-600 font-semibold">代表取締役</p>
              </div>
            </div>

            {/* 企業理念・メッセージ */}
            <div className="order-1 lg:order-2">
              <div className="space-y-10">
                {/* 理念タイトル */}
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-light text-gray-500 mb-4 tracking-[0.3em] font-['Noto_Sans_JP']">
                    PHILOSOPHY
                  </h2>
                  <div className="text-xl text-gray-800 mb-2 font-['Noto_Sans_JP'] font-medium tracking-wide">
                    企業理念
                  </div>
                </div>

                {/* メイン理念 */}
                <div className="text-center lg:text-left">
                  <div className="font-['Noto_Serif_JP'] text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-relaxed mb-8 tracking-wide">
                    すべての人に<br />
                    <span className="text-primary-600 font-bold">"豊かさ"</span>と<span className="text-secondary-600 font-bold">"楽しさ"</span>を
                  </div>
                </div>

                {/* メッセージ本文 */}
                <div className="space-y-8">
                  <div className="font-['Noto_Sans_JP'] text-gray-700 leading-loose text-lg">
                    <p className="mb-6 font-light">
                      私たち富楽ファインは、<br />
                      どんな難題にも前向きに向き合い、<br />
                      <span className="font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">"なんとかする力"</span>で、<br />
                      お客様の「うまくいかない」に伴走する会社です。
                    </p>
                  </div>

                  {/* 3つの要素 */}
                  <div className="bg-gradient-to-br from-white via-gray-50 to-primary-50/30 rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div className="space-y-3">
                        <div className="font-['Noto_Serif_JP'] text-4xl font-bold text-primary-600">"富"</div>
                        <div className="font-['Noto_Sans_JP'] text-sm text-gray-600 font-medium tracking-wider">豊かさ</div>
                      </div>
                      <div className="space-y-3">
                        <div className="font-['Noto_Serif_JP'] text-4xl font-bold text-secondary-600">"楽"</div>
                        <div className="font-['Noto_Sans_JP'] text-sm text-gray-600 font-medium tracking-wider">楽しさ</div>
                      </div>
                      <div className="space-y-3">
                        <div className="font-['Noto_Sans_JP'] text-lg font-bold text-primary-700">ファイン</div>
                        <div className="font-['Noto_Sans_JP'] text-sm text-gray-600 font-medium tracking-wider">なんとかする力</div>
                      </div>
                    </div>
                  </div>

                  <div className="font-['Noto_Sans_JP'] text-gray-700 leading-loose text-lg space-y-6">
                    <p className="font-light">
                      企業が抱える課題にまっすぐ向き合い、<br />
                      ともに悩み、ともに考え、ともに進む。<br />
                      そして、課題のその先にある、<br />
                      可能性を引き出していきます。
                    </p>

                    <div className="border-l-4 border-primary-500 pl-6 py-2">
                      <p className="font-['Noto_Serif_JP'] text-xl font-medium text-primary-700 leading-relaxed">
                        「豊かさ」と「楽しさ」を届けることで、<br />
                        全ての人を、もっと幸せにしたい。
                      </p>
                    </div>

                    <div className="text-center lg:text-left pt-4">
                      <p className="font-['Noto_Serif_JP'] text-2xl font-bold text-gray-900 tracking-wide">
                        それが、私たち富楽ファインの使命です。
                      </p>
                    </div>
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

export default AboutSection