import { useState } from 'react'

const roleLabels = { operator: 'Operator', expert: 'Verified Expert', admin: 'Moderator / Admin' }

export function DashboardLayout({ user, onLogout, title, subtitle, tabs, activeTab, onTabChange, children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="dashboard-shell">
    <a className="skip-link" href="#dashboard-content">Skip to dashboard content</a>
    <aside className={`dashboard-sidebar ${menuOpen ? 'open' : ''}`}>
      <button className="brand-button" onClick={() => window.location.hash = '/'} aria-label="Go to home"><span className="brand-mark">E</span><span>E-Com Support</span></button>
      <div className="sidebar-role"><span>{roleLabels[user.role]}</span><strong>{user.name}</strong></div>
      <nav className="dashboard-nav" aria-label={`${roleLabels[user.role]} dashboard`}>
        {tabs.map((tab) => <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} aria-current={activeTab === tab.id ? 'page' : undefined} onClick={() => { onTabChange(tab.id); setMenuOpen(false) }}>{tab.label}</button>)}
      </nav>
      <button className="logout-button" onClick={onLogout}>Log out</button>
    </aside>
    <div className="dashboard-main">
      <header className="dashboard-topbar"><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle dashboard menu">☰</button><div><p className="eyebrow">{roleLabels[user.role]} workspace</p><h1>{title}</h1><p>{subtitle}</p></div><div className="user-avatar" aria-label={`Signed in as ${user.name}`}>{user.name.charAt(0)}</div></header>
      <main id="dashboard-content">{children}</main>
    </div>
  </div>
}
