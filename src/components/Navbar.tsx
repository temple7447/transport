import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Track', to: '/track' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const solid = !isHomePage || scrolled

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: solid ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: solid ? 'blur(16px)' : 'none',
        boxShadow: solid ? '0 1px 24px rgba(0,0,0,0.08)' : 'none',
        padding: solid ? '10px 0' : '18px 0',
      }}
    >
      <div className="container mx-auto px-6 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0" style={{ textDecoration: 'none' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shrink-0" style={{ background: '#F5C100' }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M1 3h14v11H1V3z" fill="white" opacity="0.95" />
              <path d="M15 7h5l3 4v3h-8V7z" fill="white" opacity="0.8" />
              <circle cx="5" cy="17" r="2.2" fill="white" />
              <circle cx="19" cy="17" r="2.2" fill="white" />
            </svg>
          </div>
          <div className="leading-none">
            <span style={{ fontWeight: 900, fontSize: '16px', letterSpacing: '-0.5px', color: solid ? '#0f172a' : 'white' }}>
              QUICK SEND
            </span>
            <span style={{ fontSize: '10px', fontWeight: 500, display: 'block', color: solid ? '#94a3b8' : 'rgba(255,255,255,0.5)' }}>
              DELIVERY
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 ml-auto">
          {NAV_LINKS.map(l => {
            const active = location.pathname === l.to
            return (
              <Link
                key={l.label}
                to={l.to}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: active
                    ? '#CC1500'
                    : solid ? '#475569' : 'rgba(255,255,255,0.8)',
                  background: active ? (solid ? '#fff5f5' : 'rgba(204,21,0,0.12)') : 'transparent',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = solid ? '#f1f5f9' : 'rgba(255,255,255,0.1)'; if (!active) e.currentTarget.style.color = solid ? '#1e293b' : 'white' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; if (!active) e.currentTarget.style.color = solid ? '#475569' : 'rgba(255,255,255,0.8)' }}
              >
                {l.label}
              </Link>
            )
          })}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3 ml-4">
          <Link to="/services" className="btn-primary py-2! px-5! text-sm!" style={{ textDecoration: 'none' }}>
            Ship Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden ml-auto p-2 flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block w-5 h-0.5 rounded transition-all duration-300"
              style={{
                background: solid ? '#1e293b' : 'white',
                transform: menuOpen
                  ? i === 0 ? 'translateY(8px) rotate(45deg)'
                    : i === 1 ? 'scaleX(0)'
                    : 'translateY(-8px) rotate(-45deg)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-xl border-t border-slate-100 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(l => (
            <Link
              key={l.label}
              to={l.to}
              className="px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              style={{ textDecoration: 'none', color: location.pathname === l.to ? '#CC1500' : '#334155' }}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-3 pt-3 border-t border-slate-100">
            <Link to="/services" className="flex-1 btn-primary py-2.5! text-sm! justify-center text-center" style={{ textDecoration: 'none' }}>Ship Now</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
