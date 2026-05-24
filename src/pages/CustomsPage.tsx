import { Link } from 'react-router-dom'

const SERVICES = [
  {
    id: 'import',
    title: 'Import Clearance',
    tag: 'Inbound Goods',
    tagColor: 'bg-blue-100 text-blue-700',
    headline: 'Fast, Compliant Import Processing',
    desc: 'Our licensed customs brokers manage the full import clearance process — classification, duty calculation, entry filing, and release — so your goods clear customs without delays or penalties.',
    features: ['HS code classification', 'Duty & VAT calculation', 'Entry filing & bond management', 'Examination coordination', 'Delivery order processing', '24-hour clearance at key ports'],
    img: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
    color: 'from-blue-700 to-indigo-500',
    icon: <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}><path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>,
  },
  {
    id: 'export',
    title: 'Export Clearance',
    tag: 'Outbound Goods',
    tagColor: 'bg-green-100 text-green-700',
    headline: 'Smooth Export Documentation & Filing',
    desc: 'Exporting goods internationally requires precise documentation and compliance. We prepare all export declarations, obtain necessary permits, and ensure your shipment departs without regulatory issues.',
    features: ['Export declaration filing', 'Certificate of Origin issuance', 'Export permit procurement', 'Prohibited goods checking', 'Letter of Credit compliance', 'Electronic filing at all ports'],
    img: 'https://images.pexels.com/photos/4483942/pexels-photo-4483942.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
    color: 'from-green-700 to-emerald-500',
    icon: <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}><path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg>,
  },
  {
    id: 'consulting',
    title: 'Trade Consulting',
    tag: 'Expert Guidance',
    tagColor: 'bg-purple-100 text-purple-700',
    headline: 'Navigate Complex Trade Regulations',
    desc: 'Our trade compliance consultants help importers and exporters understand regulations, optimise duty payments, and avoid costly errors. We review your supply chain and identify savings opportunities.',
    features: ['Tariff engineering & optimisation', 'Free Trade Agreement analysis', 'Import/export audit review', 'Restricted party screening', 'Country of origin advice', 'Staff compliance training'],
    img: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
    color: 'from-purple-700 to-pink-500',
    icon: <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}><path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>,
  },
  {
    id: 'importer-rep',
    title: "Importer's Representative",
    tag: 'Regulatory Compliance',
    tagColor: 'bg-rose-100 text-rose-700',
    headline: 'Act as Your Local Compliance Partner',
    desc: 'For businesses importing into markets where a local representative is legally required, we act as your official importer of record. We assume compliance responsibility so you can trade without a local entity.',
    features: ['Importer of Record (IOR) service', 'Full liability assumption', 'VAT & tax registration support', 'Regulatory compliance management', 'Available in 50+ countries', 'Ongoing compliance monitoring'],
    img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
    color: 'from-rose-600 to-pink-500',
    icon: <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>,
  },
]

const PROCESS = [
  { title: 'Document Review', desc: 'We review your commercial invoice, packing list, and all shipping documents for accuracy and compliance.' },
  { title: 'Classification', desc: 'Our brokers assign the correct HS tariff code to ensure the right duty rate and avoid misclassification penalties.' },
  { title: 'Entry Filing', desc: 'We file the customs entry electronically with the relevant authority and manage any queries from customs officers.' },
  { title: 'Duty Payment', desc: 'We calculate and process all applicable duties, taxes, and fees on your behalf — no surprises at the border.' },
  { title: 'Release & Delivery', desc: 'Once cleared, we coordinate delivery from the port or airport directly to your facility or warehouse.' },
]

export default function CustomsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c1f0e 0%, #14532d 60%, #166534 100%)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <img src="https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}>
            Customs & Trade Compliance
          </span>
          <h1 className="font-black text-white mb-5" style={{ fontSize: 'clamp(36px, 6vw, 62px)', lineHeight: 1.1 }}>
            Clear Customs<br />
            <span style={{ color: '#F5C100' }}>Without the Headache</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '580px', margin: '0 auto 36px' }}>
            Licensed customs brokers handling import & export clearance, trade consulting, and full compliance management in 50+ countries.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary py-4! px-8! text-base!">Speak to a Broker</Link>
            <Link to="/contact" className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none' }}>
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Key credentials */}
      <div style={{ background: '#F5C100' }}>
        <div className="container mx-auto px-6 py-5 flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-800">
          {['🏛️ Licensed Customs Brokers', '⚡ 24-Hour Clearance Guarantee', '🌍 50+ Countries', '📋 Full Documentation Support', '🔒 100% Compliance Rate'].map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-slate-800 mb-4">Customs Services</h2>
            <p className="text-slate-500 max-w-xl mx-auto">From single shipment clearance to ongoing trade compliance — we cover every aspect of customs management.</p>
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
                  <Link to="/contact" className="btn-primary w-fit">Get Started</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clearance process */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-800 mb-4">Our Clearance Process</h2>
            <p className="text-slate-500 max-w-xl mx-auto">A proven 5-step process that gets your goods out of customs and into your hands quickly and compliantly.</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-slate-100" style={{ margin: '0 10%' }} />
            <div className="grid md:grid-cols-5 gap-6">
              {PROCESS.map((step, i) => (
                <div key={step.title} className="text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-xl relative z-10" style={{ background: i === 0 ? 'linear-gradient(135deg,#166534,#16a34a)' : i === PROCESS.length - 1 ? 'linear-gradient(135deg,#F5C100,#CC1500)' : 'white', color: i === 0 || i === PROCESS.length - 1 ? 'white' : '#64748b', border: '2px solid #e2e8f0' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2 text-sm">{step.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #0c1f0e, #166534)' }}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Clear Customs Faster?</h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>Talk to one of our licensed customs brokers today. We'll review your requirements and give you a clearance strategy within 24 hours.</p>
          <Link to="/contact" className="btn-primary py-4! px-9! text-base!">Talk to a Broker</Link>
        </div>
      </div>
    </div>
  )
}
