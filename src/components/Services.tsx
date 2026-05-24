import { useScrollReveal } from '../hooks/useScrollReveal'
import { IcoBolt, IcoPlane, IcoShip, IcoTruck, IcoWarehouse, IcoShieldCheck } from '../lib/icons'

const SERVICES = [
  {
    icon: <IcoBolt className="w-8 h-8 text-white drop-shadow" />,
    title: 'Express Delivery',
    desc: 'Same-day and next-day delivery for urgent shipments. Guaranteed on-time performance with real-time updates.',
    color: 'text-yellow-600',
    badge: 'Most Popular',
    img: 'https://images.pexels.com/photos/4246019/pexels-photo-4246019.jpeg?auto=compress&cs=tinysrgb&w=600&h=320&fit=crop',
    overlay: 'from-yellow-500/80 to-red-600/80',
  },
  {
    icon: <IcoPlane className="w-8 h-8 text-white drop-shadow" />,
    title: 'Air Freight',
    desc: 'Fast international air cargo solutions with access to 500+ airports worldwide. Ideal for high-value goods.',
    color: 'text-blue-600',
    badge: null,
    img: 'https://images.pexels.com/photos/747679/pexels-photo-747679.jpeg?auto=compress&cs=tinysrgb&w=600&h=320&fit=crop',
    overlay: 'from-blue-600/80 to-cyan-500/80',
  },
  {
    icon: <IcoShip className="w-8 h-8 text-white drop-shadow" />,
    title: 'Sea Freight',
    desc: 'Cost-effective ocean freight for large shipments. FCL and LCL options to 300+ ports globally.',
    color: 'text-cyan-600',
    badge: 'Best Value',
    img: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=600&h=320&fit=crop',
    overlay: 'from-cyan-700/80 to-blue-500/80',
  },
  {
    icon: <IcoTruck className="w-8 h-8 text-white drop-shadow" />,
    title: 'Road Transport',
    desc: 'Reliable ground logistics across continents with a fleet of 2,000+ vehicles. Door-to-door service.',
    color: 'text-green-600',
    badge: null,
    img: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600&h=320&fit=crop',
    overlay: 'from-green-600/80 to-emerald-500/80',
  },
  {
    icon: <IcoWarehouse className="w-8 h-8 text-white drop-shadow" />,
    title: 'Warehousing',
    desc: 'Secure, climate-controlled storage facilities in 50+ strategic locations. Inventory management included.',
    color: 'text-purple-600',
    badge: null,
    img: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=600&h=320&fit=crop',
    overlay: 'from-purple-700/80 to-indigo-500/80',
  },
  {
    icon: <IcoShieldCheck className="w-8 h-8 text-white drop-shadow" />,
    title: 'Customs Clearance',
    desc: 'Expert customs brokerage with automated documentation. Fast, compliant clearance in any country.',
    color: 'text-rose-500',
    badge: null,
    img: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=600&h=320&fit=crop',
    overlay: 'from-rose-600/80 to-pink-500/80',
  },
]

export default function Services() {
  const [ref, inView] = useScrollReveal()

  return (
    <section id="services" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div ref={ref} className="container mx-auto px-4 sm:px-6">

        <div className={`text-center mb-10 sm:mb-14 ${inView ? 'animate-reveal-up' : 'opacity-0'}`}>
          <span className="section-label">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 mt-4 mb-4">
            End-to-End Logistics Services
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
            From single parcels to enterprise supply chains — we have the solution for every shipping need.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.title}
              className={`group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm cursor-pointer
                transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-transparent
                ${inView ? 'animate-reveal-up' : 'opacity-0'}`}
              style={inView ? { animationDelay: `${0.08 + i * 0.09}s` } : {}}
            >
              {/* Photo header with gradient overlay */}
              <div className="relative h-40 sm:h-44 overflow-hidden">
                <img
                  src={svc.img}
                  alt={svc.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-linear-to-br ${svc.overlay}`} />

                {/* Overlaid icon + badge */}
                <div className="absolute inset-0 p-4 flex items-end justify-between">
                  <span>{svc.icon}</span>
                  {svc.badge && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/30">
                      {svc.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{svc.desc}</p>
                <a
                  href="#"
                  className={`text-sm font-semibold ${svc.color} flex items-center gap-1.5 transition-all duration-300 group-hover:gap-3`}
                >
                  Learn More
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-10 sm:mt-12 text-center ${inView ? 'animate-reveal-up' : 'opacity-0'}`}
          style={inView ? { animationDelay: '0.65s' } : {}}
        >
          <button className="btn-primary bg-slate-800! hover:bg-slate-700! shadow-none!">
            View All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
