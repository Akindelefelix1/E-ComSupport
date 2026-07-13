export function ActionLoading({ message }) {
  if (!message) return null
  return <div className="action-loading-backdrop" role="status" aria-live="polite" aria-busy="true">
    <div className="action-loading-card"><span className="action-spinner" aria-hidden="true"/><strong>{message}</strong><p>Please wait while we complete this action.</p></div>
  </div>
}
