import { Card } from '@/components/ui/Card'
import { formatAmount } from '@/utils/financial.utils'
import type {
  AnalyticsCustomerSummary,
  AnalyticsFinancialSummary,
  AnalyticsMilkSummary,
  AnalyticsOverview,
  AnalyticsShiftSummary,
} from '../types/analytics.types'

interface AnalyticsMetricCardsProps {
  overview: AnalyticsOverview
  milk: AnalyticsMilkSummary
  customer: AnalyticsCustomerSummary
  shift: AnalyticsShiftSummary
  financial: AnalyticsFinancialSummary
}

export function AnalyticsMetricCards({ overview, milk, customer, shift, financial }: AnalyticsMetricCardsProps) {
  const items = [
    {
      label: 'Total Milk Collected',
      value: `${milk.totalCollection.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L`,
    },
    { label: 'Total Milk Sold', value: `${milk.totalSales.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L` },
    {
      label: 'Home Quantity',
      value: `${overview.homeQuantity.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L`,
    },
    { label: 'Remaining Milk', value: `${milk.remainingMilk.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L` },
    { label: 'Revenue', value: formatAmount(financial.revenue) },
    { label: 'Income', value: formatAmount(financial.income) },
    { label: 'Expenses', value: formatAmount(financial.expenses) },
    { label: 'Net Profit', value: formatAmount(financial.netProfit) },
    { label: 'Active Customers', value: customer.activeCustomers.toLocaleString('en-IN') },
    { label: 'Morning Sales', value: `${shift.morning.sales.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L` },
    { label: 'Evening Sales', value: `${shift.evening.sales.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L` },
    {
      label: 'Average Qty / Customer',
      value: `${customer.averageQuantityPerCustomer.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L`,
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label}>
          <p className="text-sm text-muted-foreground">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold">{item.value}</p>
        </Card>
      ))}
    </div>
  )
}
