import { Card } from '@/components/ui/Card'
import { SearchBar } from '@/components/ui/SearchBar'
import type { AnalyticsCustomerSort, AnalyticsDateRange, AnalyticsRangePreset } from '../types/analytics.types'

interface AnalyticsFiltersProps {
  preset: AnalyticsRangePreset
  range: AnalyticsDateRange
  search: string
  sort: AnalyticsCustomerSort
  onPresetChange: (preset: AnalyticsRangePreset) => void
  onRangeChange: (range: AnalyticsDateRange) => void
  onSearchChange: (search: string) => void
  onSortChange: (sort: AnalyticsCustomerSort) => void
}

const presets: Array<{ label: string; value: AnalyticsRangePreset }> = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Current Month', value: 'current-month' },
  { label: 'Previous Month', value: 'previous-month' },
  { label: 'Custom', value: 'custom' },
]

export function AnalyticsFilters({
  preset,
  range,
  search,
  sort,
  onPresetChange,
  onRangeChange,
  onSearchChange,
  onSortChange,
}: AnalyticsFiltersProps) {
  return (
    <Card className="grid gap-4">
      <div className="grid gap-2">
        <p className="text-sm font-medium">Date range</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {presets.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`rounded-2xl border px-3 py-2 text-sm font-medium ${preset === item.value ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-foreground'}`}
              onClick={() => onPresetChange(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {preset === 'custom' ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            <span>From</span>
            <input
              className="h-11 rounded-2xl border border-input bg-background px-3"
              type="date"
              value={range.from}
              onChange={(event) => onRangeChange({ ...range, from: event.target.value as never })}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            <span>To</span>
            <input
              className="h-11 rounded-2xl border border-input bg-background px-3"
              type="date"
              value={range.to}
              onChange={(event) => onRangeChange({ ...range, to: event.target.value as never })}
            />
          </label>
        </div>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <SearchBar
          label="Search customers"
          placeholder="Search customer analytics"
          value={search}
          onChange={onSearchChange}
        />
        <label className="grid gap-2 text-sm font-medium">
          <span>Sort customers</span>
          <select
            className="h-11 rounded-2xl border border-input bg-background px-3"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as AnalyticsCustomerSort)}
          >
            <option value="quantity">Quantity</option>
            <option value="revenue">Revenue</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
    </Card>
  )
}
