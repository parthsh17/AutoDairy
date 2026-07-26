import { formatDate, toISODate } from '@/utils/date.utils'
import type { ISODateString } from '@/types/common.types'
import type {
  AnalyticsCustomerPoint,
  AnalyticsCustomerRow,
  AnalyticsDateRange,
  AnalyticsDailyPoint,
  AnalyticsFinancialRow,
  AnalyticsMonthlyPoint,
  AnalyticsOverview,
  AnalyticsReport,
  AnalyticsSaleRow,
  AnalyticsShiftRow,
  AnalyticsShiftSummary,
  AnalyticsRangePreset,
  AnalyticsSourceData,
  AnalyticsCustomerSort,
} from '../types/analytics.types'

function amount(value: number | string | null | undefined) {
  return Number(value ?? 0)
}

export function getTodayRange(date = new Date()): AnalyticsDateRange {
  const iso = toISODate(date)
  return { from: iso, to: iso }
}

export function getYesterdayRange(date = new Date()): AnalyticsDateRange {
  const previous = new Date(date)
  previous.setDate(previous.getDate() - 1)
  const iso = toISODate(previous)
  return { from: iso, to: iso }
}

export function getMonthRange(date = new Date()): AnalyticsDateRange {
  return {
    from: toISODate(new Date(date.getFullYear(), date.getMonth(), 1)),
    to: toISODate(new Date(date.getFullYear(), date.getMonth() + 1, 0)),
  }
}

export function getPreviousMonthRange(date = new Date()): AnalyticsDateRange {
  return getMonthRange(new Date(date.getFullYear(), date.getMonth() - 1, 1))
}

export function getDefaultRange(preset: AnalyticsRangePreset, custom?: AnalyticsDateRange) {
  if (preset === 'today') return getTodayRange()
  if (preset === 'yesterday') return getYesterdayRange()
  if (preset === 'previous-month') return getPreviousMonthRange()
  if (preset === 'custom' && custom) return custom
  return getMonthRange()
}

export function getRangeLabel(range: AnalyticsRangePreset) {
  return range.replace('-', ' ')
}

export function buildAnalyticsOverview(
  shifts: AnalyticsShiftRow[],
  sales: AnalyticsSaleRow[],
  customers: AnalyticsCustomerRow[],
  income: AnalyticsFinancialRow[],
  expenses: AnalyticsFinancialRow[],
  range: AnalyticsDateRange,
): AnalyticsOverview {
  const activeCustomers = customers.filter((customer) =>
    customer.customer_memberships.some(
      (membership) =>
        membership.start_date <= range.to && (membership.end_date === null || membership.end_date >= range.from),
    ),
  ).length
  const shiftIds = new Set(shifts.map((shift) => shift.id))
  const rangeSales = sales.filter((sale) => shiftIds.has(sale.daily_shift_id))
  const totalMilkCollected = shifts.reduce((total, shift) => total + amount(shift.milk_collected), 0)
  const homeQuantity = shifts.reduce((total, shift) => total + amount(shift.home_quantity), 0)
  const totalMilkSold = rangeSales.reduce((total, sale) => total + amount(sale.quantity), 0)
  const revenue = rangeSales.reduce(
    (total, sale) => total + amount(sale.quantity) * amount(sale.daily_shifts?.milk_price),
    0,
  )
  const totalIncome = income.reduce((total, record) => total + amount(record.amount), 0)
  const totalExpenses = expenses.reduce((total, record) => total + amount(record.amount), 0)

  return {
    activeCustomers,
    expenses: totalExpenses,
    homeQuantity,
    income: totalIncome,
    netProfit: revenue + totalIncome - totalExpenses,
    remainingMilk: totalMilkCollected - homeQuantity - totalMilkSold,
    revenue,
    totalMilkCollected,
    totalMilkSold,
  }
}

