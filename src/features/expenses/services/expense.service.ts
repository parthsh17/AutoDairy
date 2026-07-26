import { ExpenseRepository } from './expense.repository'
import type { FinancialFormValues } from '@/types/financial.types'

export class ExpenseService {
  private readonly repository: ExpenseRepository

  constructor(repository = new ExpenseRepository()) {
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

export const expenseService = new ExpenseService()
