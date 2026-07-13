import { useEffect, useRef, useState } from 'react'
import { ActionLoading } from './ActionLoading.jsx'

const roleLabels = { operator: 'Operator', expert: 'Verified Expert', admin: 'Moderator / Admin' }

export function DashboardLayout({ user, onLogout, onSwitchView, title, subtitle, tabs, activeTab, onTabChange, children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState('')
  const cancelButtonRef = useRef(null)

  useEffect(() => {
    if (!logoutOpen) return undefined
    cancelButtonRef.current?.focus()
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setLogoutOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [logoutOpen])

  useEffect(() => {
    let activeRequests = 0
    const trackActivity = (event) => {
      activeRequests = Math.max(0, activeRequests + (event.detail.active ? 1 : -1))
      if (event.detail.active) setActionLoading(event.detail.message)
      else if (activeRequests === 0) setActionLoading('')
    }
    window.addEventListener('api-activity', trackActivity)
    return () => window.removeEventListener('api-activity', trackActivity)
  }, [])

  return <div className="dashboard-shell">
    <ActionLoading message={actionLoading}/>
    <a className="skip-link" href="#dashboard-content">Skip to dashboard content</a>
    <aside className={`dashboard-sidebar ${menuOpen ? 'open' : ''}`}>
      <button className="brand-button" onClick={() => window.location.hash = '/'} aria-label="Go to home"><span className="brand-mark">E</span><span>E-Com Support</span></button>
      <div className="sidebar-role"><span>{roleLabels[user.role]}</span><strong>{user.name}</strong></div>
      <nav className="dashboard-nav" aria-label={`${roleLabels[user.role]} dashboard`}>
        {tabs.map((tab) => <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} aria-current={activeTab === tab.id ? 'page' : undefined} onClick={() => { onTabChange(tab.id); setMenuOpen(false) }}>{tab.label}</button>)}
      </nav>
      {user.role !== 'admin' && <button className="view-switch-button" onClick={() => onSwitchView(user.role === 'operator' ? 'expert' : 'operator')}>{user.role === 'operator' ? 'I want to answer questions' : 'Switch to help-seeker view'}</button>}
      <button className="logout-button" onClick={() => setLogoutOpen(true)}>Log out</button>
    </aside>
    <div className="dashboard-main">
      <header className="dashboard-topbar"><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle dashboard menu">☰</button><div><h1>{title}</h1><p>{subtitle}</p></div><div className="user-avatar" aria-label={`Signed in as ${user.name}`}>{user.name.charAt(0)}</div></header>
      <main id="dashboard-content">{children}</main>
    </div>
    {logoutOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setLogoutOpen(false) }}><section className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="logout-title" aria-describedby="logout-description"><span className="modal-icon" aria-hidden="true">↗</span><div><p className="eyebrow">Confirm logout</p><h2 id="logout-title">Ready to leave your dashboard?</h2><p id="logout-description">You’ll need to log in again to access your questions, answers, and account activity.</p></div><div className="modal-actions"><button ref={cancelButtonRef} type="button" className="secondary-button" onClick={() => setLogoutOpen(false)}>Stay signed in</button><button type="button" className="danger-button" onClick={onLogout}>Yes, log me out</button></div></section></div>}
  </div>
}
