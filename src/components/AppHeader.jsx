export function AppHeader({ navigate }) {
  return <header className="topbar public-header"><button className="brand-button" onClick={() => navigate('/')} aria-label="E-Com Support home"><span className="brand-mark">E</span><span>E-Com Support</span></button><nav className="topnav" aria-label="Primary navigation"><a href="#how-it-works">How It Works</a><a href="#solution-archive">Solution Archive</a><button onClick={() => navigate('/give-help')}>Give Help</button><button onClick={() => navigate('/login')}>Log In</button></nav></header>
}
