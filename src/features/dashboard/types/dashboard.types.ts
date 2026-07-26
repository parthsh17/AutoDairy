import type { ISODateString } from '@/types/common.types'

export type DashboardRange = 'current-month' | 'previous-month' | 'custom'

export interface DashboardDateRange {
  from: ISODateString
  to: ISODateString
}

export interface DashboardShiftRow {
  id: string
  date: ISODateString
  shift: 'Morning' | 'Evening'
  milk_collected: number
  home_quantity: number
  milk_price: number
  created_at: string
  updated_at: string
}

export interface DashboardSaleRow {
  id: string
  daily_shift_id: string
  customer_id: string
  quantity: number
  created_at: string
  customers: { name: string } | null
}

export interface DashboardCustomerRow {
  id: string
  customer_memberships: Array<{ start_date: ISODateString; end_date: ISODateString | null }>
}

export interface DashboardFinancialRow {
  id: string
  date: ISODateString
  name: string
  amount: number
  created_at: string
}

export interface DashboardSourceData {
  shifts: DashboardShiftRow[]
  sales: DashboardSaleRow[]
  customers: DashboardCustomerRow[]
  income: DashboardFinancialRow[]
  expenses: DashboardFinancialRow[]
}

export interface DashboardSummary {
  milkCollected: number
  milkSold: number
  homeQuantity: number
  remainingMilk: number
  revenue: number
  activeCustomers: number
}

export interface DashboardMonthSummary {
  milkSold: number
  revenue: number
  income: number
  expenses: number
  netProfit: number
}

export interface DashboardSeriesPoint {
  date: ISODateString
  label: string
  milkSold: number
  revenue: number
  income: number
  expenses: number
  profit: number
}

export interface ShiftCollectionPoint {
  shift: string
  quantity: number
}

export interface CustomerQuantityPoint {
  customer: string
  quantity: number
}

export interface DashboardActivity {
  id: string
  date: ISODateString
  title: string
  subtitle: string
  amount: number
  type: 'sale' | 'income' | 'expense'
  createdAt: string
}

export interface DashboardData {
  today: DashboardSummary
  month: DashboardMonthSummary
  series: DashboardSeriesPoint[]
  shiftCollection: ShiftCollectionPoint[]
  topCustomers: CustomerQuantityPoint[]
  recentActivity: DashboardActivity[]
  hasSales: boolean
  hasIncome: boolean
  hasExpenses: boolean
  hasDashboardData: boolean
}
