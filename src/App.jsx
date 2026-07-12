import { useEffect, useState } from 'react'
import './App.css'
import { LandingPage } from './pages/LandingPage.jsx'
import { AuthPage } from './pages/AuthPage.jsx'
import { OperatorDashboard } from './pages/OperatorDashboard.jsx'
import { ExpertDashboard } from './pages/ExpertDashboard.jsx'
import { AdminDashboard } from './pages/AdminDashboard.jsx'
import { GiveHelpPage } from './pages/GiveHelpPage.jsx'

const routes = ['/', '/give-help', '/login', '/signup', '/operator', '/expert', '/admin/login', '/admin/dashboard']

function readRoute() {
  const route = window.location.hash.slice(1) || '/'
  return routes.includes(route) ? route : '/'
}

function App() {
  const [route, setRoute] = useState(readRoute)
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem('support-session')) }
    catch { return null }
  })

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (nextRoute) => { window.location.hash = nextRoute }
  const authenticate = (user) => {
    localStorage.setItem('support-session', JSON.stringify(user))
    setSession(user)
    navigate(user.role === 'admin' ? '/admin/dashboard' : `/${user.role}`)
  }
  const logout = () => {
    localStorage.removeItem('support-session')
    setSession(null)
    navigate('/')
  }
  const switchView = (role) => {
    const nextSession = { ...session, role, verificationStatus: role === 'expert' ? (session.verificationStatus === 'approved' ? 'approved' : 'pending') : session.verificationStatus }
    localStorage.setItem('support-session', JSON.stringify(nextSession))
    setSession(nextSession)
    navigate(`/${role}`)
  }

  if (route === '/login' || route === '/signup') {
    return <AuthPage mode={route === '/login' ? 'login' : 'signup'} onAuthenticate={authenticate} navigate={navigate} />
  }
  if (route === '/admin/login') return <AuthPage mode="login" adminMode onAuthenticate={authenticate} navigate={navigate}/>

  if (route === '/') return <LandingPage navigate={navigate} session={session} />
  if (route === '/give-help') return <GiveHelpPage navigate={navigate} />

  const expectedRoute = session?.role === 'admin' ? '/admin/dashboard' : `/${session?.role}`
  if (!session || route !== expectedRoute) {
    if (route === '/admin/dashboard') return <AuthPage mode="login" adminMode onAuthenticate={authenticate} navigate={navigate} notice="Administrator authentication is required."/>
    return <AuthPage mode="login" onAuthenticate={authenticate} navigate={navigate} notice="Please log in with the correct role to access that dashboard." />
  }

  const dashboardProps = { user: session, onLogout: logout, navigate, onSwitchView: switchView }
  if (session.role === 'operator') return <OperatorDashboard {...dashboardProps} />
  if (session.role === 'expert') return <ExpertDashboard {...dashboardProps} />
  return <AdminDashboard {...dashboardProps} />
}

export default App
