import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { formatAmount } from '@/utils/financial.utils'
import type { BillRow } from '../types/bill.types'
import { formatBillDate, formatBillLitreValue, getBillingPeriodLabel } from '../utils/bill.utils'

interface BillDetailProps {
  row: BillRow
  billingMonth: string
  billingYear: string
  onPrint: () => void
}

export function BillDetail({ row, billingMonth, billingYear, onPrint }: BillDetailProps) {
  const milkPriceLabel =
    row.pricePoints.length > 0
      ? row.pricePoints.map((price) => `Rs. ${price.toFixed(2)}/L`).join(', ')
      : 'No sales recorded'

  return (
    <Card className="grid gap-4 p-4">
      <SectionHeader
        title={row.customerName}
        description={row.phone ? row.phone : 'No phone number recorded'}
        action={
          <Button type="button" variant="primary" onClick={onPrint}>
            Export PDF
          </Button>
        }
      />
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
        {[
          { label: 'Billing period', value: getBillingPeriodLabel(billingMonth, billingYear) },
          { label: 'Morning total', value: formatBillLitreValue(row.morningQuantity) },
          { label: 'Evening total', value: formatBillLitreValue(row.eveningQuantity) },
          { label: 'Overall quantity', value: formatBillLitreValue(row.totalQuantity) },
          { label: 'Milk price used', value: milkPriceLabel },
          { label: 'Amount payable', value: formatAmount(row.totalAmount) },
        ].map(({ label, value }) => (
          <div key={label} className="grid gap-0.5">
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className="text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="grid gap-4">
        <section className="grid gap-3">
          <h3 className="text-base font-semibold">Daily quantity breakdown</h3>
          <div className="grid gap-2">
            {row.dailyEntries.map((entry) => (
              <div
                key={`${entry.date}-${entry.shift}`}
                className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{formatBillDate(entry.date)}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.shift} · Rs. {entry.milkPrice.toFixed(2)}/L
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p>
                    M {formatBillLitreValue(entry.morningQuantity)} · E {formatBillLitreValue(entry.eveningQuantity)}
                  </p>
                  <p className="font-medium">{formatBillLitreValue(entry.totalQuantity)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="grid gap-3">
          <h3 className="text-base font-semibold">Daily amount breakdown</h3>
          <div className="grid gap-2">
            {row.dailyEntries.map((entry) => (
              <div
                key={`${entry.date}-${entry.shift}-amount`}
                className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3"
              >
                <p>
                  {formatBillDate(entry.date)} <span className="text-muted-foreground">· {entry.shift}</span>
                </p>
                <p className="font-medium">{formatAmount(entry.amount)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Card>
  )
}
