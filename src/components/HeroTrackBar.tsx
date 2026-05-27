import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HeroTrackBar() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = value.trim()
    if (q) navigate(`/track?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="flex flex-col md:flex-row">

      {/* Left — tracking input */}
      <div className="flex-1" style={{ background: '#1565C0' }}>
        <form onSubmit={submit} className="flex flex-col md:flex-row items-stretch w-full">
          {/* Input — full width */}
          <div className="flex-1 relative">
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            >
              <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
            </svg>
            <input
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Enter Your Tracking Number"
              aria-label="Shipment tracking number"
              className="w-full pl-12 pr-4 text-sm font-medium outline-none"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                caretColor: '#FF9800',
                height: 64,
              }}
            />
          </div>
          {/* Button — next line on mobile, flush right on desktop */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-8 py-4 md:py-0 text-sm font-bold transition-all duration-150 whitespace-nowrap"
            style={{ background: '#FF9800', color: '#1F2937' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E68900' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FF9800' }}
          >
            Track &amp; Trace
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}>
              <path d="M9 5l7 7-7 7"/>
              <path d="M16 12H4"/>
            </svg>
          </button>
        </form>
      </div>

      {/* Right — value props */}
      <div
        className="flex items-stretch divide-x divide-white/20 md:w-auto"
        style={{ background: '#1565C0' }}
      >
        {[
          {
            icon: (
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}>
                <circle cx="12" cy="12" r="9"/>
                <path d="M14.5 9a2.5 2.5 0 00-5 0v1.5a2.5 2.5 0 005 0"/>
                <path d="M12 14v3m0 0H9.5m2.5 0H14.5"/>
              </svg>
            ),
            label: 'Affordable Premium\nShipping!',
          },
          {
            icon: (
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}>
                <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
              </svg>
            ),
            label: 'Safe & Reliable\nCourier Services!',
          },
        ].map(item => (
          <div
            key={item.label}
            className="flex items-center gap-3 px-7 py-5"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <span style={{ color: 'white', opacity: 0.9 }}>{item.icon}</span>
            <p className="text-white font-bold text-sm leading-snug whitespace-pre-line">{item.label}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
