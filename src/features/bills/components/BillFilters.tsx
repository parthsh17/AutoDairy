import { Card } from '@/components/ui/Card'
import { SearchBar } from '@/components/ui/SearchBar'
import type { BillMonthFilter } from '../types/bill.types'
import { getMonthOptions, getYearOptions } from '../utils/bill.utils'

interface BillFiltersProps {
  value: BillMonthFilter & { search: string }
  onChange: (value: BillMonthFilter & { search: string }) => void
}

export function BillFilters({ value, onChange }: BillFiltersProps) {
  const months = getMonthOptions()
  const years = getYearOptions()

  return (
    <Card className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          <span>Month</span>
          <select
            className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            value={value.month}
            onChange={(event) => onChange({ ...value, month: event.target.value })}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          <span>Year</span>
          <select
            className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            value={value.year}
            onChange={(event) => onChange({ ...value, year: event.target.value })}
          >
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <SearchBar
        label="Search bills"
        placeholder="Search by customer name or phone number"
        value={value.search}
        onChange={(search) => onChange({ ...value, search })}
      />
    </Card>
  )
}
