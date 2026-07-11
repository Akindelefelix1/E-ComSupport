export function SectionHeading({ eyebrow, children, compact = false }) {
  return <div className={`section-heading ${compact ? 'compact' : ''}`}><p className="eyebrow">{eyebrow}</p><h3>{children}</h3></div>
}
