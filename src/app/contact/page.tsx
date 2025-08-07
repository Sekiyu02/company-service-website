import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'お問い合わせ｜株式会社富楽ファイン',
  description: '映像制作・広報支援のご相談、お見積りのご依頼はこちらから。千葉・東京を中心に中小企業様のサポートを行っております。',
}

export default function Contact() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              お問い合わせ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              映像制作・広報支援に関するご相談やお見積りのご依頼は、<br />
              こちらのフォームからお気軽にお送りください。
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}