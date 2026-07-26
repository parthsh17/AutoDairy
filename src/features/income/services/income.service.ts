import { IncomeRepository } from './income.repository'
import type { FinancialFormValues } from '@/types/financial.types'

export class IncomeService {
  private readonly repository: IncomeRepository

  constructor(repository = new IncomeRepository()) {
    this.repository = repository
  }

  list() {
    return this.repository.list()
  }

  create(values: FinancialFormValues) {
    return this.repository.create({ amount: values.amount, date: values.date, name: values.name.trim() })
  }

  update(id: string, values: FinancialFormValues) {
    return this.repository.update(id, { amount: values.amount, date: values.date, name: values.name.trim() })
  }

  delete(id: string) {
    return this.repository.delete(id)
  }
}

export const incomeService = new IncomeService()
