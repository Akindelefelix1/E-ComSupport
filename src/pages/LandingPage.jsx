import { useEffect } from 'react'
import { AppHeader } from '../components/AppHeader.jsx'
import { operatorStats, roleCards, workflowSteps } from '../data/platformData.js'
import supportJourney from '../assets/support-journey-hero.png'
import verifiedExperts from '../assets/verified-experts.png'
import solutionArchive from '../assets/solution-archive.png'
import { FeatureIcon } from '../components/FeatureIcon.jsx'

export function LandingPage({ navigate, session }) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.16, rootMargin: '0px 0px -50px' })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return <div className="app-shell"><a className="skip-link" href="#main-content">Skip to content</a><AppHeader navigate={navigate} />
    <main id="main-content">
      <section className="hero landing-hero panel"><div className="hero-copy"><p className="eyebrow">Support that never leaves you waiting</p><h2>Real e-commerce problems. Verified people. Clear answers.</h2><p className="hero-text">A welcoming technical support community for independent store owners—built around accountable experts and solutions that stay useful.</p><div className="hero-actions">{session ? <button className="primary-button" onClick={() => navigate(`/${session.role}`)}>Open my dashboard</button> : <><button className="primary-button" onClick={() => navigate('/signup')}>Create free account</button><button className="secondary-button" onClick={() => navigate('/login')}>Log in</button></>}</div></div><figure className="hero-visual"><img src={supportJourney} alt="A store owner with a checkout problem connects with verified support experts who help resolve it successfully" /><figcaption><span>Problem identified</span><span>Verified expert matched</span><span>Solution confirmed</span></figcaption></figure><div className="stat-grid hero-stats" aria-label="Platform highlights">{operatorStats.map((item) => <article className="stat-card" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>)}</div></section>
      <section id="roles" className="section-block reveal-section" data-reveal><div className="section-heading"><p className="eyebrow">One platform, three clear roles</p><h3>Every user gets a workspace designed for their job.</h3></div><div className="role-grid">{roleCards.map((role) => <article className="role-card reveal-child swell-card" key={role.id}><FeatureIcon name={role.id} /><p className="role-label">{role.label}</p><h4>{role.title}</h4><p>{role.summary}</p><ul>{role.actions.map((action) => <li key={action}>{action}</li>)}</ul></article>)}</div></section>
      <section className="visual-stories reveal-section" data-reveal><article className="visual-story reveal-child swell-card"><div className="story-image"><img src={verifiedExperts} alt="A diverse team of verified experts collaborates to send trusted support to a store operator" /></div><div className="story-copy"><FeatureIcon name="expert"/><p className="eyebrow">Verified human expertise</p><h3>Answers come from people whose experience has been reviewed.</h3><p>Experts build visible reputation through prompt, helpful answers—not anonymous advice.</p></div></article><article className="visual-story reverse reveal-child swell-card"><div className="story-image"><img src={solutionArchive} alt="A store operator discovers an accepted answer in an organized searchable solution library" /></div><div className="story-copy"><span className="feature-icon" aria-hidden="true">⌕</span><p className="eyebrow">Knowledge that stays useful</p><h3>Every accepted answer becomes easier to discover again.</h3><p>Search and category filters turn yesterday’s solutions into today’s fastest fix.</p></div></article></section>
      <section className="panel workflow-panel reveal-section" data-reveal><div className="section-heading compact"><p className="eyebrow">How support works</p><h3>From problem to permanent solution.</h3></div><div className="workflow-grid">{workflowSteps.map((step) => <article className="workflow-step reveal-child" key={step.title}><strong>{step.title}</strong><p>{step.detail}</p></article>)}</div></section>
      <footer className="site-footer panel reveal-section" data-reveal>
        <div className="footer-cta"><div><p className="eyebrow">Support should feel simple</p><h3>Technical help without the intimidation.</h3><p>Join independent store owners and verified experts building a more useful support community.</p></div><button className="primary-button" onClick={() => navigate('/signup')}>Create free account</button></div>
        <div className="footer-content">
          <div className="footer-brand"><button className="brand-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><span className="brand-mark">E</span><span>E-Com Support</span></button><p>Accountable, accessible technical support for independent e-commerce operators.</p><span className="footer-status"><i aria-hidden="true" />Platform operating normally</span></div>
          <nav className="footer-column" aria-label="Platform"><strong>Platform</strong><a href="#roles">User roles</a><a href="#roles">How it works</a><button onClick={() => navigate('/login')}>Solution archive</button></nav>
          <nav className="footer-column" aria-label="Account"><strong>Account</strong><button onClick={() => navigate('/signup')}>Create account</button><button onClick={() => navigate('/login')}>Log in</button><button onClick={() => navigate('/signup')}>Apply as expert</button></nav>
          <nav className="footer-column" aria-label="Trust and support"><strong>Trust & support</strong><a href="#roles">Accessibility</a><a href="#roles">Community guidelines</a><a href="mailto:support@ecomsupport.example">Contact support</a></nav>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} E-Com Support Hub</span><div><a href="#roles">Privacy</a><a href="#roles">Terms</a><span>WCAG 2.1 AA minded</span></div></div>
      </footer>
    </main></div>
}
