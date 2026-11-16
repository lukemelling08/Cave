import type { IconName } from '../components'

export type Route = 'dashboard' | 'rooms' | 'settings'

export const pages: Array<{ id: Route; label: string; icon: IconName }> = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'rooms', label: 'Rooms', icon: 'home' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

/** Reads the page from the URL hash, such as #/rooms. */
export function readRoute(): Route {
  const id = window.location.hash.replace(/^#\/?/, '')
  return pages.some((page) => page.id === id) ? (id as Route) : 'dashboard'
}
