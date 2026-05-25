import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import Reveal from './Reveal'
import Logo from './Logo'

const YEAR = new Date().getFullYear()

const LINKS: Record<string, { label: string; href: string }[]> = {
  Company: [
    { label: 'About Us',     href: '/about' },
    { label: 'Careers',      href: '/careers' },
    { label: 'Press & Media',href: '/press' },
    { label: 'Blog',         href: '/blog' },
    { label: 'Sustainability',href: '/sustainability' },
  ],
  Services: [
    { label: 'Express Delivery',   href: '/services' },
    { label: 'Air & Ocean Freight', href: '/freight' },
    { label: 'Road Freight',       href: '/freight' },
    { label: 'Home & Office Movers',href: '/movers' },
    { label: 'Customs Clearance',  href: '/customs' },
    { label: 'Warehousing',        href: '/services' },
  ],
  Support: [
    { label: 'Help Center',  href: '/help' },
    { label: 'Track Shipment',href: '/track' },
    { label: 'Live Chat',    href: '/contact' },
    { label: 'Contact Sales',href: '/contact' },
    { label: 'System Status',href: '/help' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Cookie Policy', href: '/legal/cookies' },
    { label: 'Shipping Policy', href: '/legal/shipping' },
    { label: 'Insurance Terms', href: '/legal/insurance' },
  ],
}

const SOCIALS = [
  {
    name: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subState, setSubState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const subscribe = async () => {
    if (!email || subState === 'sending' || subState === 'sent') return
    setSubState('sending')
    try {
      await api.subscribe(email)
      setSubState('sent')
      setEmail('')
    } catch {
      setSubState('error')
      setTimeout(() => setSubState('idle'), 3500)
    }
  }

  return (
    <footer style={{ background: '#0D0840' }}>
      <div className="container mx-auto px-6 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10 mb-14">
          {/* Brand col (spans 2) */}
          <Reveal direction="left" className="lg:col-span-2">
            <div className="mb-4">
              <Logo size={38} theme="dark" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Your trusted global logistics partner. Fast, secure, and transparent shipping to 120+ countries worldwide.
            </p>
            <div className="flex gap-2 mb-6">
              {SOCIALS.map(s => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-white/50">
              <p className="flex items-start gap-2"><svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>3800 N Lamar Blvd, Suite 200, Austin, TX 78756, USA</p>
              <p className="flex items-center gap-2"><svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M2.25 6.338c0 .768.107 1.51.303 2.21 1.14 4.075 4.833 7.77 8.908 8.907.7.196 1.443.303 2.21.303 2.074 0 4.012-.594 5.644-1.625M2.25 6.338C2.25 4.517 3.663 3 5.406 3h1.125c.337 0 .662.088.948.254L9.374 4.46a1.125 1.125 0 01.414 1.512L8.73 7.67a.75.75 0 00-.05.544l.052.213c.398 1.625 1.455 3.178 2.73 4.504 1.325 1.275 2.879 2.332 4.504 2.73l.213.052a.75.75 0 00.544-.05l1.696-1.057a1.125 1.125 0 011.512.414l1.207 1.9c.167.287.255.61.255.949v1.125c0 1.742-1.516 3.156-3.338 3.156"/></svg>+1 (512) 678-5033</p>
              <p className="flex items-center gap-2"><svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>hello@accessiblexpress.com</p>
            </div>
          </Reveal>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, items], colIdx) => (
            <Reveal key={section} direction="up" delay={0.1 + colIdx * 0.08}>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{section}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-white/45 text-sm hover:text-white hover:translate-x-0.5 inline-block transition-all duration-150">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Newsletter */}
        <Reveal direction="up" delay={0.05}>
        <div className="border border-white/10 rounded-2xl p-6 mb-10 bg-white/[0.03]">
          {subState === 'sent' ? (
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0"><svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
              <div>
                <p className="text-white font-bold">You're subscribed!</p>
                <p className="text-white/50 text-sm">Thanks for joining — check your inbox for a confirmation email.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <h4 className="text-white font-bold mb-1">Stay Informed</h4>
                <p className="text-white/50 text-sm">
                  {subState === 'error'
                    ? <span style={{ color: '#CC1500' }}>Something went wrong — please try again.</span>
                    : 'Get shipping tips, industry news, and exclusive offers.'}
                </p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && subscribe()}
                  placeholder="Enter your email address"
                  className="flex-1 md:w-64 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm outline-none focus:border-yellow-400 transition-colors"
                />
                <button onClick={subscribe} disabled={subState === 'sending'} className="btn-primary py-3! px-5! text-sm! shrink-0 disabled:opacity-60">
                  {subState === 'sending'
                    ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block animate-spin" />
                    : 'Subscribe'}
                </button>
              </div>
            </div>
          )}
        </div>
        </Reveal>

        {/* Bottom bar */}
        <Reveal direction="up" delay={0.1}>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">© {YEAR} Accessiblexpress Ltd. All rights reserved.</p>
          <div className="flex gap-5 text-white/30 text-xs">
            {[
              { label: 'Privacy',  href: '/legal/privacy' },
              { label: 'Terms',    href: '/legal/terms' },
              { label: 'Cookies',  href: '/legal/cookies' },
              { label: 'Sitemap',  href: '/' },
            ].map(l => (
              <Link key={l.label} to={l.href} className="hover:text-white/60 transition-colors" style={{ textDecoration: 'none' }}>{l.label}</Link>
            ))}
          </div>
        </div>
        </Reveal>
      </div>
    </footer>
  )
}
