import { formatDate, toISODate } from '@/utils/date.utils'
import type { ISODateString } from '@/types/common.types'
import type {
  DashboardActivity,
  DashboardCustomerRow,
  DashboardDateRange,
  DashboardFinancialRow,
  DashboardMonthSummary,
  DashboardSaleRow,
  DashboardSeriesPoint,
  DashboardShiftRow,
  DashboardSummary,
  CustomerQuantityPoint,
  ShiftCollectionPoint,
} from '../types/dashboard.types'

export function getMonthRange(date = new Date()): DashboardDateRange {
  return {
    from: toISODate(new Date(date.getFullYear(), date.getMonth(), 1)),
    to: toISODate(new Date(date.getFullYear(), date.getMonth() + 1, 0)),
  }
}

export function getPreviousMonthRange(date = new Date()): DashboardDateRange {
  return getMonthRange(new Date(date.getFullYear(), date.getMonth() - 1, 1))
}

export function getToday(): ISODateString {
  return toISODate(new Date())
}

function amount(value: number | string | null | undefined) {
  return Number(value ?? 0)
}

export function calculateRevenue(shifts: DashboardShiftRow[], sales: DashboardSaleRow[]) {
  const prices = new Map(shifts.map((shift) => [shift.id, amount(shift.milk_price)]))
  return sales.reduce((total, sale) => total + amount(sale.quantity) * (prices.get(sale.daily_shift_id) ?? 0), 0)
}

export function calculateSummary(
  shifts: DashboardShiftRow[],
  sales: DashboardSaleRow[],
  customers: DashboardCustomerRow[],
  date: ISODateString,
): DashboardSummary {
  const dateShifts = shifts.filter((shift) => shift.date === date)
  const shiftIds = new Set(dateShifts.map((shift) => shift.id))
  const dateSales = sales.filter((sale) => shiftIds.has(sale.daily_shift_id))
  const milkCollected = dateShifts.reduce((total, shift) => total + amount(shift.milk_collected), 0)
  const homeQuantity = dateShifts.reduce((total, shift) => total + amount(shift.home_quantity), 0)
  const milkSold = dateSales.reduce((total, sale) => total + amount(sale.quantity), 0)
  const revenue = calculateRevenue(dateShifts, dateSales)
  const activeCustomers = customers.filter((customer) =>
    customer.customer_memberships.some(
      (membership) => membership.start_date <= date && (membership.end_date === null || membership.end_date >= date),
    ),
  ).length

  return {
    activeCustomers,
    homeQuantity,
    milkCollected,
    milkSold,
    remainingMilk: milkCollected - homeQuantity - milkSold,
    revenue,
  }
}

export function calculateMonthSummary(
  shifts: DashboardShiftRow[],
  sales: DashboardSaleRow[],
  income: DashboardFinancialRow[],
  expenses: DashboardFinancialRow[],
  range: DashboardDateRange,
): DashboardMonthSummary {
  const monthShifts = shifts.filter((shift) => shift.date >= range.from && shift.date <= range.to)
  const shiftIds = new Set(monthShifts.map((shift) => shift.id))
  const monthSales = sales.filter((sale) => shiftIds.has(sale.daily_shift_id))
  const revenue = calculateRevenue(monthShifts, monthSales)
  const totalIncome = income
    .filter((item) => item.date >= range.from && item.date <= range.to)
    .reduce((total, item) => total + amount(item.amount), 0)
  const totalExpenses = expenses
    .filter((item) => item.date >= range.from && item.date <= range.to)
    .reduce((total, item) => total + amount(item.amount), 0)
  return {
    expenses: totalExpenses,
    income: totalIncome,
    milkSold: monthSales.reduce((total, sale) => total + amount(sale.quantity), 0),
    netProfit: revenue + totalIncome - totalExpenses,
    revenue,
  }
}

