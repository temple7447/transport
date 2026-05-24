import Hero from '../components/Hero'
import Partners from '../components/Partners'
import QuoteCalculator from '../components/QuoteCalculator'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import WhyChooseUs from '../components/WhyChooseUs'
import Statistics from '../components/Statistics'
import Testimonials from '../components/Testimonials'
import BusinessSection from '../components/BusinessSection'
import BlogSection from '../components/BlogSection'
import FAQ from '../components/FAQ'
import CTABanner from '../components/CTABanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Partners />
      <QuoteCalculator />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <BusinessSection />
      <BlogSection />
      <FAQ />
      <CTABanner />
    </>
  )
}
