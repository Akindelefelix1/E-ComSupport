export function InlineActivity({ label = 'Loading' }) {
  return <span className="inline-activity" role="status" aria-label={label}><i aria-hidden="true"/></span>
}