export function buildDailySeries(
  shifts: AnalyticsShiftRow[],
  sales: AnalyticsSaleRow[],
  income: AnalyticsFinancialRow[],
  expenses: AnalyticsFinancialRow[],
  range: AnalyticsDateRange,
): AnalyticsDailyPoint[] {
  const dates = new Set<string>([
    ...shifts.map((shift) => shift.date),
    ...income.map((record) => record.date),
    ...expenses.map((record) => record.date),
  ])
  const shiftById = new Map(shifts.map((shift) => [shift.id, shift]))
  for (const sale of sales) {
    const shift = shiftById.get(sale.daily_shift_id)
    if (shift) dates.add(shift.date)
  }

  return [...dates]
    .filter((date) => date >= range.from && date <= range.to)
    .sort()
    .map((date) => {
      const dayShifts = shifts.filter((shift) => shift.date === date)
      const ids = new Set(dayShifts.map((shift) => shift.id))
      const daySales = sales.filter((sale) => ids.has(sale.daily_shift_id))
      const morningShifts = dayShifts.filter((shift) => shift.shift === 'Morning')
      const eveningShifts = dayShifts.filter((shift) => shift.shift === 'Evening')
      const morningSales = daySales.filter((sale) => sale.daily_shifts?.shift === 'Morning')
      const eveningSales = daySales.filter((sale) => sale.daily_shifts?.shift === 'Evening')
      const morningRevenue = morningSales.reduce(
        (total, sale) => total + amount(sale.quantity) * amount(sale.daily_shifts?.milk_price),
        0,
      )
      const eveningRevenue = eveningSales.reduce(
        (total, sale) => total + amount(sale.quantity) * amount(sale.daily_shifts?.milk_price),
        0,
      )
      const totalCollection = dayShifts.reduce((total, shift) => total + amount(shift.milk_collected), 0)
      const totalHome = dayShifts.reduce((total, shift) => total + amount(shift.home_quantity), 0)
      const totalSales = daySales.reduce((total, sale) => total + amount(sale.quantity), 0)
      const revenue = morningRevenue + eveningRevenue
      const totalIncome = income
        .filter((record) => record.date === date)
        .reduce((total, record) => total + amount(record.amount), 0)
      const totalExpenses = expenses
        .filter((record) => record.date === date)
        .reduce((total, record) => total + amount(record.amount), 0)

      return {
        collection: totalCollection,
        date: date as ISODateString,
        eveningCollection: eveningShifts.reduce((total, shift) => total + amount(shift.milk_collected), 0),
        eveningRevenue,
        eveningSales: eveningSales.reduce((total, sale) => total + amount(sale.quantity), 0),
        expenses: totalExpenses,
        homeQuantity: totalHome,
        income: totalIncome,
        label: formatDate(date),
        morningCollection: morningShifts.reduce((total, shift) => total + amount(shift.milk_collected), 0),
        morningRevenue,
        morningSales: morningSales.reduce((total, sale) => total + amount(sale.quantity), 0),
        profit: revenue + totalIncome - totalExpenses,
        remainingMilk: totalCollection - totalHome - totalSales,
        revenue,
        sales: totalSales,
      }
    })
}

export function buildShiftSummary(shifts: AnalyticsShiftRow[], sales: AnalyticsSaleRow[]): AnalyticsShiftSummary {
  const shiftIds = new Set(shifts.map((shift) => shift.id))
  const rangeSales = sales.filter((sale) => shiftIds.has(sale.daily_shift_id))
  const morningShifts = shifts.filter((shift) => shift.shift === 'Morning')
  const eveningShifts = shifts.filter((shift) => shift.shift === 'Evening')
  const morningSales = rangeSales.filter((sale) => sale.daily_shifts?.shift === 'Morning')
  const eveningSales = rangeSales.filter((sale) => sale.daily_shifts?.shift === 'Evening')

  return {
    evening: {
      collection: eveningShifts.reduce((total, shift) => total + amount(shift.milk_collected), 0),
      revenue: eveningSales.reduce(
        (total, sale) => total + amount(sale.quantity) * amount(sale.daily_shifts?.milk_price),
        0,
      ),
      sales: eveningSales.reduce((total, sale) => total + amount(sale.quantity), 0),
    },
    morning: {
      collection: morningShifts.reduce((total, shift) => total + amount(shift.milk_collected), 0),
      revenue: morningSales.reduce(
        (total, sale) => total + amount(sale.quantity) * amount(sale.daily_shifts?.milk_price),
        0,
      ),
      sales: morningSales.reduce((total, sale) => total + amount(sale.quantity), 0),
    },
  }
}

