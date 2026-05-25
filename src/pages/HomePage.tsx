import Hero from '../components/Hero'
import HeroTrackBar from '../components/HeroTrackBar'
import Partners from '../components/Partners'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import CTABanner from '../components/CTABanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroTrackBar />
      <Partners />
      <Services />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
    </>
  )
}
