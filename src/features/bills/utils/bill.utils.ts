import type { ISODateString } from '@/types/common.types'
import { formatDate } from '@/utils/date.utils'
import type { BillCustomerRecord, BillMonthEntry, BillRow, BillSaleRecord, BillSummary } from '../types/bill.types'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

function formatLitres(value: number) {
  return `${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L`
}

export function isCustomerActiveForMonth(
  customer: BillCustomerRecord,
  monthStart: ISODateString,
  monthEnd: ISODateString,
) {
  return customer.customer_memberships.some(
    (membership) =>
      membership.start_date <= monthEnd && (membership.end_date === null || membership.end_date >= monthStart),
  )
}

export function getMonthRange(year: number, month: number) {
  const start = new Date(Date.UTC(year, month - 1, 1))
  const end = new Date(Date.UTC(year, month, 0))
  const toISO = (date: Date) => date.toISOString().slice(0, 10) as ISODateString

  return { from: toISO(start), to: toISO(end) }
}

export function getMonthOptions() {
  return monthNames.map((label, index) => ({ label, value: String(index + 1).padStart(2, '0') }))
}

export function getYearOptions(currentYear = new Date().getFullYear(), span = 3) {
  return Array.from({ length: span * 2 + 1 }, (_, index) => {
    const value = currentYear - span + index
    return { label: String(value), value: String(value) }
  })
}

export function getBillingPeriodLabel(month: string, year: string) {
  const monthIndex = Number(month) - 1
  return `${monthNames[monthIndex] ?? 'Month'} ${year}`
}

export function sortBillRows(rows: BillRow[]) {
  return [...rows].sort(
    (left, right) => right.totalAmount - left.totalAmount || left.customerName.localeCompare(right.customerName),
  )
}

export function buildBillRows(
  customers: BillCustomerRecord[],
  sales: BillSaleRecord[],
  monthStart: ISODateString,
  monthEnd: ISODateString,
) {
  const salesByCustomer = new Map<string, BillSaleRecord[]>()
  for (const sale of sales) {
    if (!sale.daily_shifts) continue
    if (sale.daily_shifts.date < monthStart || sale.daily_shifts.date > monthEnd) continue
    const current = salesByCustomer.get(sale.customer_id) ?? []
    current.push(sale)
    salesByCustomer.set(sale.customer_id, current)
  }

  const rows = customers
    .filter((customer) => isCustomerActiveForMonth(customer, monthStart, monthEnd))
    .map<BillRow>((customer) => {
      const customerSales = (salesByCustomer.get(customer.id) ?? []).sort(
        (left, right) =>
          left.daily_shifts!.date.localeCompare(right.daily_shifts!.date) ||
          left.daily_shifts!.shift.localeCompare(right.daily_shifts!.shift),
      )
      const dailyEntries = new Map<string, BillMonthEntry>()
      const pricePoints = new Set<number>()

      for (const sale of customerSales) {
        const shift = sale.daily_shifts
        if (!shift) continue

        pricePoints.add(shift.milk_price)
        const key = `${shift.date}-${shift.shift}`
        const existing = dailyEntries.get(key)
        const amount = sale.quantity * shift.milk_price

        if (existing) {
          existing.totalQuantity += sale.quantity
          existing.amount += amount
          existing.milkPrice = shift.milk_price
          if (shift.shift === 'Morning') {
            existing.morningQuantity += sale.quantity
          } else {
            existing.eveningQuantity += sale.quantity
          }
        } else {
          dailyEntries.set(key, {
            amount,
            date: shift.date,
            eveningQuantity: shift.shift === 'Evening' ? sale.quantity : 0,
            milkPrice: shift.milk_price,
            morningQuantity: shift.shift === 'Morning' ? sale.quantity : 0,
            shift: shift.shift,
            totalQuantity: sale.quantity,
          })
        }
      }

      const orderedEntries = [...dailyEntries.values()].sort(
        (left, right) => left.date.localeCompare(right.date) || left.shift.localeCompare(right.shift),
      )
      return {
        customerId: customer.id,
        customerName: customer.name,
        dailyEntries: orderedEntries,
        eveningQuantity: orderedEntries.reduce((total, entry) => total + entry.eveningQuantity, 0),
        morningQuantity: orderedEntries.reduce((total, entry) => total + entry.morningQuantity, 0),
        phone: customer.phone,
        pricePoints: [...pricePoints].sort((left, right) => left - right),
        totalAmount: orderedEntries.reduce((total, entry) => total + entry.amount, 0),
        totalQuantity: orderedEntries.reduce((total, entry) => total + entry.totalQuantity, 0),
      }
    })

  return sortBillRows(rows)
}

export function calculateBillSummary(rows: BillRow[]): BillSummary {
  return {
    totalCustomers: rows.length,
    totalMilkSold: rows.reduce((total, row) => total + row.totalQuantity, 0),
    totalRevenue: rows.reduce((total, row) => total + row.totalAmount, 0),
  }
}

export function formatBillDate(date: ISODateString) {
  return formatDate(date)
}

export function formatBillLitreValue(value: number) {
  return formatLitres(value)
}