export function buildCustomerSummary(
  customers: AnalyticsCustomerRow[],
  range: AnalyticsDateRange,
  sales: AnalyticsSaleRow[],
) {
  const activeCustomers = customers.filter((customer) =>
    customer.customer_memberships.some(
      (membership) =>
        membership.start_date <= range.to && (membership.end_date === null || membership.end_date >= range.from),
    ),
  )
  const customerIds = new Set(activeCustomers.map((customer) => customer.id))
  const rangeSales = sales.filter((sale) => customerIds.has(sale.customer_id))
  const totalQuantity = rangeSales.reduce((total, sale) => total + amount(sale.quantity), 0)
  return {
    activeCustomers: activeCustomers.length,
    averageQuantityPerCustomer: activeCustomers.length === 0 ? 0 : totalQuantity / activeCustomers.length,
    inactiveCustomers: Math.max(customers.length - activeCustomers.length, 0),
    totalCustomers: customers.length,
  }
}

export function buildCustomerInsights(
  customers: AnalyticsCustomerRow[],
  sales: AnalyticsSaleRow[],
  range: AnalyticsDateRange,
  sort: AnalyticsCustomerSort,
) {
  const activeCustomers = customers.filter((customer) =>
    customer.customer_memberships.some(
      (membership) =>
        membership.start_date <= range.to && (membership.end_date === null || membership.end_date >= range.from),
    ),
  )
  const totals = new Map<string, { customerId: string; customerName: string; quantity: number; revenue: number }>()
  for (const sale of sales) {
    const shift = sale.daily_shifts
    if (!shift || shift.date < range.from || shift.date > range.to) continue
    const current = totals.get(sale.customer_id) ?? {
      customerId: sale.customer_id,
      customerName: sale.customers?.name ?? 'Unknown customer',
      quantity: 0,
      revenue: 0,
    }
    current.quantity += amount(sale.quantity)
    current.revenue += amount(sale.quantity) * amount(shift.milk_price)
    totals.set(sale.customer_id, current)
  }

  const points = activeCustomers.map<AnalyticsCustomerPoint>((customer) => {
    const point = totals.get(customer.id) ?? {
      customerId: customer.id,
      customerName: customer.name,
      quantity: 0,
      revenue: 0,
    }
    return point
  })

  const comparator = {
    quantity: (left: AnalyticsCustomerPoint, right: AnalyticsCustomerPoint) =>
      right.quantity - left.quantity || left.customerName.localeCompare(right.customerName),
    revenue: (left: AnalyticsCustomerPoint, right: AnalyticsCustomerPoint) =>
      right.revenue - left.revenue || left.customerName.localeCompare(right.customerName),
    name: (left: AnalyticsCustomerPoint, right: AnalyticsCustomerPoint) =>
      left.customerName.localeCompare(right.customerName),
  }[sort]

  const sorted = [...points].sort(comparator)

  return {
    averageQuantityPerCustomer:
      activeCustomers.length === 0
        ? 0
        : sorted.reduce((total, item) => total + item.quantity, 0) / activeCustomers.length,
    lowestQuantity: [...sorted]
      .sort((left, right) => left.quantity - right.quantity || left.customerName.localeCompare(right.customerName))
      .slice(0, 8),
    topByQuantity: [...sorted]
      .sort((left, right) => right.quantity - left.quantity || left.customerName.localeCompare(right.customerName))
      .slice(0, 8),
    topByRevenue: [...sorted]
      .sort((left, right) => right.revenue - left.revenue || left.customerName.localeCompare(right.customerName))
      .slice(0, 8),
  }
}

