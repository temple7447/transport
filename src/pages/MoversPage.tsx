import { Link } from 'react-router-dom'

const SERVICES = [
  {
    id: 'household',
    title: 'Household Relocation',
    tag: 'Home Moving',
    tagColor: 'bg-purple-100 text-purple-700',
    headline: 'Move Your Home, Stress-Free',
    desc: 'From studio apartments to large family homes — we handle every step. Our trained moving crews carefully pack, load, transport, and unpack your belongings with the care they deserve.',
    features: ['Full & partial packing service', 'Furniture disassembly & reassembly', 'Specialty item handling (pianos, art, antiques)', 'Climate-controlled vehicles', 'Comprehensive home contents insurance', 'Flexible scheduling including weekends'],
    img: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
    color: 'from-yellow-400 to-red-600',
    icon: <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}><path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>,
  },
  {
    id: 'commercial',
    title: 'Commercial & Office Moving',
    tag: 'Business Relocation',
    tagColor: 'bg-yellow-100 text-yellow-800',
    headline: 'Minimal Downtime, Maximum Efficiency',
    desc: 'We understand that time is money. Our commercial moving team plans and executes office and business relocations outside business hours to minimise disruption. From desks to server rooms — handled.',
    features: ['After-hours & weekend moves', 'IT equipment specialist crew', 'Labelled box system for easy setup', 'Secure document handling', 'Storage solutions if needed', 'Dedicated project coordinator'],
    img: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
    color: 'from-red-600 to-yellow-400',
    icon: <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}><path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg>,
  },
  {
    id: 'international',
    title: 'International Relocation',
    tag: 'Cross-Border Moves',
    tagColor: 'bg-yellow-100 text-yellow-800',
    headline: 'Relocating Abroad Made Simple',
    desc: 'Moving to another country involves more than just transport. We manage the entire international relocation — from pre-move surveys and customs paperwork to delivery and unpacking at your new home abroad.',
    features: ['Pre-move home survey', 'International customs clearance', 'Export & import documentation', 'Door-to-door delivery worldwide', 'Temporary storage at destination', 'Settling-in support coordination'],
    img: 'https://images.pexels.com/photos/5025521/pexels-photo-5025521.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
    color: 'from-yellow-400 to-red-600',
    icon: <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}><path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>,
  },
  {
    id: 'storage',
    title: 'Storage & Packing',
    tag: 'Flexible Solutions',
    tagColor: 'bg-red-100 text-red-700',
    headline: 'Safe Storage When You Need It',
    desc: 'Need to store belongings between moves? Our secure, climate-controlled storage facilities are available short or long-term. We also offer professional packing materials and crews for a worry-free move.',
    features: ['Climate-controlled storage units', 'Short & long-term options', '24/7 CCTV & security', 'Professional packing materials', 'Fragile item wrapping', 'Easy access to your stored items'],
    img: 'https://images.pexels.com/photos/4246019/pexels-photo-4246019.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
    color: 'from-yellow-400 to-red-600',
    icon: <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}><path d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg>,
  },
]

const STEPS = [
  { num: '01', title: 'Book a Survey', desc: 'Request a free home or office survey. Our team will assess your move and give you a detailed, no-obligation quote.' },
  { num: '02', title: 'Plan Your Move', desc: 'We create a custom moving plan — timeline, crew size, packing strategy, and route — tailored to your needs.' },
  { num: '03', title: 'Pack & Load', desc: 'Our trained crew arrives on moving day, carefully packs everything, and loads it onto our secure vehicles.' },
  { num: '04', title: 'Delivery & Setup', desc: 'We deliver your items to the new location and can unpack and reassemble furniture so you\'re ready immediately.' },
]

export default function MoversPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #050e1d 0%, #071426 60%, #0e1e3c 100%)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <img src="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute top-10 left-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(204,21,0,0.25), transparent 70%)' }} />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}>
            Moving Services
          </span>
          <h1 className="font-black text-white mb-5" style={{ fontSize: 'clamp(36px, 6vw, 62px)', lineHeight: 1.1 }}>
            We Move What<br />
            <span style={{ color: '#F5C100' }}>Matters Most to You</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '580px', margin: '0 auto 36px' }}>
            Household, commercial, and international relocation — handled with care, precision, and zero stress from your end.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary py-4! px-8! text-base!">Book a Free Survey</Link>
            <Link to="/contact" className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none' }}>
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 py-5 flex flex-wrap justify-center gap-8 text-sm text-slate-500">
          {['✅ Fully insured moves', '🔒 Secure storage', '📦 Professional packing', '🌍 International relocation', '📞 Dedicated coordinator'].map(item => (
            <span key={item} className="font-medium">{item}</span>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-slate-800 mb-4">How Your Move Works</h2>
            <p className="text-slate-500 max-w-xl mx-auto">A simple, transparent process designed around you — from first contact to final placement.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-slate-200 z-0" style={{ width: 'calc(100% - 2rem)', left: 'calc(50% + 2rem)' }} />
                )}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative z-10 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-xl" style={{ background: 'linear-gradient(135deg,#F5C100,#CC1500)', color: 'white' }}>
                    {step.num}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-slate-800 mb-4">Moving Services</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Whatever your moving need, we have a solution tailored to fit.</p>
          </div>
          <div className="space-y-8">
            {SERVICES.map((svc, idx) => (
              <div key={svc.id} id={svc.id} className={`bg-slate-50 rounded-3xl overflow-hidden shadow-sm border border-slate-100 grid lg:grid-cols-2 ${idx % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`relative h-64 lg:h-auto ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <img src={svc.img} alt={svc.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-linear-to-br ${svc.color} opacity-70`} />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                    <span className="mb-3">{svc.icon}</span>
                    <p className="text-white font-black text-3xl">{svc.title}</p>
                  </div>
                </div>
                <div className={`p-8 md:p-10 flex flex-col justify-center ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${svc.tagColor} inline-flex w-fit mb-4`}>{svc.tag}</span>
                  <h2 className="text-2xl font-black text-slate-800 mb-3">{svc.headline}</h2>
                  <p className="text-slate-500 leading-relaxed mb-6">{svc.desc}</p>
                  <ul className="space-y-2.5 mb-8">
                    {svc.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-slate-600 text-sm">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-primary w-fit">Book This Service</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 text-center" style={{ background: 'linear-gradient(135deg,#050e1d,#071426)' }}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Plan Your Move?</h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>Book a free, no-obligation home or office survey today and we'll give you a transparent quote within 24 hours.</p>
          <Link to="/contact" className="btn-primary py-4! px-9! text-base!">Book Free Survey</Link>
        </div>
      </div>
    </div>
  )
}
