const API_URL = (import.meta.env.VITE_API_URL || 'https://e-comsupport-backend.onrender.com/api/v1').replace(/\/$/, '')

export async function api(path, options = {}) {
  const token = getSession()?.accessToken
  const method = (options.method || 'GET').toUpperCase()
  const tracksActivity = method !== 'GET'
  if (tracksActivity) window.dispatchEvent(new CustomEvent('api-activity', { detail: { active: true, message: activityMessage(path, method) } }))
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    })
    const body = await response.json().catch(() => null)
    if (!response.ok) {
      const message = Array.isArray(body?.message) ? body.message.join(', ') : body?.message
      throw new Error(message || `Request failed (${response.status})`)
    }
    return body
  } finally {
    if (tracksActivity) window.dispatchEvent(new CustomEvent('api-activity', { detail: { active: false } }))
  }
}

function activityMessage(path, method) {
  if (path === '/categories' && method === 'POST') return 'Creating category…'
  if (path.includes('/categories/')) return method === 'DELETE' ? 'Removing category…' : 'Updating category…'
  if (path.includes('/expert-applications')) return 'Updating expert application…'
  if (path.includes('/answers') && path.includes('/accept')) return 'Accepting solution…'
  if (path.includes('/answers') && path.includes('/vote')) return 'Recording your vote…'
  if (path.includes('/answers')) return 'Posting answer…'
  if (path.includes('/questions')) return method === 'POST' ? 'Posting question…' : 'Updating question…'
  if (path.includes('/notifications')) return 'Updating notifications…'
  if (path.includes('/profile')) return 'Saving profile…'
  if (path.includes('/moderation')) return 'Resolving moderation item…'
  if (path.includes('/escalations')) return 'Notifying experts…'
  if (path.includes('/admin/users/admin')) return 'Creating administrator…'
  if (path.includes('/admin/users')) return 'Updating account access…'
  if (path.includes('/settings')) return 'Saving platform settings…'
  if (path.includes('/auth')) return 'Authenticating…'
  return 'Completing your request…'
}

export function getSession() {
  try { return JSON.parse(localStorage.getItem('support-session')) }
  catch { return null }
}

export function normalizeUser(user) {
  return { ...user, role: user.role.toLowerCase(), verificationStatus: user.role === 'EXPERT' ? 'pending' : 'not-required' }
}
