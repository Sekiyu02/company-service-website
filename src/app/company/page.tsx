import CompanySection from '@/components/CompanySection'
import Contact from '@/components/Contact'

export const metadata = {
  title: '会社概要｜株式会社富楽ファイン',
  description: '株式会社富楽ファインの会社概要、所在地、役員情報をご紹介します。千葉・東京を中心に映像制作・広報支援サービスを提供しています。',
}

export default function Company() {
  return (
    <>
      <CompanySection />
      <Contact />
    </>
  )
}