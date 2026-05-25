import { Link } from 'react-router-dom'
import { IcoBolt, IcoPlane, IcoShip, IcoTruck, IcoWarehouse, IcoShieldCheck } from '../lib/icons'
import Reveal from './Reveal'

const SERVICES = [
  {
    icon: <IcoBolt className="w-7 h-7 text-white" />,
    title: 'Express Delivery',
    badge: 'Most Popular',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    headline: 'Same-Day & Next-Day Delivery',
    desc: 'When speed is everything, our Express service guarantees your package arrives the same day (domestic) or next business day (international). Real-time GPS tracking every step of the way.',
    features: [
      'Same-day pickup within 2 hours',
      'Next-day international delivery',
      'SMS + email notifications',
      'Proof of delivery photo',
      'Up to 70 kg per parcel',
    ],
    price: '$12',
    to: '/services',
    bg: 'linear-gradient(135deg, #F5C100 0%, #CC1500 100%)',
  },
  {
    icon: <IcoPlane className="w-7 h-7 text-white" />,
    title: 'Air Freight',
    badge: 'Fast International',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    headline: 'Global Air Cargo in 2–4 Days',
    desc: 'Access 500+ airports worldwide with our dedicated air freight network. Ideal for high-value, time-sensitive cargo. We handle all documentation and customs clearance.',
    features: [
      '500+ airports served',
      '2–4 day international transit',
      'Customs documentation included',
      'Dangerous goods certified',
      'Temperature-controlled options',
    ],
    price: '$45',
    to: '/freight#air',
    bg: 'linear-gradient(135deg, #CC1500 0%, #F5C100 100%)',
  },
  {
    icon: <IcoShip className="w-7 h-7 text-white" />,
    title: 'Sea Freight',
    badge: 'Best Value',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    headline: 'Cost-Effective Ocean Freight',
    desc: 'Move large volumes across the globe affordably. FCL and LCL options with door-to-port or door-to-door delivery to 300+ ports worldwide.',
    features: [
      'FCL & LCL options',
      '300+ ports covered',
      'Full container tracking',
      'Refrigerated cargo support',
      'On-board bill of lading',
    ],
    price: '$180',
    to: '/freight#ocean',
    bg: 'linear-gradient(135deg, #071426 0%, #0f2444 100%)',
  },
  {
    icon: <IcoTruck className="w-7 h-7 text-white" />,
    title: 'Road Transport',
    badge: 'Door-to-Door',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    headline: 'Reliable Ground Logistics',
    desc: 'Our fleet of 2,000+ vehicles covers major road corridors across continents. Perfect for domestic and cross-border deliveries with real-time fleet visibility.',
    features: [
      '2,000+ vehicle fleet',
      'Cross-border clearance',
      'Live fleet tracking',
      'Fragile goods handling',
      'Flexible pickup windows',
    ],
    price: '$8',
    to: '/freight#road',
    bg: 'linear-gradient(135deg, #CC1500 0%, #071426 100%)',
  },
  {
    icon: <IcoWarehouse className="w-7 h-7 text-white" />,
    title: 'Warehousing',
    badge: 'Fulfillment Ready',
    badgeColor: 'bg-red-100 text-red-700',
    headline: 'Smart Storage & Fulfillment',
    desc: 'Climate-controlled warehouses in 50+ strategic locations. Inventory management, pick-and-pack, and same-day order fulfillment for e-commerce businesses.',
    features: [
      '50+ global warehouse locations',
      'Climate-controlled storage',
      'Pick, pack & ship service',
      'Real-time inventory dashboard',
      'Returns processing',
    ],
    price: '$0.40/day',
    to: '/services#warehouse',
    bg: 'linear-gradient(135deg, #050e1d 0%, #0e1e3c 100%)',
  },
  {
    icon: <IcoShieldCheck className="w-7 h-7 text-white" />,
    title: 'Customs Clearance',
    badge: 'AEO Certified',
    badgeColor: 'bg-red-100 text-red-700',
    headline: 'Hassle-Free Customs Brokerage',
    desc: 'Our certified customs experts handle all documentation, duties, and compliance requirements so your shipments clear borders without delays — in any country.',
    features: [
      'Licensed customs brokers',
      'Automated HS code classification',
      'Duty & tax pre-calculation',
      'CITES & special permit handling',
      'Same-day clearance for express cargo',
    ],
    price: 'From $35',
    to: '/customs',
    bg: 'linear-gradient(135deg, #F5C100 0%, #CC1500 100%)',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">

        <Reveal direction="up" className="text-center mb-10 sm:mb-14">
          <span className="section-label">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 mt-4 mb-4">
            End-to-End Logistics Services
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
            From single parcels to enterprise supply chains — we have the solution for every shipping need.
          </p>
        </Reveal>

        <div className="space-y-6">
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} direction={i % 2 === 0 ? 'left' : 'right'} delay={0.05}>
              <div className={`flex flex-col md:flex-row ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''} bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300`}>

                {/* Image / colour panel */}
                <div className="md:w-2/5 min-h-56 md:min-h-0 relative flex flex-col justify-end p-6 md:p-8" style={{ background: svc.bg }}>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                      {svc.icon}
                    </div>
                    <h3 className="text-white font-black text-xl">{svc.title}</h3>
                  </div>
                </div>

                {/* Content panel */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  {svc.badge && (
                    <span className={`inline-flex self-start text-xs font-bold px-3 py-1 rounded-full mb-3 ${svc.badgeColor}`}>
                      {svc.badge}
                    </span>
                  )}
                  <h4 className="text-xl md:text-2xl font-black text-slate-800 mb-2">{svc.headline}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{svc.desc}</p>

                  <ul className="space-y-2 mb-6">
                    {svc.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-3">
                    <Link to="/contact" className="btn-primary py-3! px-6! text-sm!" style={{ textDecoration: 'none' }}>Get Quote</Link>
                    <Link to={svc.to} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all" style={{ textDecoration: 'none' }}>
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
