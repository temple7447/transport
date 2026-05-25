import { Link } from 'react-router-dom'
import { IcoBolt, IcoPlane, IcoShip, IcoTruck, IcoWarehouse, IcoShieldCheck } from '../lib/icons'
import Reveal from './Reveal'

const SERVICES = [
  {
    icon: <IcoBolt className="w-6 h-6" />,
    title: 'Express Delivery',
    desc: 'Same-day pickup within 2 hours, next-day international delivery, with real-time GPS tracking every step of the way.',
    img: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    to: '/services',
    featured: false,
  },
  {
    icon: <IcoPlane className="w-6 h-6" />,
    title: 'Air Freight',
    desc: 'Access 500+ airports worldwide. 2–4 day international transit with full customs documentation included.',
    img: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    to: '/freight#air',
    featured: true,
  },
  {
    icon: <IcoShip className="w-6 h-6" />,
    title: 'Ocean Freight',
    desc: 'Move large volumes affordably. FCL & LCL options to 300+ ports worldwide with door-to-door service.',
    img: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    to: '/freight#ocean',
    featured: false,
  },
  {
    icon: <IcoTruck className="w-6 h-6" />,
    title: 'Road Transport',
    desc: 'Our fleet of 2,000+ vehicles covers major corridors across continents with live tracking on every load.',
    img: 'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    to: '/freight#road',
    featured: false,
  },
  {
    icon: <IcoWarehouse className="w-6 h-6" />,
    title: 'Warehousing',
    desc: 'Climate-controlled storage in 50+ locations. Pick, pack & ship with real-time inventory dashboard.',
    img: 'https://images.pexels.com/photos/4483942/pexels-photo-4483942.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    to: '/services#warehouse',
    featured: true,
  },
  {
    icon: <IcoShieldCheck className="w-6 h-6" />,
    title: 'Customs Clearance',
    desc: 'Licensed brokers handle all documentation, duties, and compliance so your shipments clear borders without delays.',
    img: 'https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    to: '/customs',
    featured: false,
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} direction="up" delay={i * 0.07}>
              <div
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                style={{ background: svc.featured ? '#0D0840' : 'white' }}
              >
                {/* Image + diagonal cut + icon */}
                <div style={{ position: 'relative' }}>
                  <div style={{ height: 200, overflow: 'hidden' }}>
                    <img
                      src={svc.img}
                      alt={svc.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                    />
                  </div>

                  {/* Diagonal cut overlay */}
                  <div style={{
                    position: 'absolute', bottom: -1, left: 0, right: 0, height: 56,
                    background: svc.featured ? '#0D0840' : 'white',
                    clipPath: 'polygon(0 55%, 100% 0%, 100% 100%, 0 100%)',
                  }} />

                  {/* Icon circle straddling boundary */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: '50%',
                    transform: 'translate(-50%, 50%)',
                    zIndex: 10,
                  }}>
                    <div style={{
                      width: 62, height: 62, borderRadius: '50%',
                      background: svc.featured ? '#0D0840' : 'white',
                      border: svc.featured ? '3px solid #CC1500' : '3px solid #0D0840',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: svc.featured
                        ? '0 0 0 4px rgba(204,21,0,0.2), 0 8px 24px rgba(0,0,0,0.3)'
                        : '0 0 0 4px rgba(13,8,64,0.08), 0 8px 24px rgba(0,0,0,0.12)',
                      color: svc.featured ? '#CC1500' : '#0D0840',
                    }}>
                      {svc.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ paddingTop: 44, padding: '44px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{
                    fontWeight: 900, fontSize: 20, marginBottom: 10,
                    color: svc.featured ? 'white' : '#1e293b',
                    textAlign: 'center',
                  }}>
                    {svc.title}
                  </h3>
                  <p style={{
                    fontSize: 14, lineHeight: 1.7,
                    color: svc.featured ? 'rgba(255,255,255,0.6)' : '#64748b',
                    textAlign: 'center', flex: 1, marginBottom: 20,
                  }}>
                    {svc.desc}
                  </p>

                  {/* Learn More button */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link
                      to={svc.to}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '11px 28px', borderRadius: 8,
                        fontWeight: 700, fontSize: 13, letterSpacing: '0.5px', textTransform: 'uppercase',
                        textDecoration: 'none',
                        background: svc.featured ? '#CC1500' : '#0D0840',
                        color: 'white',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)' }}
                    >
                      Learn More
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}>
                        <path d="M9 5l7 7-7 7"/>
                      </svg>
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
