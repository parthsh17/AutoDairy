import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { measureRouteTransition } from '@/lib/monitoring'

export function RouteMonitor() {
  const location = useLocation()

  useEffect(() => {
    measureRouteTransition(`${location.pathname}${location.search}`)
  }, [location.pathname, location.search])

  return null
}
