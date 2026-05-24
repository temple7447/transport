import { useState } from 'react'

export default function LiveChat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-80 overflow-hidden" style={{ animation: 'fadeInUp 0.2s ease' }}>
          {/* Header */}
          <div className="px-5 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#071426,#163166)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#F5C100' }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M1 3h14v11H1V3z" fill="white" opacity="0.95"/>
                <path d="M15 7h5l3 4v3h-8V7z" fill="white" opacity="0.8"/>
                <circle cx="5" cy="17" r="2.2" fill="white"/>
                <circle cx="19" cy="17" r="2.2" fill="white"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Quick Send Support</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-white/60 text-xs">Online now · Avg reply 2 min</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
              <p className="text-slate-700 text-sm leading-relaxed">
                👋 Hi there! How can we help you today? Choose an option below or send us a message.
              </p>
            </div>

            <div className="space-y-2.5">
              <a
                href="https://wa.me/15126785033"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all group"
                style={{ textDecoration: 'none' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#25D366' }}>
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold text-sm">WhatsApp Chat</p>
                  <p className="text-slate-400 text-xs">Instant response available</p>
                </div>
              </a>

              <a
                href="mailto:support@quicksenddelivery.com"
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                style={{ textDecoration: 'none' }}
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}>
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                  </svg>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold text-sm">Email Support</p>
                  <p className="text-slate-400 text-xs">support@quicksenddelivery.com</p>
                </div>
              </a>

              <a
                href="tel:+15126785033"
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-yellow-300 hover:bg-yellow-50 transition-all group"
                style={{ textDecoration: 'none' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#F5C100' }}>
                  <svg className="w-5 h-5 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}>
                    <path d="M2.25 6.338c0 .768.107 1.51.303 2.21 1.14 4.075 4.833 7.77 8.908 8.907.7.196 1.443.303 2.21.303 2.074 0 4.012-.594 5.644-1.625M2.25 6.338C2.25 4.517 3.663 3 5.406 3h1.125c.337 0 .662.088.948.254L9.374 4.46a1.125 1.125 0 01.414 1.512L8.73 7.67a.75.75 0 00-.05.544l.052.213c.398 1.625 1.455 3.178 2.73 4.504 1.325 1.275 2.879 2.332 4.504 2.73l.213.052a.75.75 0 00.544-.05l1.696-1.057a1.125 1.125 0 011.512.414l1.207 1.9c.167.287.255.61.255.949v1.125c0 1.742-1.516 3.156-3.338 3.156"/>
                  </svg>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold text-sm">Call Us</p>
                  <p className="text-slate-400 text-xs">Mon–Fri · 07:00–18:00 WAT</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
        style={{ background: open ? '#1e293b' : 'linear-gradient(135deg,#CC1500,#ff4444)', color: 'white' }}
        aria-label="Open support chat"
      >
        {open ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}>
            <path d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}>
            <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
          </svg>
        )}
      </button>

      {/* Pulse ring when closed */}
      {!open && (
        <span className="absolute bottom-0 right-0 w-14 h-14 rounded-full pointer-events-none" style={{ background: 'rgba(204,21,0,0.3)', animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }} />
      )}
    </div>
  )
}
