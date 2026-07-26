import type { ISODateString } from './common.types'

export interface FinancialRecord {
  id: string
  date: ISODateString
  name: string
  amount: number
  created_at: string
  updated_at: string
}

export interface FinancialFormValues {
  date: string
  name: string
  amount: number
}

export interface FinancialFilters {
  from: string
  search: string
  to: string
}
