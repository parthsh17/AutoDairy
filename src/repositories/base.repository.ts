import { BaseService } from '@/services/base.service'
import { AppError } from '@/lib/errors'

export abstract class BaseRepository<TEntity> extends BaseService {
  protected readonly resourceName: string

  protected constructor(resourceName: string) {
    super()
    this.resourceName = resourceName
  }

  protected assertEntity(value: TEntity | null | undefined): TEntity {
    if (value === null || value === undefined) {
      throw new AppError(`${this.resourceName} was not found`, {
        code: 'NOT_FOUND',
        userMessage: 'The requested record could not be found.',
      })
    }

    return value
  }
}
