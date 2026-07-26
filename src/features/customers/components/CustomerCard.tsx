import { Pencil, Play, Pause, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { customerShiftFromFlags } from '../utils/customer.utils'
import type { CustomerViewModel } from '../types/customer.types'

interface CustomerCardProps {
  customer: CustomerViewModel
  onEdit: () => void
  onOpen: () => void
  onPause: () => void
  onResume: () => void
  isMutating?: boolean
}

export function CustomerCard({ customer, onEdit, onOpen, onPause, onResume, isMutating = false }: CustomerCardProps) {
  const shift = customerShiftFromFlags(customer.morning_enabled, customer.evening_enabled)

  return (
    <Card className="grid gap-4">
      <button
        className="grid min-h-11 grid-cols-[auto_1fr_auto] items-center gap-3 text-left"
        type="button"
        onClick={onOpen}
      >
        <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
          <UserRound className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-base font-semibold">{customer.name}</span>
          <span className="block truncate text-sm text-muted-foreground">{customer.phone || 'No phone number'}</span>
        </span>
        <span
          className={
            customer.isActive
              ? 'rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary'
              : 'rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground'
          }
        >
          {customer.isActive ? 'Active' : 'Inactive'}
        </span>
      </button>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3">
        <span className="text-sm text-muted-foreground">
          {shift === 'both' ? 'Morning + Evening' : shift[0].toUpperCase() + shift.slice(1)}
        </span>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="ghost" icon={<Pencil className="size-4" />} onClick={onEdit}>
            Edit
          </Button>
          {customer.isActive ? (
            <Button
              type="button"
              variant="secondary"
              icon={<Pause className="size-4" />}
              onClick={onPause}
              disabled={isMutating}
            >
              Pause
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              icon={<Play className="size-4" />}
              onClick={onResume}
              disabled={isMutating}
            >
              Resume
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
