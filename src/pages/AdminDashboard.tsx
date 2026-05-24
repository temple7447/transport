import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, clearToken, type AdminShipment, type ShipStatus, type ShipEvent, type Subscriber } from '../lib/api'

/* ─── Types ──────────────────────────────────────────────────────────────── */
type AdminTab = 'overview' | 'shipments' | 'create' | 'track' | 'subscribers'

/* ─── Status config ──────────────────────────────────────────────────────── */
const STATUS_CFG: Record<ShipStatus, { label: string; color: string; bg: string }> = {
  processing:       { label: 'Processing',       color: '#7c3aed', bg: '#f5f3ff' },
  in_transit:       { label: 'In Transit',        color: '#2563eb', bg: '#eff6ff' },
  out_for_delivery: { label: 'Out for Delivery',  color: '#CC1500', bg: '#fff5f5' },
  delivered:        { label: 'Delivered',          color: '#16a34a', bg: '#f0fdf4' },
  customs_hold:     { label: 'Customs Hold',       color: '#b45309', bg: '#fffbeb' },
  delayed:          { label: 'Delayed',            color: '#dc2626', bg: '#fef2f2' },
}


function todayStr(): string { return new Date().toISOString().slice(0, 10) }
function nowTime(): string { return new Date().toTimeString().slice(0, 5) }

function evtIcon(type: string) {
  const icons: Record<string, JSX.Element> = {
    pickup:   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>,
    flight:   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>,
    sort:     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg>,
    customs:  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>,
    truck:    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"/><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l1 1h1m8-1V8h3l3 3v4l1 1h-1m-6 0h-3"/></svg>,
    delivered:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M4.5 12.75l6 6 9-13.5"/></svg>,
  }
  return icons[type] ?? icons.sort
}

