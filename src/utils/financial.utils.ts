import type { FinancialFilters, FinancialRecord } from '@/types/financial.types'

export function filterFinancialRecords(records: FinancialRecord[], filters: FinancialFilters) {
  const search = filters.search.trim().toLocaleLowerCase()

  return records
    .filter((record) => {
      const matchesSearch = search.length === 0 || record.name.toLocaleLowerCase().includes(search)
      const matchesFrom = filters.from.length === 0 || record.date >= filters.from
      const matchesTo = filters.to.length === 0 || record.date <= filters.to

      return matchesSearch && matchesFrom && matchesTo
    })
    .sort((left, right) => {
      const dateOrder = right.date.localeCompare(left.date)
      return dateOrder !== 0 ? dateOrder : right.created_at.localeCompare(left.created_at)
    })
}

export function formatAmount(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 2,
    style: 'currency',
  }).format(amount)
}
