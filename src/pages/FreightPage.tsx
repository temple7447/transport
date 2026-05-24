import { Link } from 'react-router-dom'

const SERVICES = [
  {
    id: 'air',
    title: 'Air Freight',
    tag: 'Fastest International',
    tagColor: 'bg-blue-100 text-blue-700',
    headline: 'Global Air Cargo in 2–4 Days',
    desc: 'Access 500+ airports worldwide through our dedicated air freight network. Ideal for high-value, time-sensitive cargo. We handle all documentation, insurance, and customs clearance end-to-end.',
    features: ['500+ airports served globally', '2–4 day international transit', 'Customs documentation included', 'Dangerous goods certified', 'Temperature-controlled options', 'Charter services available'],
    img: 'https://images.pexels.com/photos/747679/pexels-photo-747679.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
    from: 'From $45/kg',
    color: 'from-blue-700 to-cyan-500',
    icon: <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}><path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>,
  },
  {
    id: 'ocean',
    title: 'Ocean Freight',
    tag: 'Best Value for Bulk',
    tagColor: 'bg-cyan-100 text-cyan-700',
    headline: 'Cost-Effective Sea Shipping Worldwide',
    desc: 'The most economical solution for large or heavy shipments. We offer both Full Container Load (FCL) and Less than Container Load (LCL) services to 300+ ports globally, with real-time container tracking.',
    features: ['300+ global ports covered', 'FCL & LCL available', '15–45 day transit times', 'Port-to-port or door-to-door', 'Hazardous cargo specialists', 'Consolidation services'],
    img: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
    from: 'From $280/CBM',
    color: 'from-cyan-700 to-blue-500',
    icon: <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}><path d="M12 3v4M3 17l2-6h14l2 6H3zM1 21h22M7 11V7a5 5 0 0110 0v4"/></svg>,
  },
  {
    id: 'road',
    title: 'Road Freight',
    tag: 'Domestic & Cross-Border',
    tagColor: 'bg-green-100 text-green-700',
    headline: 'Reliable Ground Freight Across Borders',
    desc: 'Our fleet of 2,000+ vehicles covers major trade corridors across Africa, Europe, and Asia. Full and partial truck loads, refrigerated transport, and oversize cargo — all with real-time fleet tracking.',
    features: ['2,000+ vehicle strong fleet', 'FTL & LTL options', 'Refrigerated transport available', 'Oversize load specialists', 'Cross-border customs support', 'Dedicated driver assignment'],
    img: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
    from: 'From $8/km',
    color: 'from-green-700 to-emerald-500',
    icon: <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"/><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l1 1h1m8-1V8h3l3 3v4l1 1h-1m-6 0h-3"/></svg>,
  },
  {
    id: 'soc',
    title: 'SOC Movements',
    tag: 'Shipper-Owned Containers',
    tagColor: 'bg-orange-100 text-orange-700',
    headline: 'Flexible SOC Container Solutions',
    desc: 'We manage your shipper-owned containers (SOC) across multi-leg journeys. Full visibility on container location, condition, and status — ideal for businesses with high shipping volumes needing greater control.',
    features: ['Multi-leg container tracking', 'Container leasing & purchase', 'Depot management included', 'Custom reporting dashboard', 'Priority port handling', 'Dedicated SOC coordinator'],
    img: 'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
    from: 'Custom pricing',
    color: 'from-orange-600 to-amber-500',
    icon: <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}><path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>,
  },
]

const STATS = [
  { value: '500+', label: 'Airports Served' },
  { value: '300+', label: 'Global Ports' },
  { value: '2,000+', label: 'Vehicles in Fleet' },
  { value: '85+', label: 'Countries Covered' },
]

export default function FreightPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #071426 0%, #0f2444 60%, #163166 100%)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <img src="https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(29,78,216,0.3), transparent 70%)' }} />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}>
            Freight Services
          </span>
          <h1 className="font-black text-white mb-5" style={{ fontSize: 'clamp(36px, 6vw, 62px)', lineHeight: 1.1 }}>
            Air · Ocean · Road<br />
            <span className="gradient-text">Freight Forwarding</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '580px', margin: '0 auto 36px' }}>
            End-to-end freight solutions across every mode of transport. We move your cargo safely, on time, and within budget.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary py-4! px-8! text-base!">Get Freight Quote</Link>
            <Link to="/track" className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none' }}>
              Track Shipment
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: '#F5C100' }}>
        <div className="container mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-black text-2xl md:text-3xl text-slate-900">{s.value}</p>
              <p className="text-sm font-semibold text-slate-700">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-slate-800 mb-4">Our Freight Services</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Choose the right freight mode for your cargo type, timeline, and budget.</p>
          </div>
          <div className="space-y-8">
            {SERVICES.map((svc, idx) => (
              <div key={svc.id} id={svc.id} className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 grid lg:grid-cols-2 ${idx % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`relative h-64 lg:h-auto ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <img src={svc.img} alt={svc.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-linear-to-br ${svc.color} opacity-70`} />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                    <span className="mb-3">{svc.icon}</span>
                    <p className="text-white font-black text-3xl">{svc.title}</p>
                    <p className="text-white/70 text-sm mt-1">{svc.from}</p>
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
                  <div className="flex gap-3">
                    <Link to="/contact" className="btn-primary">Get Quote</Link>
                    <Link to="/contact" className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors" style={{ textDecoration: 'none' }}>Enquire</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why choose us for freight */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-800 mb-4">Why Ship Freight with Us?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">We've moved millions of tonnes of cargo across six continents. Here's what sets us apart.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🌍', title: 'Global Agent Network', desc: 'Partnerships with 400+ freight agents in 85 countries ensure your cargo is handled locally with a global standard.' },
              { icon: '📡', title: 'Real-Time Visibility', desc: 'Track every container, truck, or air shipment in real time through our portal — 24 hours a day, 7 days a week.' },
              { icon: '📋', title: 'Full Documentation', desc: 'We handle all freight documentation — bills of lading, airway bills, certificates of origin, and customs filings.' },
              { icon: '🔒', title: 'Cargo Insurance', desc: 'All freight is covered by our comprehensive cargo insurance. We handle claims directly so you don\'t have to.' },
              { icon: '⚡', title: 'Express Options', desc: 'Need it there fast? Our priority freight lanes guarantee faster transit with dedicated handling at every hub.' },
              { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden fees. You get a full cost breakdown — freight, duties, port fees, and handling — before you commit.' },
            ].map(item => (
              <div key={item.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #071426, #163166)' }}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Move Your Cargo?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">Get a competitive freight quote in minutes. Our team is ready to find the best route and rate for your shipment.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary py-4! px-9!">Request a Quote</Link>
            <Link to="/track" className="px-9 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors" style={{ textDecoration: 'none' }}>Track Existing Shipment</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
