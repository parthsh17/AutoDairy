import { Card } from '@/components/ui/Card'
import { formatDate } from '@/utils/date.utils'
import type { MembershipRecord } from '../types/customer.types'

export function MembershipHistory({ memberships }: { memberships: MembershipRecord[] }) {
  const sortedMemberships = [...memberships].sort((left, right) => right.start_date.localeCompare(left.start_date))

  return (
    <Card className="grid gap-3">
      <div>
        <h3 className="text-base font-semibold">Membership history</h3>
        <p className="mt-1 text-sm text-muted-foreground">Historical membership periods are never removed.</p>
      </div>
      {sortedMemberships.length > 0 ? (
        <ol className="grid gap-2">
          {sortedMemberships.map((membership) => (
            <li
              className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-3 py-3 text-sm"
              key={membership.id}
            >
              <span>{formatDate(membership.start_date)}</span>
              <span className="text-muted-foreground">
                to {membership.end_date ? formatDate(membership.end_date) : 'Present'}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-sm text-muted-foreground">No membership periods recorded.</p>
      )}
    </Card>
  )
}
