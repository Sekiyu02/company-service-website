import AboutSection from '@/components/AboutSection'
import Contact from '@/components/Contact'

export const metadata = {
  title: '代表挨拶｜株式会社富楽ファイン',
  description: 'すべての人に"豊かさ"と"楽しさ"を。株式会社富楽ファインの代表取締役 冨山大貴からのメッセージをご紹介します。',
}

export default function About() {
  return (
    <>
      <AboutSection />
      <Contact />
    </>
  )
}