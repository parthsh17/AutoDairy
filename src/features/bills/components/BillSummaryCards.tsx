import { Card } from '@/components/ui/Card'
import { formatAmount } from '@/utils/financial.utils'
import type { BillSummary } from '../types/bill.types'
import { formatBillLitreValue } from '../utils/bill.utils'

interface BillSummaryCardsProps {
  summary: BillSummary
}

export function BillSummaryCards({ summary }: BillSummaryCardsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Card>
        <p className="text-sm text-muted-foreground">Total customers</p>
        <p className="mt-2 text-2xl font-semibold">{summary.totalCustomers.toLocaleString('en-IN')}</p>
      </Card>
      <Card>
        <p className="text-sm text-muted-foreground">Total milk sold</p>
        <p className="mt-2 text-2xl font-semibold">{formatBillLitreValue(summary.totalMilkSold)}</p>
      </Card>
      <Card>
        <p className="text-sm text-muted-foreground">Total revenue</p>
        <p className="mt-2 text-2xl font-semibold">{formatAmount(summary.totalRevenue)}</p>
      </Card>
    </div>
  )
}
