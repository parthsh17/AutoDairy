import { Card } from '@/components/ui/Card'
import { formatAmount } from '@/utils/financial.utils'
import type { AnalyticsCustomerPoint } from '../types/analytics.types'

interface AnalyticsCustomerInsightsProps {
  topByQuantity: AnalyticsCustomerPoint[]
  topByRevenue: AnalyticsCustomerPoint[]
  lowestQuantity: AnalyticsCustomerPoint[]
  averageQuantityPerCustomer: number
}

function InsightList({
  title,
  items,
  metricLabel,
  valueFormatter,
}: {
  title: string
  items: AnalyticsCustomerPoint[]
  metricLabel: string
  valueFormatter: (item: AnalyticsCustomerPoint) => string
}) {
  return (
    <Card>
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="mt-3 grid gap-2">
        {items.map((item, index) => (
          <div
            key={item.customerId}
            className="flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3"
          >
            <div>
              <p className="font-medium">
                {index + 1}. {item.customerName}
              </p>
              <p className="text-sm text-muted-foreground">{metricLabel}</p>
            </div>
            <p className="font-semibold">{valueFormatter(item)}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function AnalyticsCustomerInsights({
  topByQuantity,
  topByRevenue,
  lowestQuantity,
  averageQuantityPerCustomer,
}: AnalyticsCustomerInsightsProps) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <Card>
        <p className="text-sm text-muted-foreground">Average quantity per customer</p>
        <p className="mt-2 text-2xl font-semibold">
          {averageQuantityPerCustomer.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L
        </p>
      </Card>
      <InsightList
        title="Top Customers by Quantity"
        items={topByQuantity}
        metricLabel="Milk sold"
        valueFormatter={(item) => `${item.quantity.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L`}
      />
      <InsightList
        title="Top Customers by Revenue"
        items={topByRevenue}
        metricLabel="Revenue"
        valueFormatter={(item) => formatAmount(item.revenue)}
      />
      <InsightList
        title="Lowest Quantity Customers"
        items={lowestQuantity}
        metricLabel="Milk sold"
        valueFormatter={(item) => `${item.quantity.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L`}
      />
    </div>
  )
}
