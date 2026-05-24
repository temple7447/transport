import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

type NavChild = { label: string; to: string; desc: string; icon: React.ReactNode }
type NavItem  = { label: string; to: string; children?: NavChild[] }

const ICON = (d: string | string[]) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}>
    {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p} />)}
  </svg>
)

const NAV: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Services', to: '/services',
    children: [
      { label: 'Express Delivery',  to: '/services', desc: 'Same-day & next-day parcel delivery',    icon: ICON('M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z') },
      { label: 'Air Freight',       to: '/freight',  desc: 'Global air cargo in 2–4 days',           icon: ICON('M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5') },
      { label: 'Sea Freight',       to: '/freight',  desc: 'FCL & LCL ocean shipping worldwide',     icon: ICON(['M12 3v4','M3 17l2-6h14l2 6H3z','M1 21h22','M7 11V7a5 5 0 0110 0v4']) },
      { label: 'Road Transport',    to: '/freight',  desc: 'Cross-border ground freight',            icon: ICON(['M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z','M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l1 1h1m8-1V8h3l3 3v4l1 1h-1m-6 0h-3']) },
      { label: 'Warehousing',       to: '/services', desc: 'Storage & fulfilment in 50+ locations',  icon: ICON(['M3 9.5L12 3l9 6.5V21H3V9.5z','M9 21V12h6v9']) },
      { label: 'Customs Clearance', to: '/customs',  desc: 'Licensed brokers, 24-hr clearance',      icon: ICON('M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z') },
    ],
  },
  {
    label: 'Freight', to: '/freight',
    children: [
      { label: 'Air Freight Carrier',      to: '/freight', desc: '500+ airports · 2–4 day transit',       icon: ICON('M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5') },
      { label: 'Ocean Freight Forwarding', to: '/freight', desc: '300+ ports · FCL & LCL options',        icon: ICON(['M12 3v4','M3 17l2-6h14l2 6H3z','M1 21h22','M7 11V7a5 5 0 0110 0v4']) },
      { label: 'Road Freight Forwarding',  to: '/freight', desc: '2,000+ vehicles · cross-border routes', icon: ICON(['M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z','M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l1 1h1m8-1V8h3l3 3v4l1 1h-1m-6 0h-3']) },
      { label: 'SOC Movements',            to: '/freight', desc: 'Shipper-owned container management',    icon: ICON('M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9') },
    ],
  },
  {
    label: 'Movers', to: '/movers',
    children: [
      { label: 'Household Goods',      to: '/movers', desc: 'Residential home moving',            icon: ICON('M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75') },
      { label: 'Commercial Goods',     to: '/movers', desc: 'Office & business relocation',       icon: ICON('M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21') },
      { label: 'International Moving', to: '/movers', desc: 'Cross-border relocation service',    icon: ICON('M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418') },
      { label: 'Storage & Packing',    to: '/movers', desc: 'Secure short & long-term storage',  icon: ICON('M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z') },
    ],
  },
  {
    label: 'Customs', to: '/customs',
    children: [
      { label: 'Export – Import',      to: '/customs', desc: 'Full import & export clearance',   icon: ICON('M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3') },
      { label: "Importer's Rep",        to: '/customs', desc: 'Local compliance & IOR services',  icon: ICON(['M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z','M4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z']) },
      { label: 'Trade Consulting',     to: '/customs', desc: 'Tariff optimisation & FTA advice', icon: ICON('M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18') },
      { label: 'Freight Consultation', to: '/customs', desc: 'End-to-end logistics advisory',   icon: ICON('M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z') },
    ],
  },
  { label: 'About',   to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [openDesktop, setOpenDesktop] = useState<string | null>(null)
  const [openMobile,  setOpenMobile]  = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location   = useLocation()

  const isHome = location.pathname === '/'
  const solid  = !isHome || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setOpenDesktop(null)
    setOpenMobile(null)
  }, [location])

  const enterDesktop = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDesktop(label)
  }
  const leaveDesktop = () => {
    closeTimer.current = setTimeout(() => setOpenDesktop(null), 140)
  }
  const toggleMobile = (label: string) =>
    setOpenMobile(prev => (prev === label ? null : label))

  const navTextColor = (active: boolean) =>
    active ? '#CC1500' : solid ? '#374151' : 'rgba(255,255,255,0.9)'

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Top contact strip (homepage hero only) ─────────────── */}
      {!solid && (
        <div
          className="hidden lg:flex items-center justify-between px-8 text-xs"
          style={{
            background: 'rgba(5,15,30,0.65)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            height: 36,
            color: 'rgba(255,255,255,0.48)',
          }}
        >
          <div className="flex items-center gap-7">
            <a
              href="mailto:support@quicksenddelivery.com"
              className="flex items-center gap-1.5 hover:text-white/80 transition-colors"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}>
                <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
              </svg>
              support@quicksenddelivery.com
            </a>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}>
                <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Mon–Fri · 07:00–18:00 WAT
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="tel:+15126785033"
              className="flex items-center gap-1.5 hover:text-white/80 transition-colors"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}>
                <path d="M2.25 6.338c0 .768.107 1.51.303 2.21 1.14 4.075 4.833 7.77 8.908 8.907.7.196 1.443.303 2.21.303 2.074 0 4.012-.594 5.644-1.625M2.25 6.338C2.25 4.517 3.663 3 5.406 3h1.125c.337 0 .662.088.948.254L9.374 4.46a1.125 1.125 0 01.414 1.512L8.73 7.67a.75.75 0 00-.05.544l.052.213c.398 1.625 1.455 3.178 2.73 4.504 1.325 1.275 2.879 2.332 4.504 2.73l.213.052a.75.75 0 00.544-.05l1.696-1.057a1.125 1.125 0 011.512.414l1.207 1.9c.167.287.255.61.255.949v1.125c0 1.742-1.516 3.156-3.338 3.156"/>
              </svg>
              +1 (512) 678-5033
            </a>
            <Link
              to="/track"
              className="flex items-center gap-1 hover:text-white/80 transition-colors"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Track Shipment
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}><path d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      )}

      {/* ── Main nav bar ──────────────────────────────────────────── */}
      <nav
        className="transition-all duration-300"
        style={{
          background: solid ? 'rgba(255,255,255,0.98)' : 'transparent',
          backdropFilter: solid ? 'blur(24px)' : 'none',
          boxShadow: solid ? '0 1px 0 rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center" style={{ height: solid ? 64 : 72 }}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0" style={{ textDecoration: 'none' }}>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shadow"
                style={{ background: 'linear-gradient(135deg,#F5C100,#e6ad00)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M1 3h14v11H1V3z" fill="white" opacity="0.95"/>
                  <path d="M15 7h5l3 4v3h-8V7z" fill="white" opacity="0.8"/>
                  <circle cx="5"  cy="17" r="2.2" fill="white"/>
                  <circle cx="19" cy="17" r="2.2" fill="white"/>
                </svg>
              </div>
              <div className="leading-none select-none">
                <div style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '-0.3px', color: solid ? '#0f172a' : 'white', lineHeight: 1.1 }}>
                  QUICK SEND
                </div>
                <div style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '1.4px', color: solid ? '#94a3b8' : 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                  DELIVERY
                </div>
              </div>
            </Link>

            {/* ── Desktop nav links — pushed to right with ml-auto ── */}
            <div className="hidden xl:flex items-center gap-0.5 ml-auto">
              {NAV.map(item => {
                const active = location.pathname === item.to ||
                  (item.children?.some(c => c.to === location.pathname) ?? false)

                if (!item.children) {
                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap"
                      style={{
                        color: navTextColor(active),
                        textDecoration: 'none',
                        background: active
                          ? (solid ? 'rgba(204,21,0,0.07)' : 'rgba(255,255,255,0.1)')
                          : 'transparent',
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          e.currentTarget.style.color = solid ? '#0f172a' : 'white'
                          e.currentTarget.style.background = solid ? '#f1f5f9' : 'rgba(255,255,255,0.12)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          e.currentTarget.style.color = navTextColor(false)
                          e.currentTarget.style.background = 'transparent'
                        }
                      }}
                    >
                      {item.label}
                      {active && (
                        <span
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 rounded-full"
                          style={{ width: 18, height: 2, background: '#CC1500' }}
                        />
                      )}
                    </Link>
                  )
                }

                const isOpen = openDesktop === item.label
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => enterDesktop(item.label)}
                    onMouseLeave={leaveDesktop}
                  >
                    <button
                      className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap"
                      style={{
                        color: navTextColor(active || isOpen),
                        background: active || isOpen
                          ? (solid ? 'rgba(204,21,0,0.07)' : 'rgba(255,255,255,0.1)')
                          : 'transparent',
                      }}
                    >
                      {item.label}
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                        style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                      >
                        <path d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>

                    {/* Dropdown panel */}
                    <div
                      className="absolute right-0 top-full pt-2.5"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.98)',
                        pointerEvents: isOpen ? 'auto' : 'none',
                        transition: 'opacity 0.18s ease, transform 0.18s ease',
                        minWidth: item.children!.length > 4 ? 320 : 290,
                        zIndex: 60,
                      }}
                    >
                      <div
                        className="bg-white rounded-2xl overflow-hidden"
                        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}
                      >
                        {/* Coloured top accent */}
                        <div style={{ height: 3, background: 'linear-gradient(90deg,#CC1500,#ff6b5b)' }} />

                        {/* Header */}
                        <div className="px-4 py-3 border-b border-slate-50">
                          <Link
                            to={item.to}
                            className="flex items-center justify-between group"
                            style={{ textDecoration: 'none' }}
                          >
                            <div>
                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
                              <p className="text-sm font-bold text-slate-800 mt-0.5">All {item.label} Services</p>
                            </div>
                            <span
                              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-all"
                              style={{ color: '#CC1500', background: 'rgba(204,21,0,0.07)' }}
                            >
                              View all
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}><path d="M9 5l7 7-7 7"/></svg>
                            </span>
                          </Link>
                        </div>

                        {/* Items */}
                        <div className="p-2">
                          {item.children!.map(child => (
                            <Link
                              key={child.label}
                              to={child.to}
                              className="flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group"
                              style={{ textDecoration: 'none' }}
                              onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc' }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                            >
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150 mt-0.5"
                                style={{ background: '#f1f5f9', color: '#64748b' }}
                                onMouseEnter={e => {
                                  const el = e.currentTarget as HTMLElement
                                  el.style.background = '#CC1500'
                                  el.style.color = 'white'
                                }}
                                onMouseLeave={e => {
                                  const el = e.currentTarget as HTMLElement
                                  el.style.background = '#f1f5f9'
                                  el.style.color = '#64748b'
                                }}
                              >
                                {child.icon}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-800 group-hover:text-[#CC1500] transition-colors leading-tight">{child.label}</p>
                                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{child.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Get a Quote CTA */}
              <Link
                to="/contact"
                className="ml-4 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 shrink-0"
                style={{
                  background: '#CC1500',
                  color: 'white',
                  textDecoration: 'none',
                  boxShadow: '0 2px 12px rgba(204,21,0,0.3)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#aa1200'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(204,21,0,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#CC1500'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(204,21,0,0.3)' }}
              >
                Get a Quote
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}><path d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* ── Hamburger (mobile / tablet) ───────────────────── */}
            <button
              className="xl:hidden ml-auto flex flex-col justify-center items-center w-10 h-10 rounded-xl transition-colors gap-[5px]"
              style={{ background: menuOpen ? (solid ? '#f1f5f9' : 'rgba(255,255,255,0.12)') : 'transparent' }}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === 1 ? (menuOpen ? 20 : 13) : 20,
                    height: 2,
                    background: solid ? '#1e293b' : 'white',
                    transform: menuOpen
                      ? i === 0 ? 'translateY(7px) rotate(45deg)'
                        : i === 1 ? 'scaleX(0) opacity(0)'
                        : 'translateY(-7px) rotate(-45deg)'
                      : 'none',
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile / tablet menu ──────────────────────────────────── */}
      <div
        className="xl:hidden overflow-hidden"
        style={{
          maxHeight: menuOpen ? '100vh' : 0,
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 0.35s ease, opacity 0.25s ease',
        }}
      >
        <div className="bg-white" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>

          {/* Contact strip */}
          <div
            className="flex items-center gap-5 px-5 py-2.5 text-xs border-b border-slate-100"
            style={{ background: '#f8fafc', color: '#94a3b8' }}
          >
            <a
              href="tel:+15126785033"
              className="flex items-center gap-1.5 hover:text-slate-600 transition-colors"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}>
                <path d="M2.25 6.338c0 .768.107 1.51.303 2.21 1.14 4.075 4.833 7.77 8.908 8.907.7.196 1.443.303 2.21.303 2.074 0 4.012-.594 5.644-1.625M2.25 6.338C2.25 4.517 3.663 3 5.406 3h1.125c.337 0 .662.088.948.254L9.374 4.46a1.125 1.125 0 01.414 1.512L8.73 7.67a.75.75 0 00-.05.544l.052.213c.398 1.625 1.455 3.178 2.73 4.504 1.325 1.275 2.879 2.332 4.504 2.73l.213.052a.75.75 0 00.544-.05l1.696-1.057a1.125 1.125 0 011.512.414l1.207 1.9c.167.287.255.61.255.949v1.125c0 1.742-1.516 3.156-3.338 3.156"/>
              </svg>
              +1 (512) 678-5033
            </a>
            <span className="text-slate-200">|</span>
            <span>Mon–Fri 07:00–18:00 WAT</span>
          </div>

          {/* Nav items */}
          <div className="px-3 py-3">
            {NAV.map(item => {
              const active   = location.pathname === item.to
              const expanded = openMobile === item.label

              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                    style={{
                      color: active ? '#CC1500' : '#374151',
                      background: active ? 'rgba(204,21,0,0.06)' : 'transparent',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#CC1500' }} />
                    )}
                  </Link>
                )
              }

              return (
                <div key={item.label} className="mb-0.5">
                  <button
                    onClick={() => toggleMobile(item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                    style={{
                      color: expanded || active ? '#CC1500' : '#374151',
                      background: expanded ? 'rgba(204,21,0,0.06)' : 'transparent',
                    }}
                  >
                    <span>{item.label}</span>
                    <svg
                      className="w-4 h-4 shrink-0"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      style={{ transition: 'transform 0.22s', transform: expanded ? 'rotate(180deg)' : 'none', color: '#94a3b8' }}
                    >
                      <path d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  {/* Accordion body */}
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: expanded ? `${item.children!.length * 60 + 52}px` : 0,
                      transition: 'max-height 0.28s ease',
                    }}
                  >
                    <div className="mx-3 mb-2 rounded-xl overflow-hidden" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                      <Link
                        to={item.to}
                        className="flex items-center justify-between px-4 py-3 text-sm font-bold border-b border-slate-100 transition-colors"
                        style={{ color: '#CC1500', textDecoration: 'none' }}
                      >
                        <span>{item.label} Overview</span>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}><path d="M9 5l7 7-7 7"/></svg>
                      </Link>
                      {item.children!.map((child, idx) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          className="flex items-center gap-3 px-4 py-3 transition-colors"
                          style={{
                            textDecoration: 'none',
                            borderTop: idx > 0 ? '1px solid #f1f5f9' : 'none',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                        >
                          <span className="shrink-0 text-slate-400">{child.icon}</span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-700 leading-tight">{child.label}</p>
                            <p className="text-xs text-slate-400 mt-0.5 leading-tight truncate">{child.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile footer CTA */}
          <div className="px-4 pb-5 pt-1">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background: 'linear-gradient(135deg,#CC1500,#ff3a2a)', textDecoration: 'none', boxShadow: '0 4px 16px rgba(204,21,0,0.3)' }}
            >
              Get a Quote
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}><path d="M9 5l7 7-7 7"/></svg>
            </Link>
            <Link
              to="/track"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold mt-2 transition-colors"
              style={{ color: '#475569', textDecoration: 'none', background: '#f1f5f9' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
              Track Shipment
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
