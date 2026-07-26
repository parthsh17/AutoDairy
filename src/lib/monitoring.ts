import { logger } from './logger'
import { publicEnv } from './env'

export interface MonitoringEvent {
  name: string
  timestamp: string
  data?: Record<string, unknown>
}

export interface MonitoringProvider {
  captureError(error: unknown, context?: Record<string, unknown>): void
  captureEvent(event: MonitoringEvent): void
}

const noopProvider: MonitoringProvider = {
  captureError: () => undefined,
  captureEvent: () => undefined,
}

let provider: MonitoringProvider = noopProvider

export function configureMonitoring(nextProvider: MonitoringProvider) {
  provider = nextProvider
}

export function reportError(error: unknown, context?: Record<string, unknown>) {
  provider.captureError(error, context)
  logger.error('Application error', { context })
}

export function reportEvent(name: string, data?: Record<string, unknown>) {
  provider.captureEvent({ name, timestamp: new Date().toISOString(), data })
}

export function createHttpMonitoringProvider(endpoint: string): MonitoringProvider {
  const send = (payload: Record<string, unknown>) => {
    void fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => undefined)
  }

  return {
    captureError: (error, context) => send({ type: 'error', error: serializeError(error), context }),
    captureEvent: (event) => send({ type: 'event', event }),
  }
}

function serializeError(error: unknown) {
  if (error instanceof Error) return { name: error.name, message: error.message, stack: error.stack }
  return { message: String(error) }
}

export function initializeMonitoring() {
  if (publicEnv.monitoringEndpoint) {
    configureMonitoring(createHttpMonitoringProvider(publicEnv.monitoringEndpoint))
  }

  window.addEventListener('error', (event) => reportError(event.error ?? event.message, { source: 'window' }))
  window.addEventListener('unhandledrejection', (event) => reportError(event.reason, { source: 'promise' }))
}

export function measureRouteTransition(path: string) {
  const routeId = encodeURIComponent(path)
  const startMark = `route-start:${routeId}`
  const endMark = `route-end:${routeId}`
  const measureName = `route-duration:${routeId}`

  performance.mark(startMark)
  requestAnimationFrame(() => {
    performance.mark(endMark)
    performance.measure(measureName, startMark, endMark)
    const duration = performance.getEntriesByName(measureName).at(-1)?.duration
    reportEvent('route_transition', { path, durationMs: duration })
    performance.clearMarks(startMark)
    performance.clearMarks(endMark)
    performance.clearMeasures(measureName)
  })
}
