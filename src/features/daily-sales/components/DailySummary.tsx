import { SummaryCard } from '@/components/ui/SummaryCard'
import type { DailySalesFormValues } from '../types/daily-sales.types'
import { calculateRemainingMilk, calculateRevenue, calculateTotalCustomerSales } from '../utils/daily-sales.utils'

interface DailySummaryProps {
  values: DailySalesFormValues
  milkPrice: number
}

export function DailySummary({ values, milkPrice }: DailySummaryProps) {
  const totalSales = calculateTotalCustomerSales(values.sales)
  const remainingMilk = calculateRemainingMilk(values)
  const revenue = calculateRevenue(values, milkPrice)

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <SummaryCard label="Collected" value={`${values.milkCollected.toFixed(2)} L`} />
      <SummaryCard label="Home quantity" value={`${values.homeQuantity.toFixed(2)} L`} />
      <SummaryCard label="Customer sales" value={`${totalSales.toFixed(2)} L`} />
      <SummaryCard label="Remaining milk" value={`${remainingMilk.toFixed(2)} L`} />
      <SummaryCard label="Revenue" value={`₹${revenue.toFixed(2)}`} />
    </div>
  )
}
