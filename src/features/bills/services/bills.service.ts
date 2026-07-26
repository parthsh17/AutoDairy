import type { BillMonthFilter } from '../types/bill.types'
import { billsRepository } from './bills.repository'
import { buildBillRows, calculateBillSummary, getMonthRange } from '../utils/bill.utils'

export async function loadMonthlyBills(filter: BillMonthFilter) {
  const month = Number(filter.month)
  const year = Number(filter.year)
  const { from, to } = getMonthRange(year, month)
  const source = await billsRepository.loadMonth(from, to)
  const rows = buildBillRows(source.customers, source.sales, from, to)

  return {
    billingPeriod: { from, to },
    rows,
    summary: calculateBillSummary(rows),
  }
}
