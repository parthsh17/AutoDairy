import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { formatDate } from '@/utils/date.utils'
import { formatAmount } from '@/utils/financial.utils'
import type { FinancialRecord } from '@/types/financial.types'

interface FinancialRecordCardProps {
  record: FinancialRecord
  onDelete: () => void
  onEdit: () => void
  kind: 'income' | 'expense'
}

export function FinancialRecordCard({ record, onDelete, onEdit, kind }: FinancialRecordCardProps) {
  return (
    <Card className="grid gap-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold">{record.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{formatDate(record.date)}</p>
        </div>
        <p
          className={
            kind === 'income'
              ? 'shrink-0 text-base font-semibold text-primary'
              : 'shrink-0 text-base font-semibold text-destructive'
          }
        >
          {formatAmount(record.amount)}
        </p>
      </div>
      <div className="flex justify-end gap-2 border-t border-border/70 pt-3">
        <Button type="button" variant="ghost" icon={<Pencil className="size-4" />} onClick={onEdit}>
          Edit
        </Button>
        <Button type="button" variant="destructive" icon={<Trash2 className="size-4" />} onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Card>
  )
}
