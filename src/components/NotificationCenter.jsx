import { api } from '../lib/api.js'

export function NotificationCenter({ notifications, setNotifications, onError }) {
  const markAll = async () => {
    try {
      await api('/notifications/read-all', { method: 'PATCH' })
      setNotifications(items => items.map(item => ({ ...item, isRead: true })))
    } catch (error) { onError(error) }
  }
  const toggle = async item => {
    const isRead = !item.isRead
    setNotifications(items => items.map(entry => entry.id === item.id ? { ...entry, isRead } : entry))
    try { await api(`/notifications/${item.id}/read`, { method: 'PATCH', body: JSON.stringify({ isRead }) }) }
    catch (error) {
      setNotifications(items => items.map(entry => entry.id === item.id ? item : entry))
      onError(error)
    }
  }
  const remove = async item => {
    if (!window.confirm('Delete this notification?')) return
    const previous = notifications
    setNotifications(items => items.filter(entry => entry.id !== item.id))
    try { await api(`/notifications/${item.id}`, { method: 'DELETE' }) }
    catch (error) { setNotifications(previous); onError(error) }
  }
  return <section className="panel notification-center">
    <div className="board-toolbar"><h4>Notifications</h4><button className="text-button" onClick={markAll}>Mark all as read</button></div>
    {notifications.length ? notifications.map(item => <article className={`notification-row ${!item.isRead ? 'unread' : ''}`} key={item.id}>
      <span className="notification-dot"/><div><strong>{item.title}</strong><p>{item.detail}</p><div className="notification-actions"><button className="text-button" onClick={() => toggle(item)}>{item.isRead ? 'Mark unread' : 'Mark read'}</button><button className="text-button danger" onClick={() => remove(item)}>Delete</button></div></div>
      <time title={new Date(item.createdAt).toLocaleString()}>{new Date(item.createdAt).toLocaleString()}</time>
    </article>) : <div className="empty-state"><strong>You’re all caught up</strong><p>New account activity will appear here.</p></div>}
  </section>
}
