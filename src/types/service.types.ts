import type { AppError } from '@/lib/errors'

export type Result<TData, TError = AppError> =
  { data: TData; error: null; success: true } | { data: null; error: TError; success: false }

export type AsyncResult<TData, TError = AppError> = Promise<Result<TData, TError>>

export type ServiceOperation<TData> = () => Promise<TData>
