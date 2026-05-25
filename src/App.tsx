import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LiveChat from './components/LiveChat'
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
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0D0840' }}>
      <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-yellow-400" style={{ animation: 'spin 0.8s linear infinite' }} />
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
      <LiveChat />
    </>
  )
}

function AdminGuard() {
  const isAuth = getToken() !== null
  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default function App() {
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
