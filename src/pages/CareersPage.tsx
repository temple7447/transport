import PageMeta from '../components/PageMeta'
import { Link } from 'react-router-dom'

const OPENINGS = [
  { title: 'Senior Logistics Coordinator',   dept: 'Operations',    location: 'Austin, TX',    type: 'Full-time' },
  { title: 'Customs Clearance Specialist',   dept: 'Customs',       location: 'Remote',        type: 'Full-time' },
  { title: 'Freight Sales Executive',        dept: 'Sales',         location: 'Remote',         type: 'Full-time' },
  { title: 'Last-Mile Delivery Driver',      dept: 'Field Ops',     location: 'Austin, TX',    type: 'Full-time' },
  { title: 'Full-Stack Developer',           dept: 'Engineering',   location: 'Remote',        type: 'Full-time' },
  { title: 'Customer Success Manager',       dept: 'Support',       location: 'Remote',        type: 'Full-time' },
  { title: 'Supply Chain Analyst',           dept: 'Analytics',     location: 'Austin, TX',    type: 'Contract' },
  { title: 'Warehouse Operations Lead',      dept: 'Warehouse',     location: 'Houston, TX',   type: 'Full-time' },
]

const PERKS = [
  { icon: '🏥', title: 'Health & Dental',   desc: 'Full medical, dental, and vision coverage for you and your family.' },
  { icon: '🌍', title: 'Remote-Friendly',   desc: 'Many roles are fully remote with flexible working hours.' },
  { icon: '📈', title: 'Equity & Bonuses',  desc: 'Competitive salary, performance bonuses, and equity packages.' },
  { icon: '🎓', title: 'Learning Budget',   desc: '$2,000/year for courses, certifications, and conferences.' },
  { icon: '✈️', title: 'Travel Perks',      desc: 'Quarterly team offsites and travel reimbursements.' },
  { icon: '🕐', title: 'Flexible PTO',      desc: 'Unlimited paid time off — take the time you need.' },
]

export default function CareersPage() {
  return (
    <main style={{ paddingTop: 98 }}>
      <PageMeta title="Careers at Accessiblexpress" description="Join our global team. Open roles in operations, technology, and logistics across multiple countries." />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#1565C0 0%,#0D47A1 60%,#1976D2 100%)', padding: '80px 0 64px' }}>
        <div className="container mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5" style={{ background: 'rgba(21,101,192,0.15)', border: '1px solid rgba(21,101,192,0.4)', color: '#1565C0' }}>
            We're Hiring
          </span>
          <h1 className="font-black text-white mb-4" style={{ fontSize: 'clamp(36px,5vw,64px)', lineHeight: 1.05, letterSpacing: '-1.5px' }}>
            Join the Team Delivering<br />
            <span style={{ color: '#FF9800' }}>the World's Goods</span>
          </h1>
          <p className="mx-auto text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 560 }}>
            We're a fast-growing global logistics company on a mission to make shipping simple, fast, and transparent for everyone.
          </p>
          <a href="#openings" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold transition-all" style={{ background: '#1565C0', color: 'white', textDecoration: 'none' }}>
            See Open Roles
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}><path d="M19 9l-7 7-7-7" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}/></svg>
          </a>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#1565C0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-px" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {[{ val: '200+', label: 'Team Members' }, { val: '18', label: 'Countries' }, { val: '4.8★', label: 'Glassdoor Rating' }, { val: '94%', label: 'Retention Rate' }].map((s, i) => (
            <div key={i} className="py-8 text-center" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div className="font-black text-white" style={{ fontSize: 32 }}>{s.val}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.38)', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Perks */}
      <section className="py-20" style={{ background: '#f8fafc' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-black text-slate-900 mb-3" style={{ fontSize: 'clamp(28px,3.5vw,42px)', letterSpacing: '-0.5px' }}>Why Work With Us</h2>
            <p className="text-slate-500 max-w-xl mx-auto">We invest in our people the same way we invest in our customers — with care, transparency, and a commitment to growth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map(p => (
              <div key={p.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-20" style={{ background: 'white' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-black text-slate-900 mb-3" style={{ fontSize: 'clamp(28px,3.5vw,42px)', letterSpacing: '-0.5px' }}>Open Positions</h2>
            <p className="text-slate-500">Can't find the right role? Send us your CV at <a href="mailto:careers@accessiblexpress.com" style={{ color: '#1565C0' }}>careers@accessiblexpress.com</a></p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {OPENINGS.map(job => (
              <div key={job.title} className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group">
                <div>
                  <h3 className="font-bold text-slate-800 group-hover:text-[#1565C0] transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                    <span>{job.dept}</span>
                    <span>·</span>
                    <span>{job.location}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(21,101,192,0.07)', color: '#1565C0' }}>{job.type}</span>
                  </div>
                </div>
                <Link to="/contact" className="flex items-center gap-1.5 text-sm font-semibold transition-colors shrink-0 ml-4" style={{ color: '#1565C0', textDecoration: 'none' }}>
                  Apply
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}><path d="M9 5l7 7-7 7"/></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg,#1565C0,#1976D2)' }}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-black text-white mb-3" style={{ fontSize: 'clamp(24px,3vw,36px)' }}>Don't See Your Role?</h2>
          <p className="text-white/50 mb-6 max-w-md mx-auto">We're always looking for talented people. Drop us your CV and we'll reach out when something opens up.</p>
          <a href="mailto:careers@accessiblexpress.com" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold" style={{ background: '#FF9800', color: '#1F2937', textDecoration: 'none' }}>
            Send Your CV
          </a>
        </div>
      </section>
    </main>
  )
}
