const BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? ''

// ── Token helpers ──────────────────────────────────────────────────────────
export const TOKEN_KEY = 'qsd_admin_token'
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

// ── Shared types ───────────────────────────────────────────────────────────
export type ShipStatus =
  | 'processing'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'customs_hold'
  | 'delayed'

export interface ShipEvent {
  time: string
  date: string
  location: string
  desc: string
  type: string
}

export interface AdminShipment {
  id: string
  sender: { name: string; phone: string; address: string; city: string; country: string }
  recipient: { name: string; phone: string; address: string; city: string; country: string }
  service: string
  weight: string
  dimensions: string
  contents: string
  value: string
  status: ShipStatus
  createdAt: string
  eta: string
  events: ShipEvent[]
}

export interface QuoteOption {
  label: string
  days: string
  rate: number
}

export interface QuoteResponse {
  basePrice: number
  options: QuoteOption[]
}

export interface QuoteRequest {
  from: string
  to: string
  weight: number
  length: number
  width: number
  height: number
  service?: string
}

export interface ContactRequest {
  name: string
  email: string
  company?: string
  subject: string
  message: string
}

export interface Subscriber {
  id: string
  email: string
  subscribedAt: string
  active: boolean
}

// ── Core fetch wrapper ─────────────────────────────────────────────────────
async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  extraHeaders?: Record<string, string>,
): Promise<T> {
  const token = getToken()
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...extraHeaders,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })

  if (res.status === 401) {
    clearToken()
    window.location.href = '/admin/login'
    throw new Error('Unauthorized')
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { message?: string }).message ?? `HTTP ${res.status}`)
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

// ── API surface ────────────────────────────────────────────────────────────
export const api = {
  // Auth
  login: (email: string, password: string) => {
    const secret = (import.meta.env.VITE_ADMIN_SECRET as string | undefined) ?? ''
    return request<{ token: string }>(
      'POST',
      '/api/auth/login',
      { email, password },
      secret ? { 'x-admin-secret': secret } : undefined,
    )
  },

  logout: () =>
    request<void>('POST', '/api/auth/logout'),

  me: () =>
    request<{ username: string }>('GET', '/api/auth/me'),

  // Public — tracking
  track: (id: string) =>
    request<AdminShipment>('GET', `/api/track/${encodeURIComponent(id)}`),

  // Public — quote calculator
  quote: (body: QuoteRequest) =>
    request<QuoteResponse>('POST', '/api/quotes/calculate', body),

  // Public — contact form
  contact: (body: ContactRequest) =>
    request<void>('POST', '/api/contact', body),

  // Public — newsletter subscription
  subscribe: (email: string) =>
    request<{ message: string }>('POST', '/api/subscribe', { email }),

  unsubscribe: (email: string) =>
    request<{ message: string }>('POST', '/api/subscribe/unsubscribe', { email }),

  // Admin — subscribers list (JWT protected)
  listSubscribers: () =>
    request<Subscriber[]>('GET', '/api/subscribe'),

  // Admin — shipments (all protected)
  listShipments: (params?: { status?: string; search?: string }) => {
    const qs = params
      ? new URLSearchParams(params as Record<string, string>).toString()
      : ''
    return request<AdminShipment[]>('GET', `/api/admin/shipments${qs ? `?${qs}` : ''}`)
  },

  createShipment: (body: Omit<AdminShipment, 'id' | 'createdAt' | 'events'>) =>
    request<AdminShipment>('POST', '/api/admin/shipments', body),

  getShipment: (id: string) =>
    request<AdminShipment>('GET', `/api/admin/shipments/${encodeURIComponent(id)}`),

  updateShipment: (id: string, body: Partial<Pick<AdminShipment, 'status' | 'eta'>>) =>
    request<AdminShipment>('PATCH', `/api/admin/shipments/${encodeURIComponent(id)}`, body),

  deleteShipment: (id: string) =>
    request<void>('DELETE', `/api/admin/shipments/${encodeURIComponent(id)}`),

  addEvent: (id: string, event: ShipEvent) =>
    request<AdminShipment>('POST', `/api/admin/shipments/${encodeURIComponent(id)}/events`, event),
}
