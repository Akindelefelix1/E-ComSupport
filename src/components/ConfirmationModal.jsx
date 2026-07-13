import { useEffect, useRef } from 'react'

export function ConfirmationModal({ open, title, message, confirmLabel = 'Confirm', danger = false, onConfirm, onCancel }) {
  const cancelRef = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    cancelRef.current?.focus()
    const keydown = event => { if (event.key === 'Escape') onCancel() }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [open, onCancel])
  if (!open) return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)onCancel()}}><section className="confirmation-modal" role="alertdialog" aria-modal="true" aria-labelledby="confirmation-title" aria-describedby="confirmation-message"><span className={`modal-icon ${danger?'danger-confirmation-icon':''}`} aria-hidden="true">!</span><p className="eyebrow">Confirmation required</p><h2 id="confirmation-title">{title}</h2><p id="confirmation-message">{message}</p><div className="modal-actions"><button ref={cancelRef} type="button" className="secondary-button" onClick={onCancel}>Cancel</button><button type="button" className={danger?'danger-button':'primary-button'} onClick={onConfirm}>{confirmLabel}</button></div></section></div>
}
