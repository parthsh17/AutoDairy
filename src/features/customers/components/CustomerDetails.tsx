import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { MembershipHistory } from './MembershipHistory'
import { customerShiftFromFlags } from '../utils/customer.utils'
import type { CustomerViewModel } from '../types/customer.types'

export function CustomerDetails({ customer, onClose }: { customer: CustomerViewModel; onClose: () => void }) {
  const shift = customerShiftFromFlags(customer.morning_enabled, customer.evening_enabled)

  return (
    <div className="grid gap-4">
      <Card className="grid gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{customer.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{customer.phone || 'No phone number'}</p>
          </div>
          <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
            {customer.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Shift: {shift === 'both' ? 'Morning + Evening' : shift[0].toUpperCase() + shift.slice(1)}
        </p>
        <Button type="button" variant="ghost" onClick={onClose}>
          Close details
        </Button>
      </Card>
      <MembershipHistory memberships={customer.customer_memberships} />
    </div>
  )
}
