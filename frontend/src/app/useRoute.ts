import { useEffect, useState } from 'react'
import { readRoute, type Route } from './routes'

/**
 * Hash-based routing, so pages survive a refresh and the back button works
 * without a router dependency.
 */
export function useRoute(): [Route, (route: Route) => void] {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const onHashChange = () => {
      setRoute(readRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function navigate(next: Route) {
    window.location.hash = `/${next}`
  }

  return [route, navigate]
}