export function buildMonthlySeries(
  shifts: AnalyticsShiftRow[],
  sales: AnalyticsSaleRow[],
  income: AnalyticsFinancialRow[],
  expenses: AnalyticsFinancialRow[],
  year: number,
): AnalyticsMonthlyPoint[] {
  return Array.from({ length: 12 }, (_, index) => index + 1).map((month) => {
    const monthPrefix = `${year}-${String(month).padStart(2, '0')}`
    const monthShifts = shifts.filter((shift) => shift.date.startsWith(monthPrefix))
    const ids = new Set(monthShifts.map((shift) => shift.id))
    const monthSales = sales.filter((sale) => ids.has(sale.daily_shift_id))
    const monthIncome = income.filter((record) => record.date.startsWith(monthPrefix))
    const monthExpenses = expenses.filter((record) => record.date.startsWith(monthPrefix))
    const revenue = monthSales.reduce(
      (total, sale) => total + amount(sale.quantity) * amount(sale.daily_shifts?.milk_price),
      0,
    )
    const totalIncome = monthIncome.reduce((total, record) => total + amount(record.amount), 0)
    const totalExpenses = monthExpenses.reduce((total, record) => total + amount(record.amount), 0)

    return {
      expenses: totalExpenses,
      income: totalIncome,
      label: new Intl.DateTimeFormat('en-IN', { month: 'short', timeZone: 'UTC' }).format(
        new Date(Date.UTC(year, month - 1, 1)),
      ),
      milkSold: monthSales.reduce((total, sale) => total + amount(sale.quantity), 0),
      month: String(month).padStart(2, '0'),
      profit: revenue + totalIncome - totalExpenses,
      revenue,
    }
  })
}

export function buildAnalyticsReport(
  source: AnalyticsSourceData,
  range: AnalyticsDateRange,
  sort: AnalyticsCustomerSort,
): AnalyticsReport {
  const rangeShifts = source.shifts.filter((shift) => shift.date >= range.from && shift.date <= range.to)
  const shiftIds = new Set(rangeShifts.map((shift) => shift.id))
  const rangeSales = source.sales.filter((sale) => shiftIds.has(sale.daily_shift_id))
  const rangeIncome = source.income.filter((record) => record.date >= range.from && record.date <= range.to)
  const rangeExpenses = source.expenses.filter((record) => record.date >= range.from && record.date <= range.to)
  const overview = buildAnalyticsOverview(rangeShifts, rangeSales, source.customers, rangeIncome, rangeExpenses, range)
  const shift = buildShiftSummary(rangeShifts, rangeSales)
  const customerSummary = buildCustomerSummary(source.customers, range, rangeSales)
  const customerInsights = buildCustomerInsights(source.customers, rangeSales, range, sort)
  const dailySeries = buildDailySeries(rangeShifts, rangeSales, rangeIncome, rangeExpenses, range)
  const monthlySeries = buildMonthlySeries(
    source.shifts,
    source.sales,
    source.income,
    source.expenses,
    new Date(range.to).getUTCFullYear(),
  )

  return {
    customers: customerSummary,
    customerInsights,
    dailySeries,
    financial: {
      expenses: overview.expenses,
      income: overview.income,
      netProfit: overview.netProfit,
      revenue: overview.revenue,
    },
    hasData: rangeShifts.length > 0 || rangeIncome.length > 0 || rangeExpenses.length > 0 || rangeSales.length > 0,
    milk: {
      homeConsumption: overview.homeQuantity,
      remainingMilk: overview.remainingMilk,
      totalCollection: overview.totalMilkCollected,
      totalSales: overview.totalMilkSold,
    },
    monthlySeries,
    overview,
    range,
    shift,
  }
}

export function exportAnalyticsCsv(report: AnalyticsReport) {
  const rows = [
    ['Metric', 'Value'],
    ['Total Milk Collected', report.overview.totalMilkCollected],
    ['Total Milk Sold', report.overview.totalMilkSold],
    ['Home Quantity', report.overview.homeQuantity],
    ['Remaining Milk', report.overview.remainingMilk],
    ['Revenue', report.overview.revenue],
    ['Income', report.overview.income],
    ['Expenses', report.overview.expenses],
    ['Net Profit', report.overview.netProfit],
    ['Active Customers', report.overview.activeCustomers],
  ]
  return rows.map((row) => row.join(',')).join('\n')
}

export function getAnalyticsTitle(range: AnalyticsDateRange) {
  return `${formatDate(range.from)} to ${formatDate(range.to)}`
}
