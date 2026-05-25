import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState, lazy, Suspense } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import QuickTrack from './components/QuickTrack'
import ErrorBoundary from './components/ErrorBoundary'
import { getToken } from './lib/api'

const HomePage             = lazy(() => import('./pages/HomePage'))
const ServicesPage         = lazy(() => import('./pages/ServicesPage'))
const TrackPage            = lazy(() => import('./pages/TrackPage'))
const AboutPage            = lazy(() => import('./pages/AboutPage'))
const ContactPage          = lazy(() => import('./pages/ContactPage'))
const AdminLoginPage       = lazy(() => import('./pages/AdminLoginPage'))
const AdminDashboard       = lazy(() => import('./pages/AdminDashboard'))
const AdminShipmentDetail  = lazy(() => import('./pages/AdminShipmentDetail'))
const FreightPage          = lazy(() => import('./pages/FreightPage'))
const MoversPage           = lazy(() => import('./pages/MoversPage'))
const CustomsPage          = lazy(() => import('./pages/CustomsPage'))
const NotFoundPage         = lazy(() => import('./pages/NotFoundPage'))
const PrivacyPolicyPage    = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsOfServicePage   = lazy(() => import('./pages/TermsOfServicePage'))
const CookiePolicyPage     = lazy(() => import('./pages/CookiePolicyPage'))
const ShippingPolicyPage   = lazy(() => import('./pages/ShippingPolicyPage'))
const InsuranceTermsPage   = lazy(() => import('./pages/InsuranceTermsPage'))
const CareersPage          = lazy(() => import('./pages/CareersPage'))
const BlogPage             = lazy(() => import('./pages/BlogPage'))
const PressPage            = lazy(() => import('./pages/PressPage'))
const HelpCenterPage       = lazy(() => import('./pages/HelpCenterPage'))
const SustainabilityPage   = lazy(() => import('./pages/SustainabilityPage'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname, hash])
  return null
}

function PageLoader() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#080530', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>

      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '15%', left: '25%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(204,21,0,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '20%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,193,0,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Animated ring + logo */}
      <div style={{ position: 'relative', width: 96, height: 96, marginBottom: 36 }}>
        {/* Outer slow ring */}
        <div style={{ position: 'absolute', inset: -12, borderRadius: '50%', border: '1.5px solid rgba(245,193,0,0.15)', animation: 'loaderRingOuter 8s linear infinite' }} />
        {/* Spinning arc */}
        <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#F5C100', borderRightColor: 'rgba(245,193,0,0.3)', animation: 'loaderRingOuter 1.4s ease-in-out infinite' }} />
        {/* Counter-spin inner arc */}
        <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1.5px solid transparent', borderBottomColor: '#CC1500', animation: 'loaderRingInner 2.1s ease-in-out infinite' }} />
        {/* Logo box */}
        <div style={{ width: 96, height: 96, borderRadius: 22, background: 'linear-gradient(135deg, #CC1500 0%, #A81200 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 48px rgba(204,21,0,0.45), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
          <svg viewBox="0 0 24 24" fill="none" style={{ width: 44, height: 44 }}>
            <path d="M1 3h14v11H1V3z" fill="white" opacity="0.95"/>
            <path d="M15 7h5l3 4v3h-8V7z" fill="white" opacity="0.82"/>
            <circle cx="5"  cy="17" r="2.2" fill="white"/>
            <circle cx="19" cy="17" r="2.2" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Brand name */}
      <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-0.5px', color: 'white', lineHeight: 1, animation: 'loaderFadeSlide 0.7s ease 0.1s both' }}>
        ACCESSIBLEXPRESS
      </div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '4px', color: 'rgba(255,255,255,0.28)', marginTop: 5, marginBottom: 40, animation: 'loaderFadeSlide 0.7s ease 0.25s both' }}>
        DELIVERY
      </div>

      {/* Progress bar */}
      <div style={{ width: 200, height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden', animation: 'loaderFadeSlide 0.5s ease 0.35s both' }}>
        <div style={{ height: '100%', background: 'linear-gradient(90deg, #CC1500 0%, #F5C100 100%)', borderRadius: 4, animation: 'loadProgress 2s ease-out forwards' }} />
      </div>

      {/* Bouncing dots */}
      <div style={{ display: 'flex', gap: 7, marginTop: 22, animation: 'loaderFadeSlide 0.5s ease 0.5s both' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#F5C100', animation: `loadDots 1.1s ease-in-out ${i * 0.18}s infinite` }} />
        ))}
      </div>

    </div>
  )
}

function PublicLayout() {
  return (
    <>
      {/* Skip link — visible on focus for keyboard/screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold"
        style={{ background: '#F5C100', color: '#0D0840' }}
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar />
      <span id="main-content" tabIndex={-1} />
      <Outlet />
      <QuickTrack />
      <Footer />
    </>
  )
}

function AdminGuard() {
  const isAuth = getToken() !== null
  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default function App() {
  const [initialLoad, setInitialLoad] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setInitialLoad(false), 6000)
    return () => clearTimeout(t)
  }, [])

  if (initialLoad) return <PageLoader />

  return (
    <BrowserRouter>
      <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Admin — no Navbar/Footer */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<AdminGuard />}>
            <Route path="/admin"               element={<AdminDashboard />} />
            <Route path="/admin/shipments"     element={<AdminDashboard />} />
            <Route path="/admin/create"        element={<AdminDashboard />} />
            <Route path="/admin/track"         element={<AdminDashboard />} />
            <Route path="/admin/subscribers"   element={<AdminDashboard />} />
            <Route path="/admin/shipments/:id" element={<AdminShipmentDetail />} />
          </Route>

          {/* Public — with Navbar/Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/"                   element={<HomePage />} />
            <Route path="/services"           element={<ServicesPage />} />
            <Route path="/freight"            element={<FreightPage />} />
            <Route path="/movers"             element={<MoversPage />} />
            <Route path="/customs"            element={<CustomsPage />} />
            <Route path="/track"              element={<TrackPage />} />
            <Route path="/about"              element={<AboutPage />} />
            <Route path="/contact"            element={<ContactPage />} />
            <Route path="/legal/privacy"      element={<PrivacyPolicyPage />} />
            <Route path="/legal/terms"        element={<TermsOfServicePage />} />
            <Route path="/legal/cookies"      element={<CookiePolicyPage />} />
            <Route path="/legal/shipping"     element={<ShippingPolicyPage />} />
            <Route path="/legal/insurance"    element={<InsuranceTermsPage />} />
            <Route path="/careers"            element={<CareersPage />} />
            <Route path="/blog"               element={<BlogPage />} />
            <Route path="/press"              element={<PressPage />} />
            <Route path="/help"               element={<HelpCenterPage />} />
            <Route path="/sustainability"     element={<SustainabilityPage />} />
            <Route path="*"                   element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
