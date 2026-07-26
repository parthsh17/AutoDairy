export type ErrorCode = 'UNKNOWN_ERROR' | 'VALIDATION_ERROR' | 'NETWORK_ERROR' | 'DATABASE_ERROR' | 'NOT_FOUND'

export class AppError extends Error {
  readonly code: ErrorCode
  readonly cause: unknown
  readonly userMessage: string

  constructor(
    message: string,
    options: {
      cause?: unknown
      code?: ErrorCode
      userMessage?: string
    } = {},
  ) {
    super(message)
    this.name = 'AppError'
    this.code = options.code ?? 'UNKNOWN_ERROR'
    this.cause = options.cause
    this.userMessage = options.userMessage ?? 'Something went wrong. Please try again.'
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

export function normalizeError(error: unknown, fallbackMessage = 'The request could not be completed.') {
  if (isAppError(error)) {
    return error
  }

  if (error instanceof Error) {
    return new AppError(error.message || fallbackMessage, {
      cause: error,
      userMessage: fallbackMessage,
    })
  }

  return new AppError(fallbackMessage, { cause: error })
}

export function getUserFacingErrorMessage(error: unknown, fallbackMessage?: string) {
  if (isAppError(error)) {
    return error.userMessage
  }

  return fallbackMessage ?? 'Something went wrong. Please try again.'
}
