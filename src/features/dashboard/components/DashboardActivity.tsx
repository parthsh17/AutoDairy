import { ArrowDownLeft, ArrowUpRight, Milk } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatAmount } from '@/utils/financial.utils'
import { formatDate } from '@/utils/date.utils'
import type { DashboardActivity as Activity } from '../types/dashboard.types'

export function DashboardActivity({ items }: { items: Activity[] }) {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-base font-semibold">Recent activity</h3>
        <p className="mt-1 text-sm text-muted-foreground">The latest sales and financial entries.</p>
      </div>
      {items.length === 0 ? (
        <EmptyState title="No activity yet" description="Sales, income, and expenses will appear here." />
      ) : (
        <div className="grid gap-2">
          {items.map((item) => {
            const Icon = item.type === 'sale' ? Milk : item.type === 'income' ? ArrowDownLeft : ArrowUpRight
            return (
              <div
                key={`${item.type}-${item.id}`}
                className="flex items-center gap-3 rounded-lg border border-border/60 p-3"
              >
                <span className="rounded-full bg-muted p-2">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.subtitle} · {formatDate(item.date)}
                  </p>
                </div>
                <span className="text-sm font-semibold">{formatAmount(item.amount)}</span>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
