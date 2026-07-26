import type { ISODateString } from '@/types/common.types'

export type BillShiftValue = 'Morning' | 'Evening'

export interface BillMembershipRecord {
  start_date: ISODateString
  end_date: ISODateString | null
}

export interface BillCustomerRecord {
  id: string
  name: string
  phone: string | null
  morning_enabled: boolean
  evening_enabled: boolean
  customer_memberships: BillMembershipRecord[]
}

export interface BillShiftRecord {
  date: ISODateString
  shift: BillShiftValue
  milk_price: number
}

export interface BillSaleRecord {
  customer_id: string
  quantity: number
  daily_shifts: BillShiftRecord | null
}

export interface BillMonthEntry {
  date: ISODateString
  shift: BillShiftValue
  morningQuantity: number
  eveningQuantity: number
  totalQuantity: number
  milkPrice: number
  amount: number
}

export interface BillRow {
  customerId: string
  customerName: string
  phone: string | null
  morningQuantity: number
  eveningQuantity: number
  totalQuantity: number
  totalAmount: number
  pricePoints: number[]
  dailyEntries: BillMonthEntry[]
}

export interface BillSummary {
  totalCustomers: number
  totalMilkSold: number
  totalRevenue: number
}

export interface MonthlyBillsSource {
  customers: BillCustomerRecord[]
  sales: BillSaleRecord[]
}

export interface BillMonthFilter {
  month: string
  year: string
}
