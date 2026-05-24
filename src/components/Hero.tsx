import { useState } from 'react'
import { Link } from 'react-router-dom'

const LIVE_EVENTS = [
  { city: 'New York, USA',   status: 'Delivered',        dot: '#4ade80' },
  { city: 'London, UK',      status: 'In Transit',        dot: '#60a5fa' },
  { city: 'Dubai, UAE',      status: 'Dispatched',        dot: '#F5C100' },
  { city: 'Tokyo, Japan',    status: 'Delivered',         dot: '#4ade80' },
  { city: 'Lagos, Nigeria',  status: 'Out for Delivery',  dot: '#a78bfa' },
  { city: 'Sydney, AU',      status: 'Processing',        dot: '#facc15' },
  { city: 'Paris, France',   status: 'Delivered',         dot: '#4ade80' },
  { city: 'Singapore',       status: 'In Transit',        dot: '#60a5fa' },
  { city: 'Austin, TX',      status: 'Delivered',         dot: '#4ade80' },
  { city: 'Toronto, CA',     status: 'Customs Cleared',   dot: '#34d399' },
]

export default function Hero() {
  const [trackingNum, setTrackingNum] = useState('')
  const [tracking, setTracking] = useState(false)
  const [result, setResult] = useState(false)

  const handleTrack = () => {
    if (!trackingNum.trim()) return
    setTracking(true)
    setTimeout(() => { setTracking(false); setResult(true) }, 1400)
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Cinematic full-screen background ─────────────────── */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1800&q=80"
          alt=""
          className="w-full h-full object-cover"
          style={{ animation: 'slowZoom 28s ease-in-out infinite alternate' }}
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,20,38,0.97) 0%, rgba(15,36,68,0.92) 45%, rgba(22,49,102,0.82) 100%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      {/* ── Atmospheric glow blobs ────────────────────────────── */}
      <div className="absolute top-24 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,193,0,0.14) 0%, transparent 65%)' }} />
      <div className="absolute bottom-32 left-16 w-96 h-96 rounded-full pointer-events-none animate-float-delay" style={{ background: 'radial-gradient(circle, rgba(204,21,0,0.15) 0%, transparent 65%)' }} />

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-28 sm:pt-32 pb-10 relative z-10">

        {/* Trust badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 animate-fadeInUp"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)' }}
        >
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />
            <span className="relative inline-flex rounded-full h-full w-full bg-green-400" />
          </span>
          Trusted by 15,000+ businesses across 120 countries
        </div>

        {/* Headline */}
        <h1
          className="font-black text-white text-center leading-none max-w-5xl mb-5 sm:mb-6 animate-fadeInUp px-2"
          style={{ fontSize: 'clamp(36px, 7vw, 88px)', animationDelay: '0.1s', letterSpacing: '-1px' }}
        >
          Ship Smarter,{' '}
          <span className="gradient-text-shimmer">Deliver Faster</span>
          <br className="hidden sm:block" />{' '}
          <span className="text-white/90">to Every Corner of the World</span>
        </h1>

        <p
          className="text-center max-w-2xl mb-8 sm:mb-10 leading-relaxed animate-fadeInUp px-4"
          style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(15px, 2vw, 18px)', animationDelay: '0.2s' }}
        >
          Real-time GPS tracking · Instant quotes · Insured delivery · 120+ countries.
          <br className="hidden sm:block" />
          The logistics platform built for modern businesses of every size.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 animate-fadeInUp w-full px-4" style={{ animationDelay: '0.3s' }}>
          <Link
            to="/services"
            className="btn-primary w-full sm:w-auto justify-center py-4! px-8! sm:px-9! text-sm! sm:text-base!"
            style={{ boxShadow: '0 12px 40px rgba(245,193,0,0.35)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V7" />
            </svg>
            Ship Now — It's Free
          </Link>
          <Link
            to="/track"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 sm:px-9 py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-white/10"
            style={{ color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.25)' }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            </svg>
            Track a Package
          </Link>
        </div>

        {/* Tracking Widget */}
        <div className="w-full max-w-2xl animate-fadeInUp px-0 sm:px-0" style={{ animationDelay: '0.4s' }}>
          <div
            className="rounded-2xl p-4 sm:p-6"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(20px)' }}
          >
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Quick Shipment Tracker
            </p>
            <div className="flex gap-2 sm:gap-3">
              <input
                type="text"
                placeholder="Enter tracking number (e.g. QSD-2024-987654)"
                value={trackingNum}
                onChange={e => setTrackingNum(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleTrack()}
                className="flex-1 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                onFocus={e => { e.currentTarget.style.border = '1px solid #F5C100'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
                onBlur={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              />
              <button onClick={handleTrack} disabled={tracking} className="btn-primary py-3! sm:py-3.5! px-4! sm:px-6! text-xs! sm:text-sm! shrink-0">
                {tracking
                  ? <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full inline-block" style={{ animation: 'spin 1s linear infinite' }} />
                      <span className="hidden sm:inline">Searching…</span>
                    </span>
                  : <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
                      </svg>
                      <span>Track</span>
                    </>}
              </button>
            </div>

            {result && (
              <div className="mt-4 rounded-xl p-3 sm:p-4" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" style={{ animation: 'pulse 2s infinite' }} />
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '13px' }}>In Transit — Frankfurt Hub</span>
                  <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Updated 3 min ago</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {['Picked Up', 'Sorted', 'In Transit', 'Out for Delivery', 'Delivered'].map((step, i) => (
                    <div key={step} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full" style={{ background: i <= 2 ? '#60a5fa' : 'rgba(255,255,255,0.15)', border: i <= 2 ? '2px solid #60a5fa' : '2px solid rgba(255,255,255,0.2)' }} />
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '8px', textAlign: 'center' }} className="hidden sm:block">{step}</span>
                    </div>
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }} className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                  Frankfurt → London · Estimated delivery: <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Tomorrow by 6 PM</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Live Activity Ticker ──────────────────────────────── */}
      <div className="relative z-10 py-2.5 sm:py-3 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(12px)' }}>
        <div className="flex gap-8 sm:gap-10 animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...LIVE_EVENTS, ...LIVE_EVENTS].map((ev, i) => (
            <span key={i} className="flex items-center gap-2 sm:gap-2.5 shrink-0" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ev.dot }} />
              <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{ev.city}</strong>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
              {ev.status}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(12px)' }}>
        {[
          { val: '1M+',   label: 'Packages Delivered', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg> },
          { val: '120+',  label: 'Countries Served',   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3c-2.485 0-4.5 4.03-4.5 9s2.015 9 4.5 9 4.5-4.03 4.5-9-2.015-9-4.5-9z"/></svg> },
          { val: '15K+',  label: 'Business Clients',   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg> },
          { val: '99.2%', label: 'On-Time Delivery',   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
        ].map((s, i) => (
          <div
            key={s.label}
            className="py-4 sm:py-5 px-4 sm:px-6 text-center"
            style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none', background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex justify-center mb-1 opacity-60">{s.icon}</div>
            <div style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 900, color: 'white', lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '3px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
