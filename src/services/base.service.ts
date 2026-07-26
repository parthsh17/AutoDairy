import { normalizeError } from '@/lib/errors'
import type { AsyncResult, ServiceOperation } from '@/types/service.types'

export abstract class BaseService {
  protected async execute<TData>(operation: ServiceOperation<TData>): Promise<TData> {
    try {
      return await operation()
    } catch (error) {
      throw normalizeError(error)
    }
  }

  protected async executeAsResult<TData>(operation: ServiceOperation<TData>): AsyncResult<TData> {
    try {
      return { data: await operation(), error: null, success: true }
    } catch (error) {
      return { data: null, error: normalizeError(error), success: false }
    }
  }
}
