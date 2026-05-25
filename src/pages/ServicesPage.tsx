import { Link } from 'react-router-dom'

const SvcIcon = ({ path, w = 'w-11 h-11' }: { path: string | string[]; w?: string }) => (
  <svg className={`${w} text-white drop-shadow`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
    {(Array.isArray(path) ? path : [path]).map((d, i) => <path key={i} d={d} />)}
  </svg>
)

const SERVICES = [
  {
    id: 'express',
    title: 'Express Delivery',
    tag: 'Most Popular',
    tagColor: 'bg-yellow-100 text-yellow-700',
    headline: 'Same-Day & Next-Day Delivery',
    desc: 'When speed is everything, our Express service guarantees your package arrives the same day (domestic) or next business day (international). Real-time GPS tracking every step of the way.',
    features: ['Same-day pickup within 2 hours', 'Next-day international delivery', 'SMS + email notifications', 'Proof of delivery photo', 'Up to 70kg per parcel'],
    img: 'https://images.pexels.com/photos/4246019/pexels-photo-4246019.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    from: '$12',
    color: 'from-yellow-400 to-red-600',
    icon: <SvcIcon path="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
  },
  {
    id: 'air',
    title: 'Air Freight',
    tag: 'Fast International',
    tagColor: 'bg-yellow-100 text-yellow-800',
    headline: 'Global Air Cargo in 2–4 Days',
    desc: 'Access 500+ airports worldwide with our dedicated air freight network. Ideal for high-value, time-sensitive cargo. We handle all documentation and customs clearance.',
    features: ['500+ airports served', '2–4 day international transit', 'Customs documentation included', 'Dangerous goods certified', 'Temperature-controlled options'],
    img: 'https://images.pexels.com/photos/747679/pexels-photo-747679.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    from: '$45',
    color: 'from-red-600 to-yellow-400',
    icon: <SvcIcon path="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />,
  },
  {
    id: 'sea',
    title: 'Sea Freight',
    tag: 'Best Value',
    tagColor: 'bg-yellow-100 text-yellow-800',
    headline: 'Cost-Effective Ocean Freight',
    desc: 'The most economical solution for large or heavy shipments. We offer both Full Container Load (FCL) and Less than Container Load (LCL) to 300+ ports globally.',
    features: ['300+ global ports', 'FCL & LCL options', '15–45 day transit times', 'Port-to-port or door-to-door', 'Bulk cargo specialists'],
    img: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    from: '$280',
    color: 'from-yellow-400 to-red-600',
    icon: <SvcIcon path={['M12 3v4', 'M3 17l2-6h14l2 6H3z', 'M1 21h22', 'M7 11V7a5 5 0 0110 0v4']} />,
  },
  {
    id: 'road',
    title: 'Road Transport',
    tag: 'Domestic & Cross-Border',
    tagColor: 'bg-yellow-100 text-yellow-800',
    headline: 'Reliable Ground Logistics',
    desc: 'Our fleet of 2,000+ vehicles covers major trade routes across Africa, Europe, and Asia. Door-to-door delivery with full cargo tracking and dedicated drivers.',
    features: ['2,000+ vehicle fleet', 'Refrigerated transport available', 'Oversize load specialists', 'Cross-border customs support', 'Real-time fleet tracking'],
    img: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    from: '$8',
    color: 'from-red-600 to-yellow-400',
    icon: <SvcIcon path={['M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z', 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l1 1h1m8-1V8h3l3 3v4l1 1h-1m-6 0h-3']} />,
  },
  {
    id: 'warehouse',
    title: 'Warehousing & Fulfillment',
    tag: 'Storage Solutions',
    tagColor: 'bg-red-100 text-red-700',
    headline: 'Smart Warehouse Management',
    desc: 'Secure, climate-controlled warehouses in 50+ strategic locations. Store inventory close to your customers, fulfil orders same-day, and scale without limits.',
    features: ['50+ warehouse locations', 'Climate-controlled facilities', 'Pick, pack & ship services', 'Inventory management portal', 'Returns processing included'],
    img: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    from: '$0.40/day',
    color: 'from-yellow-400 to-red-600',
    icon: <SvcIcon path={['M3 9.5L12 3l9 6.5V21H3V9.5z', 'M9 21V12h6v9']} />,
  },
  {
    id: 'customs',
    title: 'Customs Clearance',
    tag: 'Compliance Guaranteed',
    tagColor: 'bg-red-100 text-red-700',
    headline: 'Hassle-Free Import & Export',
    desc: 'Our licensed customs brokers handle all paperwork, duties, taxes, and compliance requirements. We guarantee clearance within 24 hours at supported border points.',
    features: ['Licensed customs brokers', '24-hour clearance guarantee', 'Duty & tax calculation', 'HS code classification', 'Import/export permits'],
    img: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    from: '$35',
    color: 'from-red-600 to-yellow-400',
    icon: <SvcIcon path="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #080530 0%, #18106A 100%)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <img src="https://images.pexels.com/photos/4483942/pexels-photo-4483942.jpeg?auto=compress&cs=tinysrgb&w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}>
            Our Services
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5" style={{ lineHeight: 1.1 }}>
            Every Shipping Need,<br />
            <span className="gradient-text">One Platform</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 36px' }}>
            From a single parcel to a full container — we have the service, the network, and the expertise.
          </p>
          <Link to="/contact" className="btn-primary py-4! px-9! text-base!">Get a Free Quote</Link>
        </div>
      </div>

      {/* Services */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 space-y-8">
          {SERVICES.map((svc, idx) => (
            <div key={svc.id} id={svc.id} className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 grid lg:grid-cols-2 ${idx % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Image */}
              <div className={`relative h-64 lg:h-auto ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <img src={svc.img} alt={svc.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-linear-to-br ${svc.color} opacity-60`} />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                  <span className="mb-3">{svc.icon}</span>
                  <p className="text-white font-black text-3xl">{svc.title}</p>
                  <p className="text-white/70 text-sm mt-1">Starting from <strong className="text-white">{svc.from}</strong></p>
                </div>
              </div>
              {/* Content */}
              <div className={`p-8 md:p-10 flex flex-col justify-center ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${svc.tagColor} inline-flex w-fit mb-4`}>{svc.tag}</span>
                <h2 className="text-2xl font-black text-slate-800 mb-3">{svc.headline}</h2>
                <p className="text-slate-500 leading-relaxed mb-6">{svc.desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {svc.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-slate-600 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Link to="/contact" className="btn-primary">Get Quote</Link>
                  <Link to="/contact" className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors" style={{ textDecoration: 'none' }}>Learn More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-16 bg-white text-center">
        <h2 className="text-3xl font-black text-slate-800 mb-4">Not sure which service you need?</h2>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">Our logistics experts will recommend the best solution for your cargo type, timeline, and budget — completely free.</p>
        <Link to="/contact" className="btn-primary py-4! px-9!">Talk to an Expert</Link>
      </div>
    </div>
  )
}
