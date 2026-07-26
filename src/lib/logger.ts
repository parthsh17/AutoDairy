export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: unknown
}

function write(level: LogLevel, message: string, context?: LogContext) {
  if (import.meta.env.PROD && level === 'debug') return

  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(context ? { context } : {}),
  }

  if (level === 'error') console.error(JSON.stringify(entry))
  else if (level === 'warn') console.warn(JSON.stringify(entry))
  else if (level === 'info') console.info(JSON.stringify(entry))
  else console.debug(JSON.stringify(entry))
}

export const logger = {
  debug: (message: string, context?: LogContext) => write('debug', message, context),
  info: (message: string, context?: LogContext) => write('info', message, context),
  warn: (message: string, context?: LogContext) => write('warn', message, context),
  error: (message: string, context?: LogContext) => write('error', message, context),
}
