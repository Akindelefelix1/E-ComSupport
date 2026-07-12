const API_URL = (import.meta.env.VITE_API_URL || 'https://e-comsupport-backend.onrender.com/api/v1').replace(/\/$/, '')

export async function api(path, options = {}) {
  const token = getSession()?.accessToken
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const body = await response.json().catch(() => null)
  if (!response.ok) {
    const message = Array.isArray(body?.message) ? body.message.join(', ') : body?.message
    throw new Error(message || `Request failed (${response.status})`)
  }
  return body
}

export function getSession() {
  try { return JSON.parse(localStorage.getItem('support-session')) }
  catch { return null }
}

export function normalizeUser(user) {
  return { ...user, role: user.role.toLowerCase(), verificationStatus: user.role === 'EXPERT' ? 'approved' : 'not-required' }
}
