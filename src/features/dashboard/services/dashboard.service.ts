import { dashboardRepository } from './dashboard.repository'
import {
  calculateMonthSummary,
  calculateSummary,
  buildActivity,
  buildSeries,
  buildShiftCollection,
  buildTopCustomers,
  getMonthRange,
  getToday,
} from '../utils/dashboard.utils'
import type { DashboardDateRange, DashboardData } from '../types/dashboard.types'

export async function loadDashboard(range: DashboardDateRange): Promise<DashboardData> {
  const today = getToday()
  const currentMonth = getMonthRange()
  const source = await dashboardRepository.load({
    from: range.from < currentMonth.from ? range.from : currentMonth.from,
    to: range.to > currentMonth.to ? range.to : currentMonth.to,
  })
  const series = buildSeries(source.shifts, source.sales, source.income, source.expenses, range)
  return {
    hasDashboardData: source.shifts.length > 0 || source.income.length > 0 || source.expenses.length > 0,
    hasExpenses: source.expenses.length > 0,
    hasIncome: source.income.length > 0,
    hasSales: source.sales.length > 0,
    month: calculateMonthSummary(source.shifts, source.sales, source.income, source.expenses, currentMonth),
    recentActivity: buildActivity(source.shifts, source.sales, source.income, source.expenses),
    series,
    shiftCollection: buildShiftCollection(source.shifts, range),
    today: calculateSummary(source.shifts, source.sales, source.customers, today),
    topCustomers: buildTopCustomers(source.shifts, source.sales, range),
  }
}
