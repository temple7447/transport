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
      <div className="flex-1 flex items-center gap-3 px-6 py-5 md:px-10" style={{ background: '#0D0840' }}>
        <form onSubmit={submit} className="flex items-center gap-3 w-full">
          <div className="flex-1 relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: 'rgba(255,255,255,0.35)' }}
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
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                caretColor: '#F5C100',
              }}
              onFocus={e => { e.currentTarget.style.border = '1px solid rgba(245,193,0,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onBlur={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
            />
          </div>
          <button
            type="submit"
            className="shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-150 whitespace-nowrap"
            style={{ background: '#F5C100', color: '#0D0840', boxShadow: '0 2px 12px rgba(245,193,0,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#D4A800' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F5C100' }}
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
        style={{ background: '#CC1500' }}
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
