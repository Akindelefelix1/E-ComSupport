import { useEffect, useRef } from 'react'

export function FeedbackModal({ open, title, message, onClose, actionLabel = 'Done' }) {
  const buttonRef = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    buttonRef.current?.focus()
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])
  if (!open) return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="confirmation-modal feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-title" aria-describedby="feedback-message"><span className="feedback-modal-icon" aria-hidden="true">✓</span><p className="eyebrow">Action completed</p><h2 id="feedback-title">{title}</h2><p id="feedback-message">{message}</p><div className="modal-actions"><button ref={buttonRef} type="button" className="primary-button" onClick={onClose}>{actionLabel}</button></div></section></div>
}
