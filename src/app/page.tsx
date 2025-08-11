import Hero from '@/components/Hero'
import TargetAppeal from '@/components/TargetAppeal'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import StructuredData from '@/components/StructuredData'

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <TargetAppeal />
      <Services />
      <Contact />
    </>
  )
}