export function buildSeries(
  shifts: DashboardShiftRow[],
  sales: DashboardSaleRow[],
  income: DashboardFinancialRow[],
  expenses: DashboardFinancialRow[],
  range: DashboardDateRange,
): DashboardSeriesPoint[] {
  const dates = new Set<string>([
    ...shifts.map((item) => item.date),
    ...income.map((item) => item.date),
    ...expenses.map((item) => item.date),
  ])
  const shiftsById = new Map(shifts.map((shift) => [shift.id, shift]))
  for (const sale of sales) {
    const shift = shiftsById.get(sale.daily_shift_id)
    if (shift) dates.add(shift.date)
  }
  return [...dates]
    .filter((date) => date >= range.from && date <= range.to)
    .sort()
    .map((date) => {
      const dayShifts = shifts.filter((shift) => shift.date === date)
      const dayIds = new Set(dayShifts.map((shift) => shift.id))
      const daySales = sales.filter((sale) => dayIds.has(sale.daily_shift_id))
      const revenue = calculateRevenue(dayShifts, daySales)
      const totalIncome = income
        .filter((item) => item.date === date)
        .reduce((total, item) => total + amount(item.amount), 0)
      const totalExpenses = expenses
        .filter((item) => item.date === date)
        .reduce((total, item) => total + amount(item.amount), 0)
      return {
        date: date as ISODateString,
        expenses: totalExpenses,
        income: totalIncome,
        label: formatDate(date),
        milkSold: daySales.reduce((total, sale) => total + amount(sale.quantity), 0),
        profit: revenue + totalIncome - totalExpenses,
        revenue,
      }
    })
}

export function buildShiftCollection(shifts: DashboardShiftRow[], range: DashboardDateRange): ShiftCollectionPoint[] {
  return ['Morning', 'Evening'].map((shift) => ({
    quantity: shifts
      .filter((item) => item.shift === shift && item.date >= range.from && item.date <= range.to)
      .reduce((total, item) => total + amount(item.milk_collected), 0),
    shift,
  }))
}

export function buildTopCustomers(
  shifts: DashboardShiftRow[],
  sales: DashboardSaleRow[],
  range: DashboardDateRange,
): CustomerQuantityPoint[] {
  const shiftIds = new Set(
    shifts.filter((shift) => shift.date >= range.from && shift.date <= range.to).map((shift) => shift.id),
  )
  const totals = new Map<string, number>()
  for (const sale of sales) {
    if (!shiftIds.has(sale.daily_shift_id)) continue
    const name = sale.customers?.name ?? 'Unknown customer'
    totals.set(name, (totals.get(name) ?? 0) + amount(sale.quantity))
  }
  return [...totals.entries()]
    .map(([customer, quantity]) => ({ customer, quantity }))
    .sort((left, right) => right.quantity - left.quantity)
    .slice(0, 8)
}

export function buildActivity(
  shifts: DashboardShiftRow[],
  sales: DashboardSaleRow[],
  income: DashboardFinancialRow[],
  expenses: DashboardFinancialRow[],
): DashboardActivity[] {
  const shiftsById = new Map(shifts.map((shift) => [shift.id, shift]))
  const saleActivities = sales.map((sale) => {
    const shift = shiftsById.get(sale.daily_shift_id)
    const revenue = amount(sale.quantity) * amount(shift?.milk_price)
    return {
      amount: revenue,
      createdAt: sale.created_at,
      date: shift?.date ?? getToday(),
      id: sale.id,
      subtitle: `${amount(sale.quantity)} L sold`,
      title: sale.customers?.name ?? 'Customer sale',
      type: 'sale' as const,
    }
  })
  const financialActivities = (records: DashboardFinancialRow[], type: 'income' | 'expense') =>
    records.map((record) => ({
      amount: amount(record.amount),
      createdAt: record.created_at,
      date: record.date,
      id: record.id,
      subtitle: type === 'income' ? 'Income' : 'Expense',
      title: record.name,
      type,
    }))
  return [...saleActivities, ...financialActivities(income, 'income'), ...financialActivities(expenses, 'expense')]
    .sort((left, right) => `${right.date}${right.createdAt}`.localeCompare(`${left.date}${left.createdAt}`))
    .slice(0, 8)
}
