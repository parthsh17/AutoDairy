import { ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { formatAmount } from '@/utils/financial.utils'
import type { BillRow } from '../types/bill.types'
import { formatBillLitreValue } from '../utils/bill.utils'

interface BillListProps {
  rows: BillRow[]
  selectedId: string | null
  onSelect: (row: BillRow) => void
}

export function BillList({ rows, selectedId, onSelect }: BillListProps) {
  return (
    <div className="grid gap-3">
      {rows.map((row) => (
        <button key={row.customerId} type="button" onClick={() => onSelect(row)} className="text-left">
          <Card className={selectedId === row.customerId ? 'ring-2 ring-primary' : ''}>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold">{row.customerName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{row.phone ?? 'No phone number'}</p>
              </div>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <p>
                Morning: <span className="font-medium">{formatBillLitreValue(row.morningQuantity)}</span>
              </p>
              <p>
                Evening: <span className="font-medium">{formatBillLitreValue(row.eveningQuantity)}</span>
              </p>
              <p>
                Total: <span className="font-medium">{formatBillLitreValue(row.totalQuantity)}</span>
              </p>
              <p>
                Price:{' '}
                <span className="font-medium">
                  {row.pricePoints.length > 0
                    ? `₹${row.pricePoints.map((price) => price.toFixed(2)).join(', ')} /L`
                    : '—'}
                </span>
              </p>
              <p>
                Amount: <span className="font-medium">{formatAmount(row.totalAmount)}</span>
              </p>
            </div>
          </Card>
        </button>
      ))}
    </div>
  )
}
