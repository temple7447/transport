import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import TrackPage from './pages/TrackPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminShipmentDetail from './pages/AdminShipmentDetail'
import FreightPage from './pages/FreightPage'
import MoversPage from './pages/MoversPage'
import CustomsPage from './pages/CustomsPage'
import NotFoundPage from './pages/NotFoundPage'
import LiveChat from './components/LiveChat'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import CookiePolicyPage from './pages/CookiePolicyPage'
import ShippingPolicyPage from './pages/ShippingPolicyPage'
import InsuranceTermsPage from './pages/InsuranceTermsPage'
import CareersPage from './pages/CareersPage'
import BlogPage from './pages/BlogPage'
import PressPage from './pages/PressPage'
import HelpCenterPage from './pages/HelpCenterPage'
import SustainabilityPage from './pages/SustainabilityPage'
import { getToken } from './lib/api'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Give the page a tick to render before scrolling to the anchor
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

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
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
      <Routes>
        {/* Admin — no Navbar/Footer */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<AdminGuard />}>
          <Route path="/admin"              element={<AdminDashboard />} />
          <Route path="/admin/shipments"    element={<AdminDashboard />} />
          <Route path="/admin/create"       element={<AdminDashboard />} />
          <Route path="/admin/track"        element={<AdminDashboard />} />
          <Route path="/admin/subscribers"  element={<AdminDashboard />} />
          <Route path="/admin/shipments/:id" element={<AdminShipmentDetail />} />
        </Route>

        {/* Public — with Navbar/Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/freight"  element={<FreightPage />} />
          <Route path="/movers"   element={<MoversPage />} />
          <Route path="/customs"  element={<CustomsPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/legal/terms" element={<TermsOfServicePage />} />
          <Route path="/legal/cookies" element={<CookiePolicyPage />} />
          <Route path="/legal/shipping" element={<ShippingPolicyPage />} />
          <Route path="/legal/insurance" element={<InsuranceTermsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
