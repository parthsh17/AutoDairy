import { SearchBar } from '@/components/ui/SearchBar'
import type { CustomerFilters as CustomerFiltersValue } from '../types/customer.types'

interface CustomerFiltersProps {
  value: CustomerFiltersValue
  onChange: (value: CustomerFiltersValue) => void
}

export function CustomerFilters({ value, onChange }: CustomerFiltersProps) {
  return (
    <div className="grid gap-3 rounded-[20px] border border-border/70 bg-card p-4 shadow-sm">
      <SearchBar
        label="Search customers"
        placeholder="Search by name or phone"
        value={value.search}
        onChange={(search) => onChange({ ...value, search })}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium" htmlFor="customer-status-filter">
          Status
          <select
            className="min-h-11 rounded-xl border border-border bg-background px-3 text-sm"
            id="customer-status-filter"
            value={value.status}
            onChange={(event) => onChange({ ...value, status: event.target.value as CustomerFiltersValue['status'] })}
          >
            <option value="active">Active customers</option>
            <option value="inactive">Inactive customers</option>
            <option value="all">All customers</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium" htmlFor="customer-shift-filter">
          Shift
          <select
            className="min-h-11 rounded-xl border border-border bg-background px-3 text-sm"
            id="customer-shift-filter"
            value={value.shift}
            onChange={(event) => onChange({ ...value, shift: event.target.value as CustomerFiltersValue['shift'] })}
          >
            <option value="all">All shifts</option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>
        </label>
      </div>
    </div>
  )
}
