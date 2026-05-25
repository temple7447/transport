import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props  { children: ReactNode }
interface State  { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div
          className="min-h-screen flex items-center justify-center px-6"
          style={{ background: '#0D0840' }}
        >
          <div className="text-center max-w-md">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(204,21,0,0.15)' }}
            >
              <svg className="w-8 h-8" style={{ color: '#CC1500' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}>
                <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-black text-white mb-2">Something went wrong</h1>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
              An unexpected error occurred. Refreshing the page usually fixes it.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-7 py-3 rounded-xl text-sm font-bold transition-all"
              style={{ background: '#F5C100', color: '#0D0840' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4A800' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F5C100' }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
