import { formatAmount } from '@/utils/financial.utils'
import type { AnalyticsReport } from '../types/analytics.types'
import { getAnalyticsTitle } from '../utils/analytics.utils'

interface AnalyticsPrintViewProps {
  report: AnalyticsReport | null
}

export function AnalyticsPrintView({ report }: AnalyticsPrintViewProps) {
  if (!report) return null

  return (
    <div className="analytics-print-view hidden bg-white p-6 text-black print:block">
      <h1 className="text-2xl font-bold">Analytics Report</h1>
      <p className="text-sm">{getAnalyticsTitle(report.range)}</p>
      <section className="mt-4 grid gap-2">
        <p>
          Total Milk Collected:{' '}
          {report.overview.totalMilkCollected.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L
        </p>
        <p>Total Milk Sold: {report.overview.totalMilkSold.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L</p>
        <p>Home Quantity: {report.overview.homeQuantity.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L</p>
        <p>Remaining Milk: {report.overview.remainingMilk.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L</p>
        <p>Revenue: {formatAmount(report.overview.revenue)}</p>
        <p>Income: {formatAmount(report.overview.income)}</p>
        <p>Expenses: {formatAmount(report.overview.expenses)}</p>
        <p>Net Profit: {formatAmount(report.overview.netProfit)}</p>
        <p>Active Customers: {report.overview.activeCustomers}</p>
      </section>
    </div>
  )
}
