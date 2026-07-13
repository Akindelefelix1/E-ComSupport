import { useState } from 'react'
import { api } from '../lib/api.js'

export function AccountSecurity({ onFeedback }) {
  const [open, setOpen] = useState(false)
  const submit = async event => {
    event.preventDefault()
    const form = event.currentTarget, data = new FormData(form)
    if (data.get('password') !== data.get('confirm')) return onFeedback({ title: 'Password not changed', message: 'The new passwords do not match.' })
    try {
      await api('/auth/change-password', { method: 'POST', body: JSON.stringify({ currentPassword: data.get('currentPassword'), password: data.get('password') }) })
      form.reset(); setOpen(false); onFeedback({ title: 'Password changed', message: 'Use your new password the next time you sign in.' })
    } catch (error) { onFeedback({ title: 'Password could not be changed', message: error.message }) }
  }
  return <section className="panel account-security"><div className="board-toolbar"><div><h4>Account security</h4><p>Update the password used to access your account.</p></div><button className="secondary-button" onClick={() => setOpen(value => !value)}>{open ? 'Cancel' : 'Change password'}</button></div>{open && <form className="dashboard-form embedded" onSubmit={submit}><label>Current password<input name="currentPassword" type="password" required/></label><label>New password<input name="password" type="password" minLength="8" required/></label><label>Confirm new password<input name="confirm" type="password" minLength="8" required/></label><button className="primary-button">Save new password</button></form>}</section>
}
