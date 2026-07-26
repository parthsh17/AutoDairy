import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import type { DashboardDateRange, DashboardRange } from '../types/dashboard.types'

interface DashboardRangeSelectorProps {
  range: DashboardRange
  dates: DashboardDateRange
  onRangeChange: (range: DashboardRange) => void
  onDatesChange: (dates: DashboardDateRange) => void
}

export function DashboardRangeSelector({ range, dates, onRangeChange, onDatesChange }: DashboardRangeSelectorProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-border/60 bg-muted/30 p-3 sm:flex sm:items-end sm:justify-between">
      <fieldset className="flex flex-wrap gap-2">
        <legend className="sr-only">Chart date range</legend>
        <Button
          type="button"
          variant={range === 'current-month' ? 'primary' : 'secondary'}
          onClick={() => onRangeChange('current-month')}
        >
          Current month
        </Button>
        <Button
          type="button"
          variant={range === 'previous-month' ? 'primary' : 'secondary'}
          onClick={() => onRangeChange('previous-month')}
        >
          Previous month
        </Button>
        <Button
          type="button"
          variant={range === 'custom' ? 'primary' : 'secondary'}
          onClick={() => onRangeChange('custom')}
        >
          Custom range
        </Button>
      </fieldset>
      {range === 'custom' ? (
        <div className="grid grid-cols-2 gap-2 sm:w-80">
          <DatePicker
            label="From"
            value={dates.from}
            onChange={(value) => value && onDatesChange({ ...dates, from: value as DashboardDateRange['from'] })}
          />
          <DatePicker
            label="To"
            value={dates.to}
            onChange={(value) => value && onDatesChange({ ...dates, to: value as DashboardDateRange['to'] })}
          />
        </div>
      ) : null}
    </div>
  )
}