/* ─── Status badge ───────────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: ShipStatus }) {
  const c = STATUS_CFG[status]
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap" style={{ background: c.bg, color: c.color }}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.color }} />
      {c.label}
    </span>
  )
}

/* ─── Overview Tab ───────────────────────────────────────────────────────── */
function OverviewTab({ shipments, onNavigate }: { shipments: AdminShipment[]; onNavigate: (t: AdminTab) => void }) {
  const total      = shipments.length
  const inTransit  = shipments.filter(s => s.status === 'in_transit').length
  const delivered  = shipments.filter(s => s.status === 'delivered').length
  const issues     = shipments.filter(s => s.status === 'customs_hold' || s.status === 'delayed').length
  const processing = shipments.filter(s => s.status === 'processing').length

  const recent = [...shipments].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800">Dashboard Overview</h2>
        <p className="text-slate-500 text-sm mt-1">Welcome back, Admin. Here's your shipment summary.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Shipments', value: total,      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>, color: '#0f2444', bg: '#e8f0fe' },
          { label: 'In Transit',      value: inTransit,  icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>, color: '#2563eb', bg: '#dbeafe' },
          { label: 'Delivered',       value: delivered,  icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, color: '#16a34a', bg: '#dcfce7' },
          { label: 'Needs Attention', value: issues,     icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>, color: '#b45309', bg: '#fef3c7' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <span style={{ color: s.color }}>{s.icon}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide" style={{ background: s.bg, color: s.color }}>{s.label}</span>
            </div>
            <p className="text-4xl font-black text-slate-800">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status breakdown */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Status Breakdown</h3>
          <div className="space-y-3">
            {(Object.entries(STATUS_CFG) as [ShipStatus, typeof STATUS_CFG[ShipStatus]][]).map(([key, cfg]) => {
              const count = shipments.filter(s => s.status === key).length
              const pct = total ? Math.round((count / total) * 100) : 0
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold flex items-center gap-1.5" style={{ color: cfg.color }}><span className="w-2 h-2 rounded-full shrink-0" style={{ background: cfg.color }} />{cfg.label}</span>
                    <span className="text-slate-400">{count} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: cfg.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Create Shipment', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}><path d="M12 4.5v15m7.5-7.5h-15"/></svg>, tab: 'create' as AdminTab, color: '#F5C100', text: '#0f0900' },
              { label: 'Track Package',   icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>, tab: 'track' as AdminTab, color: '#2563eb', text: 'white' },
              { label: 'All Shipments',   icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>, tab: 'shipments' as AdminTab, color: '#16a34a', text: 'white' },
              { label: 'Processing (' + processing + ')', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, tab: 'shipments' as AdminTab, color: '#7c3aed', text: 'white' },
            ].map(a => (
              <button key={a.label} onClick={() => onNavigate(a.tab)}
                className="flex items-center gap-2 p-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-85 active:scale-95 text-left"
                style={{ background: a.color, color: a.text }}>
                <span>{a.icon}</span>
                <span className="leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent shipments */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Recent Shipments</h3>
          <button onClick={() => onNavigate('shipments')} className="text-sm font-semibold" style={{ color: '#CC1500' }}>
            View all →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Tracking ID', 'Sender → Recipient', 'Service', 'Status', 'ETA'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-slate-500 font-semibold text-xs uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((s, i) => (
                <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                  <td className="px-5 py-3 font-mono text-xs font-bold text-slate-700 whitespace-nowrap">{s.id}</td>
                  <td className="px-5 py-3 text-xs">
                    <span className="font-medium text-slate-800">{s.sender.name}</span>
                    <span className="text-slate-400 mx-1">→</span>
                    <span className="font-medium text-slate-800">{s.recipient.name}</span>
                    <span className="text-slate-400 ml-1">({s.recipient.city})</span>
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-500 whitespace-nowrap">{s.service}</td>
                  <td className="px-5 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-5 py-3 text-xs text-slate-400 whitespace-nowrap">{s.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ─── Shipments Tab ──────────────────────────────────────────────────────── */
function ShipmentsTab({
  shipments, onUpdate, onDelete,
}: { shipments: AdminShipment[]; onUpdate: (id: string, status: ShipStatus, note?: string) => Promise<void>; onDelete: (id: string) => Promise<void> }) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected] = useState<AdminShipment | null>(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [newStatus, setNewStatus] = useState<ShipStatus>('in_transit')
  const [eventNote, setEventNote] = useState('')

  const filtered = shipments.filter(s => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      s.id.toLowerCase().includes(q) ||
      s.sender.name.toLowerCase().includes(q) ||
      s.recipient.name.toLowerCase().includes(q) ||
      s.recipient.city.toLowerCase().includes(q)
    return matchSearch && (filterStatus === 'all' || s.status === filterStatus)
  })

  const openUpdate = (s: AdminShipment) => {
    setSelected(s)
    setNewStatus(s.status)
    setShowUpdateModal(true)
  }

  const handleUpdateStatus = async () => {
    if (!selected) return
    try {
      await onUpdate(selected.id, newStatus, eventNote || undefined)
      setSelected(prev => prev ? { ...prev, status: newStatus } : null)
      setShowUpdateModal(false)
      setEventNote('')
    } catch (err) {
      alert((err as Error).message || 'Update failed. Please try again.')
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800">All Shipments</h2>
          <p className="text-slate-500 text-sm">{filtered.length} of {shipments.length} shipments</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search ID, sender, recipient…"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
          />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-yellow-400 bg-white">
          <option value="all">All Statuses</option>
          {Object.entries(STATUS_CFG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Tracking ID', 'Sender', 'Recipient', 'Service', 'Weight', 'Status', 'ETA', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-14 text-slate-400 text-sm">No shipments found</td></tr>
              ) : filtered.map((s, i) => (
                <tr key={s.id} className={`transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'} hover:bg-yellow-50/20`}>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-slate-700 whitespace-nowrap">{s.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-slate-800 font-medium text-xs">{s.sender.name}</p>
                    <p className="text-slate-400 text-xs">{s.sender.city}, {s.sender.country}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-slate-800 font-medium text-xs">{s.recipient.name}</p>
                    <p className="text-slate-400 text-xs">{s.recipient.city}, {s.recipient.country}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 max-w-[140px]">{s.service}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{s.weight}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{s.eta}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-1.5">
                      <button onClick={() => setSelected(s)} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">View</button>
                      <button onClick={() => openUpdate(s)} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors">Update</button>
                      <button onClick={() => { if (window.confirm(`Delete shipment ${s.id}?`)) onDelete(s.id) }} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail slide-over */}
      {selected && !showUpdateModal && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="w-full max-w-md bg-white shadow-2xl overflow-y-auto flex flex-col">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <p className="text-xs font-mono text-slate-400">{selected.id}</p>
                <h3 className="font-black text-slate-800 text-lg">Shipment Details</h3>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-5 flex-1">
              <div className="flex items-center justify-between">
                <StatusBadge status={selected.status} />
                <span className="text-xs text-slate-400 font-medium">ETA: {selected.eta}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">From</p>
                  <p className="font-bold text-slate-800 text-sm">{selected.sender.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{selected.sender.phone}</p>
                  <p className="text-slate-500 text-xs">{selected.sender.address}</p>
                  <p className="text-slate-500 text-xs">{selected.sender.city}, {selected.sender.country}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">To</p>
                  <p className="font-bold text-slate-800 text-sm">{selected.recipient.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{selected.recipient.phone}</p>
                  <p className="text-slate-500 text-xs">{selected.recipient.address}</p>
                  <p className="text-slate-500 text-xs">{selected.recipient.city}, {selected.recipient.country}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-3">Package Info</p>
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  {[
                    ['Service', selected.service],
                    ['Weight', selected.weight],
                    ['Dimensions', selected.dimensions],
                    ['Contents', selected.contents],
                    ['Declared Value', selected.value],
                    ['Created', selected.createdAt],
                  ].map(([k, v]) => (
                    <><span key={k + 'k'} className="text-slate-400">{k}</span><span key={k + 'v'} className="text-slate-800 font-medium">{v || '—'}</span></>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-3">Timeline</p>
                <div className="space-y-1">
                  {[...selected.events].reverse().map((ev, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs shrink-0">{evtIcon(ev.type)}</div>
                        {i < selected.events.length - 1 && <div className="w-px flex-1 bg-slate-200 my-1 min-h-[8px]" />}
                      </div>
                      <div className="pb-2">
                        <p className="text-slate-800 text-xs font-semibold leading-snug">{ev.desc}</p>
                        <p className="text-slate-400 text-xs">{ev.location} · {ev.date} {ev.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => openUpdate(selected)}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ background: '#F5C100', color: '#0f0900' }}>
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update status modal */}
      {showUpdateModal && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowUpdateModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-black text-slate-800 text-lg mb-1">Update Status</h3>
            <p className="text-slate-500 text-sm mb-5 font-mono">{selected.id}</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">New Status</label>
                <select value={newStatus} onChange={e => setNewStatus(e.target.value as ShipStatus)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400 bg-white">
                  {Object.entries(STATUS_CFG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">Event Note <span className="normal-case font-normal">(optional)</span></label>
                <input type="text" value={eventNote} onChange={e => setEventNote(e.target.value)}
                  placeholder="e.g. Package arrived at Frankfurt hub"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400" />
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => { setShowUpdateModal(false); setEventNote('') }}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleUpdateStatus}
                  className="flex-1 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                  style={{ background: '#F5C100', color: '#0f0900' }}>
                  Save Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Create Tab ─────────────────────────────────────────────────────────── */
const SERVICES = ['International Air Express', 'Air Freight', 'Sea Freight', 'Road Transport', 'Express Delivery']

const EMPTY_FORM = {
  senderName: '', senderPhone: '', senderAddress: '', senderCity: '', senderCountry: '',
  recipientName: '', recipientPhone: '', recipientAddress: '', recipientCity: '', recipientCountry: '',
  service: SERVICES[0], weight: '', dimensions: '', contents: '', value: '', eta: '',
}

function CreateTab({ onCreate }: { onCreate: (body: Omit<AdminShipment, 'id' | 'createdAt' | 'events'>) => Promise<string> }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.senderName || !form.senderCity || !form.senderCountry || !form.recipientName || !form.recipientCity || !form.recipientCountry || !form.contents || !form.weight) {
      setError('Please fill all required fields (marked with *).')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const id = await onCreate({
        sender: { name: form.senderName, phone: form.senderPhone, address: form.senderAddress, city: form.senderCity, country: form.senderCountry },
        recipient: { name: form.recipientName, phone: form.recipientPhone, address: form.recipientAddress, city: form.recipientCity, country: form.recipientCountry },
        service: form.service, weight: form.weight, dimensions: form.dimensions,
        contents: form.contents, value: form.value,
        status: 'processing', eta: form.eta || 'TBD',
      })
      setSuccess(id)
      setForm(EMPTY_FORM)
    } catch (err) {
      setError((err as Error).message || 'Failed to create shipment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5"><svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Shipment Created!</h2>
        <p className="text-slate-500 mb-6">The shipment has been added to the system and can now be tracked.</p>
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-5 mb-6">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Tracking Number</p>
          <p className="text-2xl font-black font-mono text-slate-800">{success}</p>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => setSuccess(null)} className="btn-primary">
            Create Another
          </button>
        </div>
      </div>
    )
  }

  const inputCls = 'w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all'
  const labelCls = 'text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5'

  const senderFields = [
    { key: 'senderName',    label: 'Full Name *',    ph: 'John Smith' },
    { key: 'senderPhone',   label: 'Phone',           ph: '+234 800 123 4567' },
    { key: 'senderAddress', label: 'Street Address',  ph: '14 Allen Avenue' },
    { key: 'senderCity',    label: 'City *',           ph: 'Lagos' },
    { key: 'senderCountry', label: 'Country *',        ph: 'Nigeria' },
  ]
  const recipientFields = [
    { key: 'recipientName',    label: 'Full Name *',   ph: 'Jane Doe' },
    { key: 'recipientPhone',   label: 'Phone',          ph: '+44 20 7946 0100' },
    { key: 'recipientAddress', label: 'Street Address', ph: '47 Baker Street' },
    { key: 'recipientCity',    label: 'City *',          ph: 'London' },
    { key: 'recipientCountry', label: 'Country *',       ph: 'United Kingdom' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800">Create New Shipment</h2>
        <p className="text-slate-500 text-sm">A tracking number will be automatically generated on submission.</p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl text-sm flex items-center gap-2 bg-red-50 text-red-600 border border-red-100">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sender */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black" style={{ background: '#F5C100', color: '#0f0900' }}>S</span>
              Sender Details
            </h3>
            <div className="space-y-3">
              {senderFields.map(f => (
                <div key={f.key}>
                  <label className={labelCls}>{f.label}</label>
                  <input type="text" value={(form as Record<string, string>)[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.ph} className={inputCls} />
                </div>
              ))}
            </div>
          </div>

          {/* Recipient */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black" style={{ background: '#CC1500', color: 'white' }}>R</span>
              Recipient Details
            </h3>
            <div className="space-y-3">
              {recipientFields.map(f => (
                <div key={f.key}>
                  <label className={labelCls}>{f.label}</label>
                  <input type="text" value={(form as Record<string, string>)[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.ph} className={inputCls} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipment details */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg> Shipment Details
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Service *</label>
              <select value={form.service} onChange={e => set('service', e.target.value)} className={inputCls + ' bg-white'}>
                {SERVICES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Weight *</label>
              <input type="text" value={form.weight} onChange={e => set('weight', e.target.value)} placeholder="3.5 kg" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Dimensions</label>
              <input type="text" value={form.dimensions} onChange={e => set('dimensions', e.target.value)} placeholder="40×30×20 cm" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Contents *</label>
              <input type="text" value={form.contents} onChange={e => set('contents', e.target.value)} placeholder="Electronics, Clothing…" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Declared Value</label>
              <input type="text" value={form.value} onChange={e => set('value', e.target.value)} placeholder="$500" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Expected ETA</label>
              <input type="text" value={form.eta} onChange={e => set('eta', e.target.value)} placeholder="Jun 1, 2026" className={inputCls} />
            </div>
          </div>
        </div>

        <button type="submit" disabled={submitting} className="btn-primary py-4! px-8! text-base! disabled:opacity-60">
          {submitting
            ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating…</>
            : <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg> Create Shipment</>}
        </button>
      </form>
    </div>
  )
}

/* ─── Track Tab ──────────────────────────────────────────────────────────── */
function TrackTab({ shipments, onUpdate }: { shipments: AdminShipment[]; onUpdate: (id: string, status: ShipStatus, note?: string, location?: string) => Promise<void> }) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<AdminShipment | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [newStatus, setNewStatus] = useState<ShipStatus>('in_transit')
  const [eventNote, setEventNote] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [updateDone, setUpdateDone] = useState(false)

  const search = () => {
    const found = shipments.find(s => s.id.toLowerCase() === query.trim().toLowerCase())
    setResult(found || null)
    setNotFound(!found)
    if (found) setNewStatus(found.status)
    setUpdateDone(false)
  }

  const applyUpdate = async () => {
    if (!result) return
    const desc = eventNote || `Status updated to: ${STATUS_CFG[newStatus].label}`
    const loc = eventLocation || 'Quick Send Control Centre'
    const newEvent: ShipEvent = { time: nowTime(), date: todayStr(), location: loc, desc, type: 'sort' }
    try {
      await onUpdate(result.id, newStatus, eventNote || undefined, eventLocation || undefined)
      setResult(prev => prev ? { ...prev, status: newStatus, events: [...prev.events, newEvent] } : null)
      setEventNote('')
      setEventLocation('')
      setUpdateDone(true)
      setTimeout(() => setUpdateDone(false), 3000)
    } catch (err) {
      alert((err as Error).message || 'Update failed. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800">Track Shipment</h2>
        <p className="text-slate-500 text-sm">Search and manage any shipment by tracking ID.</p>
      </div>

      <div className="flex gap-3 max-w-xl">
        <input
          type="text" value={query} onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
          placeholder="e.g. QSD-2026-001234"
          className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
        />
        <button onClick={search} className="btn-primary py-3! px-6! text-sm! shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          Search
        </button>
      </div>

      {notFound && !result && (
        <div className="max-w-sm text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3"><svg className="w-7 h-7 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg></div>
          <h3 className="font-bold text-slate-800 mb-1">Not Found</h3>
          <p className="text-slate-500 text-sm">No shipment matches <span className="font-mono font-bold">{query}</span></p>
        </div>
      )}

      {result && (
        <div className="max-w-2xl space-y-4">
          {/* Status header */}
          <div className="rounded-2xl p-5 text-white" style={{ background: STATUS_CFG[result.status].color }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold opacity-70 mb-1">Tracking ID</p>
                <p className="font-mono font-black text-xl">{result.id}</p>
                <p className="opacity-70 text-sm mt-1">{result.sender.city} → {result.recipient.city} · ETA: {result.eta}</p>
              </div>
              <StatusBadge status={result.status} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Sender</p>
              <p className="font-bold text-slate-800 text-sm">{result.sender.name}</p>
              <p className="text-xs text-slate-500">{result.sender.phone}</p>
              <p className="text-xs text-slate-500">{result.sender.city}, {result.sender.country}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Recipient</p>
              <p className="font-bold text-slate-800 text-sm">{result.recipient.name}</p>
              <p className="text-xs text-slate-500">{result.recipient.phone}</p>
              <p className="text-xs text-slate-500">{result.recipient.city}, {result.recipient.country}</p>
            </div>
          </div>

          {/* Package details */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-3">Package Details</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-xs">
              {[['Service', result.service], ['Weight', result.weight], ['Dimensions', result.dimensions || '—'], ['Contents', result.contents], ['Value', result.value || '—'], ['Created', result.createdAt]].map(([k, v]) => (
                <div key={k}><span className="text-slate-400 block">{k}</span><span className="text-slate-800 font-semibold">{v}</span></div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-4">Event Timeline ({result.events.length} events)</p>
            <div className="space-y-1">
              {[...result.events].reverse().map((ev, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm shrink-0">{evtIcon(ev.type)}</div>
                    {i < result.events.length - 1 && <div className="w-px flex-1 bg-slate-200 my-1 min-h-[10px]" />}
                  </div>
                  <div className="pb-3">
                    <p className="text-slate-800 text-sm font-semibold leading-snug">{ev.desc}</p>
                    <p className="text-slate-400 text-xs">{ev.location} · {ev.date} at {ev.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin controls */}
          <div className="bg-white rounded-2xl border-2 border-yellow-200 p-5 shadow-sm">
            <p className="text-xs font-bold text-yellow-700 uppercase tracking-wide mb-4 flex items-center gap-1.5"><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>Admin Controls</p>
            {updateDone && (
              <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-700 text-sm border border-green-200 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Status updated successfully.
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">New Status</label>
                <select value={newStatus} onChange={e => setNewStatus(e.target.value as ShipStatus)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-yellow-400 bg-white">
                  {Object.entries(STATUS_CFG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Location</label>
                <input type="text" value={eventLocation} onChange={e => setEventLocation(e.target.value)}
                  placeholder="e.g. Dubai Cargo Hub" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-yellow-400" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Event Description</label>
              <input type="text" value={eventNote} onChange={e => setEventNote(e.target.value)}
                placeholder="Describe what happened to the package…"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-yellow-400" />
            </div>
            <button onClick={applyUpdate}
              className="btn-primary py-2.5! px-6! text-sm!">
              Apply Update
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Subscribers Tab ────────────────────────────────────────────────────── */
function SubscribersTab() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.listSubscribers()
      .then(setSubscribers)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = subscribers.filter(s =>
    !search || s.email.toLowerCase().includes(search.toLowerCase())
  )
  const active = subscribers.filter(s => s.active).length

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-slate-800">Newsletter Subscribers</h2>
        <p className="text-slate-500 text-sm mt-1">{active} active · {subscribers.length} total</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Total',       value: subscribers.length,              icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>, color: '#0f2444', bg: '#e8f0fe' },
          { label: 'Active',      value: active,                                           icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, color: '#16a34a', bg: '#dcfce7' },
          { label: 'Unsubscribed', value: subscribers.length - active,                    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, color: '#b45309', bg: '#fef3c7' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <span style={{ color: s.color }}>{s.icon}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide" style={{ background: s.bg, color: s.color }}>{s.label}</span>
            </div>
            <p className="text-4xl font-black text-slate-800">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by email…"
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="w-7 h-7 border-4 border-slate-200 border-t-yellow-400 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Email', 'Subscribed At', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-slate-500 font-semibold text-xs uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={3} className="text-center py-14 text-slate-400 text-sm">No subscribers found</td></tr>
                ) : filtered.map((s, i) => (
                  <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                    <td className="px-5 py-3 text-sm font-medium text-slate-800">{s.email}</td>
                    <td className="px-5 py-3 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(s.subscribedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-3">
                      {s.active
                        ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Active</span>
                        : <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-slate-400" />Unsubscribed</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Main Dashboard ─────────────────────────────────────────────────────── */
const NAV_ITEMS: { key: AdminTab; label: string; icon: JSX.Element }[] = [
  { key: 'overview',     label: 'Overview',         icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg> },
  { key: 'shipments',    label: 'Shipments',         icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg> },
  { key: 'create',       label: 'Create Shipment',   icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}><path d="M12 4.5v15m7.5-7.5h-15"/></svg> },
  { key: 'track',        label: 'Track Shipment',    icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg> },
  { key: 'subscribers',  label: 'Subscribers',       icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg> },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<AdminTab>('overview')
  const [shipments, setShipments] = useState<AdminShipment[]>([])
  const [loadingShipments, setLoadingShipments] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    api.listShipments()
      .then(setShipments)
      .catch(console.error)
      .finally(() => setLoadingShipments(false))
  }, [])

  const logout = async () => {
    try { await api.logout() } catch { /* ignore */ }
    clearToken()
    navigate('/admin/login')
  }

  const handleCreate = async (body: Omit<AdminShipment, 'id' | 'createdAt' | 'events'>): Promise<string> => {
    const created = await api.createShipment(body)
    setShipments(prev => [created, ...prev])
    return created.id
  }

  const handleUpdate = async (id: string, status: ShipStatus, note?: string, location?: string) => {
    await api.updateShipment(id, { status })
    const desc = note || `Status updated to: ${STATUS_CFG[status].label}`
    const loc = location || 'Quick Send Control Centre'
    const newEvent: ShipEvent = { time: nowTime(), date: todayStr(), location: loc, desc, type: 'sort' }
    await api.addEvent(id, newEvent)
    setShipments(prev => prev.map(s =>
      s.id !== id ? s : { ...s, status, events: [...s.events, newEvent] }
    ))
  }

  const handleDelete = async (id: string) => {
    await api.deleteShipment(id)
    setShipments(prev => prev.filter(s => s.id !== id))
  }

  const TAB_TITLES: Record<AdminTab, string> = {
    overview:    'Dashboard Overview',
    shipments:   'All Shipments',
    create:      'Create Shipment',
    track:       'Track Shipment',
    subscribers: 'Newsletter Subscribers',
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        style={{ width: '256px', background: 'linear-gradient(180deg, #0f2444 0%, #071426 100%)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#F5C100' }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M1 3h14v11H1V3z" fill="white" opacity="0.95" />
                <path d="M15 7h5l3 4v3h-8V7z" fill="white" opacity="0.8" />
                <circle cx="5" cy="17" r="2.2" fill="white" />
                <circle cx="19" cy="17" r="2.2" fill="white" />
              </svg>
            </div>
            <div>
              <p className="font-black text-white text-sm tracking-tight">QUICK SEND</p>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(item => {
            const active = tab === item.key
            return (
              <button
                key={item.key}
                onClick={() => { setTab(item.key); setSidebarOpen(false) }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left"
                style={{
                  background: active ? 'rgba(245,193,0,0.15)' : 'transparent',
                  color: active ? '#F5C100' : 'rgba(255,255,255,0.55)',
                  borderLeft: active ? '3px solid #F5C100' : '3px solid transparent',
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Bottom user / logout */}
        <div className="px-3 pb-5 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0" style={{ background: '#F5C100', color: '#0f0900' }}>A</div>
            <div>
              <p className="text-white text-xs font-bold">Administrator</p>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>admin@quicksend</p>
            </div>
          </div>
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(204,21,0,0.15)'; e.currentTarget.style.color = '#ff8080' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: '0', paddingLeft: '0' }}>
        <div className="lg:ml-64">
          {/* Top bar */}
          <header className="sticky top-0 z-20 bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4" style={{ boxShadow: '0 1px 12px rgba(0,0,0,0.06)' }}>
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex-1">
              <h1 className="font-black text-slate-800 text-lg">{TAB_TITLES[tab]}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }} />
                {shipments.length} Shipments
              </div>
              <a href="/" target="_blank" rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Site
              </a>
            </div>
          </header>

          {/* Page content */}
          <main className="p-6">
            {loadingShipments ? (
              <div className="flex items-center justify-center py-32">
                <span className="w-8 h-8 border-4 border-slate-200 border-t-yellow-400 rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {tab === 'overview'     && <OverviewTab     shipments={shipments} onNavigate={setTab} />}
                {tab === 'shipments'   && <ShipmentsTab   shipments={shipments} onUpdate={handleUpdate} onDelete={handleDelete} />}
                {tab === 'create'      && <CreateTab      onCreate={handleCreate} />}
                {tab === 'track'       && <TrackTab       shipments={shipments}  onUpdate={handleUpdate} />}
                {tab === 'subscribers' && <SubscribersTab />}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
