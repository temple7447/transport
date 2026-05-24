import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ── Carousel slides ─────────────────────────────────────────── */
const SLIDES = [
  {
    badge: 'Trusted by 15,000+ businesses · 120 countries · Rated 4.9★',
    line1: 'Ship Smarter,',
    line2: 'Deliver Faster',
    line3: 'to Every Corner of the World',
    desc: 'Real-time GPS tracking · Instant quotes · Insured delivery · 120+ countries. The logistics platform built for modern businesses of every size.',
    accent: '#F5C100',
  },
  {
    badge: 'Air · Sea · Ground — Fully Integrated',
    line1: 'Air Freight.',
    line2: 'Sea Cargo.',
    line3: 'Express Ground. One Platform.',
    desc: 'Access 500+ airports, 300+ ports, and 2,000+ vehicles worldwide. Every mode of transport, every route, under one roof.',
    accent: '#60a5fa',
  },
  {
    badge: '99.2% on-time delivery rate · 1,000,000+ packages delivered',
    line1: 'Your Packages.',
    line2: 'Our Obsession.',
    line3: 'Delivered with Precision, Every Time.',
    desc: 'Track every scan, every flight, every handoff in real time — from pickup to your doorstep. Complete transparency, always.',
    accent: '#4ade80',
  },
]

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

/* ── Animated world route lines ──────────────────────────────── */
function RouteLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.45 }}
    >
      <defs>
        <filter id="rGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Lagos → London */}
      <path id="r1" d="M 260 540 Q 520 70 740 195" fill="none" stroke="#F5C100" strokeWidth="1.4" strokeDasharray="6 5" filter="url(#rGlow)" style={{ animation: 'routeDash 7s linear infinite' }}/>
      <circle r="5.5" fill="#F5C100" filter="url(#rGlow)">
        <animateMotion dur="7s" repeatCount="indefinite" begin="0s"><mpath href="#r1"/></animateMotion>
      </circle>

      {/* Singapore → Dubai */}
      <path id="r2" d="M 1200 415 Q 980 90 760 275" fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="5 7" filter="url(#rGlow)" style={{ animation: 'routeDash 10s linear infinite', animationDelay: '-3s' }}/>
      <circle r="4.5" fill="#60a5fa" filter="url(#rGlow)">
        <animateMotion dur="10s" repeatCount="indefinite" begin="-3s"><mpath href="#r2"/></animateMotion>
      </circle>

      {/* New York → Frankfurt */}
      <path id="r3" d="M 85 355 Q 430 55 760 195" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 8" filter="url(#rGlow)" style={{ animation: 'routeDash 13s linear infinite', animationDelay: '-5s' }}/>
      <circle r="4" fill="#a78bfa" filter="url(#rGlow)">
        <animateMotion dur="13s" repeatCount="indefinite" begin="-5s"><mpath href="#r3"/></animateMotion>
      </circle>

      {/* Tokyo → Dubai */}
      <path id="r4" d="M 1390 295 Q 1110 540 910 380" fill="none" stroke="#4ade80" strokeWidth="0.9" strokeDasharray="3 9" filter="url(#rGlow)" style={{ animation: 'routeDash 9s linear infinite', animationDelay: '-2s' }}/>
      <circle r="3.5" fill="#4ade80" filter="url(#rGlow)">
        <animateMotion dur="9s" repeatCount="indefinite" begin="-2s"><mpath href="#r4"/></animateMotion>
      </circle>

      {/* Accra → Amsterdam */}
      <path id="r5" d="M 310 560 Q 500 200 680 155" fill="none" stroke="#fb923c" strokeWidth="0.8" strokeDasharray="4 10" filter="url(#rGlow)" style={{ animation: 'routeDash 11s linear infinite', animationDelay: '-7s' }}/>
      <circle r="3" fill="#fb923c" filter="url(#rGlow)">
        <animateMotion dur="11s" repeatCount="indefinite" begin="-7s"><mpath href="#r5"/></animateMotion>
      </circle>

      {/* City pulse dots */}
      {/* Lagos */}
      <circle cx="260" cy="540" r="4" fill="#F5C100">
        <animate attributeName="r" values="4;9;4" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.25;1" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="260" cy="540" fill="none" stroke="#F5C100" strokeWidth="1.2">
        <animate attributeName="r" values="7;22;7" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.55;0;0.55" dur="2.5s" repeatCount="indefinite"/>
      </circle>

      {/* London/Frankfurt */}
      <circle cx="740" cy="195" r="4" fill="#F5C100">
        <animate attributeName="r" values="4;9;4" dur="2.5s" repeatCount="indefinite" begin="0.8s"/>
        <animate attributeName="opacity" values="1;0.25;1" dur="2.5s" repeatCount="indefinite" begin="0.8s"/>
      </circle>
      <circle cx="740" cy="195" fill="none" stroke="#F5C100" strokeWidth="1.2">
        <animate attributeName="r" values="7;22;7" dur="2.5s" repeatCount="indefinite" begin="0.8s"/>
        <animate attributeName="opacity" values="0.55;0;0.55" dur="2.5s" repeatCount="indefinite" begin="0.8s"/>
      </circle>

      {/* Singapore */}
      <circle cx="1200" cy="415" r="3.5" fill="#60a5fa">
        <animate attributeName="r" values="3.5;8;3.5" dur="3s" repeatCount="indefinite" begin="1.2s"/>
        <animate attributeName="opacity" values="1;0.25;1" dur="3s" repeatCount="indefinite" begin="1.2s"/>
      </circle>
      <circle cx="1200" cy="415" fill="none" stroke="#60a5fa" strokeWidth="1">
        <animate attributeName="r" values="6;18;6" dur="3s" repeatCount="indefinite" begin="1.2s"/>
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" begin="1.2s"/>
      </circle>

      {/* New York */}
      <circle cx="85" cy="355" r="3.5" fill="#a78bfa">
        <animate attributeName="r" values="3.5;7;3.5" dur="2.8s" repeatCount="indefinite" begin="0.5s"/>
        <animate attributeName="opacity" values="1;0.25;1" dur="2.8s" repeatCount="indefinite" begin="0.5s"/>
      </circle>

      {/* Dubai */}
      <circle cx="760" cy="275" r="4" fill="#60a5fa">
        <animate attributeName="r" values="4;9;4" dur="2s" repeatCount="indefinite" begin="1.5s"/>
        <animate attributeName="opacity" values="1;0.25;1" dur="2s" repeatCount="indefinite" begin="1.5s"/>
      </circle>

      {/* Tokyo */}
      <circle cx="1390" cy="295" r="3" fill="#4ade80">
        <animate attributeName="r" values="3;6;3" dur="3.2s" repeatCount="indefinite" begin="0.3s"/>
        <animate attributeName="opacity" values="1;0.3;1" dur="3.2s" repeatCount="indefinite" begin="0.3s"/>
      </circle>
    </svg>
  )
}

