import { SearchBar } from '@/components/ui/SearchBar'
import { DatePicker } from '@/components/ui/DatePicker'
import type { FinancialFilters as FinancialFiltersValue } from '@/types/financial.types'

interface FinancialFiltersProps {
  value: FinancialFiltersValue
  onChange: (value: FinancialFiltersValue) => void
}

export function FinancialFilters({ value, onChange }: FinancialFiltersProps) {
  return (
    <div className="grid gap-3 rounded-[20px] border border-border/70 bg-card p-4 shadow-sm">
      <SearchBar
        label="Search by name"
        placeholder="Search income or expense name"
        value={value.search}
        onChange={(search) => onChange({ ...value, search })}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <DatePicker
          label="From date"
          value={value.from}
          onChange={(from) => onChange({ ...value, from: from ?? '' })}
        />
        <DatePicker label="To date" value={value.to} onChange={(to) => onChange({ ...value, to: to ?? '' })} />
      </div>
    </div>
  )
}
