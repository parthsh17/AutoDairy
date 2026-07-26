import type { ISODateString } from '@/types/common.types'
import type {
  DailySaleRecord,
  DailySalesFormValues,
  DailyShiftValue,
  EligibleCustomer,
} from '../types/daily-sales.types'

export const DEFAULT_MILK_PRICE = 100

export function calculateTotalCustomerSales(sales: Record<string, number>) {
  return Object.values(sales).reduce((total, quantity) => total + quantity, 0)
}

export function calculateRemainingMilk(values: DailySalesFormValues) {
  return values.milkCollected - values.homeQuantity - calculateTotalCustomerSales(values.sales)
}

export function calculateRevenue(values: DailySalesFormValues, milkPrice: number) {
  return calculateTotalCustomerSales(values.sales) * milkPrice
}

export function toSalesFormValues(
  customers: EligibleCustomer[],
  shift: { milk_collected: number; home_quantity: number } | null,
  sales: DailySaleRecord[],
): DailySalesFormValues {
  const persistedSales = new Map(sales.map((sale) => [sale.customer_id, sale.quantity]))

  return {
    milkCollected: shift?.milk_collected ?? 0,
    homeQuantity: shift?.home_quantity ?? 0,
    sales: Object.fromEntries(customers.map((customer) => [customer.id, persistedSales.get(customer.id) ?? 0])),
  }
}

export function formatShiftLabel(shift: DailyShiftValue) {
  return shift
}

export function formatDateForInput(date: ISODateString) {
  return date
}