/* ── Plane silhouette ─────────────────────────────────────────── */
function Plane({ size, glow, opacity }: { size: number; glow: string; opacity: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="white"
      style={{ opacity, filter: `drop-shadow(0 0 ${size / 7}px ${glow})` }}
    >
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"/>
    </svg>
  )
}

/* ── Hero ────────────────────────────────────────────────────── */
export default function Hero() {
  const [slide, setSlide] = useState(0)
  const [progress, setProgress] = useState(0)
  const [trackingNum, setTrackingNum] = useState('')
  const [tracking, setTracking] = useState(false)
  const [result, setResult] = useState(false)
  const itvRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const tmrRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = (i: number) => { setSlide(i); setProgress(0) }

  useEffect(() => {
    setProgress(0)
    if (itvRef.current) clearInterval(itvRef.current)
    if (tmrRef.current) clearTimeout(tmrRef.current)
    itvRef.current = setInterval(() => setProgress(p => Math.min(p + 1, 100)), 60)
    tmrRef.current = setTimeout(() => setSlide(s => (s + 1) % SLIDES.length), 6000)
    return () => {
      if (itvRef.current) clearInterval(itvRef.current)
      if (tmrRef.current) clearTimeout(tmrRef.current)
    }
  }, [slide])

  const handleTrack = () => {
    if (!trackingNum.trim()) return
    setTracking(true)
    setTimeout(() => { setTracking(false); setResult(true) }, 1400)
  }

  const s = SLIDES[slide]

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Video background ─────────────────────────────── */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1920"
        >
          <source src="https://videos.pexels.com/video-files/854745/854745-hd_1920_1080_25fps.mp4" type="video/mp4"/>
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,20,38,0.97) 0%, rgba(15,36,68,0.91) 42%, rgba(22,49,102,0.82) 100%)', zIndex: 2 }}/>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', zIndex: 2 }}/>
      </div>

      {/* ── Route lines ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        <RouteLines />
      </div>

      {/* ── Flying planes ────────────────────────────────── */}
      <div className="absolute pointer-events-none" style={{ bottom: '30%', left: '-90px', zIndex: 9, animation: 'flyPlane 20s ease-in-out infinite', animationDelay: '2s' }}>
        <div style={{ transform: 'rotate(-14deg)' }}>
          <Plane size={70} glow="rgba(245,193,0,0.8)" opacity={0.85} />
        </div>
      </div>
      <div className="absolute pointer-events-none" style={{ bottom: '55%', left: '-55px', zIndex: 9, animation: 'flyPlane 28s ease-in-out infinite', animationDelay: '11s' }}>
        <div style={{ transform: 'rotate(-9deg)' }}>
          <Plane size={42} glow="rgba(96,165,250,0.7)" opacity={0.55} />
        </div>
      </div>
      {/* Slow high-altitude plane (top) */}
      <div className="absolute pointer-events-none" style={{ top: '15%', left: '-40px', zIndex: 9, animation: 'flyPlane 35s linear infinite', animationDelay: '5s' }}>
        <div style={{ transform: 'rotate(-5deg)' }}>
          <Plane size={30} glow="rgba(167,139,250,0.6)" opacity={0.4} />
        </div>
      </div>

      {/* ── Glow blobs ───────────────────────────────────── */}
      <div
        className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-1000"
        style={{ background: `radial-gradient(circle, ${s.accent}20 0%, transparent 65%)`, zIndex: 4 }}
      />
      <div className="absolute bottom-28 left-10 w-80 h-80 rounded-full pointer-events-none animate-float-delay"
        style={{ background: 'radial-gradient(circle, rgba(204,21,0,0.13) 0%, transparent 65%)', zIndex: 4 }}/>

      {/* ── Floating shipment cards (≥1536px only) ───────── */}
      <div className="absolute left-7 top-1/2 -translate-y-1/2 hidden 2xl:block pointer-events-none animate-float" style={{ zIndex: 12 }}>
        <div className="glass-card rounded-2xl px-4 py-3.5 w-54 shadow-2xl" style={{ width: '212px' }}>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" style={{ animation: 'ping 1.5s infinite' }}/>
              <span className="relative inline-flex rounded-full h-full w-full bg-green-400"/>
            </span>
            <span className="text-white font-bold text-xs">Just Delivered</span>
            <span className="ml-auto text-white/40 text-[10px]">2m ago</span>
          </div>
          <p className="text-white/65 text-xs">Lagos <span className="text-white/30 mx-0.5">→</span> London</p>
          <p className="text-green-400 font-semibold text-[11px] mt-0.5">QSD-2024-987654</p>
          <div className="flex gap-1 mt-2.5">
            {[1,1,1,1,1].map((_, i) => <div key={i} className="flex-1 h-1 rounded-full bg-green-400"/>)}
          </div>
        </div>
      </div>

      <div className="absolute right-7 top-1/2 -translate-y-4 hidden 2xl:block pointer-events-none animate-float-delay" style={{ zIndex: 12 }}>
        <div className="glass-card rounded-2xl px-4 py-3.5 shadow-2xl" style={{ width: '212px' }}>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" style={{ animation: 'pulse 2s infinite' }}/>
            <span className="text-white font-bold text-xs">In Transit</span>
            <span className="ml-auto text-white/40 text-[10px]">Live</span>
          </div>
          <p className="text-white/65 text-xs">Dubai <span className="text-white/30 mx-0.5">→</span> Singapore</p>
          <p className="text-blue-400 font-semibold text-[11px] mt-0.5">QSD-2024-112233</p>
          <div className="flex gap-1 mt-2.5">
            {[1,1,1,0,0].map((f, i) => <div key={i} className={`flex-1 h-1 rounded-full ${f ? 'bg-blue-400' : 'bg-white/15'}`}/>)}
          </div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-28 sm:pt-32 pb-8 relative z-20">

        {/* Trust badge */}
        <div
          key={`badge-${slide}`}
          className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 animate-fadeInUp"
          style={{ background: 'rgba(255,255,255,0.08)', border: `1px solid ${s.accent}55`, color: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)' }}
        >
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }}/>
            <span className="relative inline-flex rounded-full h-full w-full bg-green-400"/>
          </span>
          {s.badge}
        </div>

        {/* Headline */}
        <h1
          key={`h1-${slide}`}
          className="font-black text-white text-center leading-none max-w-5xl mb-5 sm:mb-6 animate-fadeInUp px-2"
          style={{ fontSize: 'clamp(34px, 6.5vw, 84px)', animationDelay: '0.07s', letterSpacing: '-1px' }}
        >
          {s.line1}{' '}
          <span className="gradient-text-shimmer">{s.line2}</span>
          <br className="hidden sm:block" />{' '}
          <span style={{ color: 'rgba(255,255,255,0.82)' }}>{s.line3}</span>
        </h1>

        <p
          key={`desc-${slide}`}
          className="text-center max-w-2xl mb-8 sm:mb-9 leading-relaxed animate-fadeInUp px-4"
          style={{ color: 'rgba(255,255,255,0.58)', fontSize: 'clamp(14px, 1.8vw, 17px)', animationDelay: '0.13s' }}
        >
          {s.desc}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 animate-fadeInUp w-full px-4" style={{ animationDelay: '0.19s' }}>
          <Link
            to="/services"
            className="btn-primary w-full sm:w-auto justify-center py-4! px-8! sm:px-9! text-sm! sm:text-base!"
            style={{ boxShadow: '0 12px 40px rgba(245,193,0,0.35)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V7"/>
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

        {/* Carousel progress dots */}
        <div className="flex items-center gap-2.5 mb-8 animate-fadeInUp" style={{ animationDelay: '0.23s' }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative overflow-hidden rounded-full transition-all duration-500 cursor-pointer"
              style={{
                width: i === slide ? '44px' : '8px',
                height: '8px',
                background: 'rgba(255,255,255,0.22)',
              }}
            >
              {i === slide && (
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${progress}%`, background: s.accent, transition: 'width 0.06s linear' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tracking widget */}
        <div className="w-full max-w-2xl animate-fadeInUp" style={{ animationDelay: '0.29s' }}>
          <div className="rounded-2xl p-4 sm:p-6" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', backdropFilter: 'blur(20px)' }}>
            <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
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
                onFocus={e => { e.currentTarget.style.border = `1px solid ${s.accent}`; e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
                onBlur={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              />
              <button onClick={handleTrack} disabled={tracking} className="btn-primary py-3! sm:py-3.5! px-4! sm:px-6! text-xs! sm:text-sm! shrink-0">
                {tracking
                  ? <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full inline-block" style={{ animation: 'spin 1s linear infinite' }}/>
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
              <div className="mt-4 rounded-xl p-3 sm:p-4 animate-fadeInUp" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" style={{ animation: 'pulse 2s infinite' }}/>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '13px' }}>In Transit — Frankfurt Hub</span>
                  <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Updated 3 min ago</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {['Picked Up', 'Sorted', 'In Transit', 'Out for Delivery', 'Delivered'].map((step, i) => (
                    <div key={step} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full" style={{ background: i <= 2 ? '#60a5fa' : 'rgba(255,255,255,0.15)', border: i <= 2 ? '2px solid #60a5fa' : '2px solid rgba(255,255,255,0.2)' }}/>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '8px', textAlign: 'center' }} className="hidden sm:block">{step}</span>
                    </div>
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }} className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                    <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                  </svg>
                  Frankfurt → London · Estimated delivery: <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Tomorrow by 6 PM</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Live Activity Ticker ──────────────────────────── */}
      <div className="relative z-20 py-2.5 sm:py-3 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(12px)' }}>
        <div className="flex gap-8 sm:gap-10 animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...LIVE_EVENTS, ...LIVE_EVENTS].map((ev, i) => (
            <span key={i} className="flex items-center gap-2 sm:gap-2.5 shrink-0" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ev.dot }}/>
              <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{ev.city}</strong>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
              {ev.status}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats strip ──────────────────────────────────── */}
      <div className="relative z-20 grid grid-cols-2 sm:grid-cols-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(12px)' }}>
        {[
          { val: '1M+',   label: 'Packages Delivered', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg> },
          { val: '120+',  label: 'Countries Served',   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3c-2.485 0-4.5 4.03-4.5 9s2.015 9 4.5 9 4.5-4.03 4.5-9-2.015-9-4.5-9z"/></svg> },
          { val: '15K+',  label: 'Business Clients',   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg> },
          { val: '99.2%', label: 'On-Time Delivery',   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
        ].map((st, i) => (
          <div
            key={st.label}
            className="py-4 sm:py-5 px-4 sm:px-6 text-center"
            style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none', background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex justify-center mb-1 opacity-60">{st.icon}</div>
            <div style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 900, color: 'white', lineHeight: 1 }}>{st.val}</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '3px' }}>{st.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
