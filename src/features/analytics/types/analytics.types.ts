import type { ISODateString } from '@/types/common.types'

export type AnalyticsRangePreset = 'today' | 'yesterday' | 'current-month' | 'previous-month' | 'custom'
export type AnalyticsCustomerSort = 'quantity' | 'revenue' | 'name'

export interface AnalyticsDateRange {
  from: ISODateString
  to: ISODateString
}

export interface AnalyticsShiftRow {
  id: string
  date: ISODateString
  shift: 'Morning' | 'Evening'
  milk_collected: number
  home_quantity: number
  milk_price: number
}

export interface AnalyticsSaleRow {
  id: string
  daily_shift_id: string
  customer_id: string
  quantity: number
  daily_shifts: {
    date: ISODateString
    shift: 'Morning' | 'Evening'
    milk_price: number
    milk_collected: number
    home_quantity: number
  } | null
  customers: { id: string; name: string } | null
}

export interface AnalyticsCustomerRow {
  id: string
  name: string
  phone: string | null
  morning_enabled: boolean
  evening_enabled: boolean
  customer_memberships: Array<{ start_date: ISODateString; end_date: ISODateString | null }>
}

export interface AnalyticsFinancialRow {
  id: string
  date: ISODateString
  name: string
  amount: number
}

export interface AnalyticsSourceData {
  shifts: AnalyticsShiftRow[]
  sales: AnalyticsSaleRow[]
  customers: AnalyticsCustomerRow[]
  income: AnalyticsFinancialRow[]
  expenses: AnalyticsFinancialRow[]
}

export interface AnalyticsOverview {
  totalMilkCollected: number
  totalMilkSold: number
  homeQuantity: number
  remainingMilk: number
  revenue: number
  income: number
  expenses: number
  netProfit: number
  activeCustomers: number
}

export interface AnalyticsMilkSummary {
  totalCollection: number
  totalSales: number
  homeConsumption: number
  remainingMilk: number
}

export interface AnalyticsCustomerSummary {
  totalCustomers: number
  activeCustomers: number
  inactiveCustomers: number
  averageQuantityPerCustomer: number
}

export interface AnalyticsCustomerPoint {
  customerId: string
  customerName: string
  quantity: number
  revenue: number
}

export interface AnalyticsShiftSummary {
  morning: { collection: number; sales: number; revenue: number }
  evening: { collection: number; sales: number; revenue: number }
}

export interface AnalyticsFinancialSummary {
  revenue: number
  income: number
  expenses: number
  netProfit: number
}

export interface AnalyticsDailyPoint {
  date: ISODateString
  label: string
  collection: number
  sales: number
  homeQuantity: number
  remainingMilk: number
  revenue: number
  income: number
  expenses: number
  profit: number
  morningCollection: number
  morningSales: number
  morningRevenue: number
  eveningCollection: number
  eveningSales: number
  eveningRevenue: number
}

export interface AnalyticsMonthlyPoint {
  month: string
  label: string
  milkSold: number
  revenue: number
  income: number
  expenses: number
  profit: number
}

export interface AnalyticsReport {
  range: AnalyticsDateRange
  overview: AnalyticsOverview
  milk: AnalyticsMilkSummary
  customers: AnalyticsCustomerSummary
  customerInsights: {
    topByQuantity: AnalyticsCustomerPoint[]
    topByRevenue: AnalyticsCustomerPoint[]
    lowestQuantity: AnalyticsCustomerPoint[]
    averageQuantityPerCustomer: number
  }
  shift: AnalyticsShiftSummary
  financial: AnalyticsFinancialSummary
  dailySeries: AnalyticsDailyPoint[]
  monthlySeries: AnalyticsMonthlyPoint[]
  hasData: boolean
}
