import { DatePicker } from '@/components/ui/DatePicker'
import { ShiftSelector, type ShiftValue } from '@/components/ui/ShiftSelector'
import type { ISODateString } from '@/types/common.types'
import type { DailyShiftValue } from '../types/daily-sales.types'

interface DailyShiftSelectorProps {
  date: ISODateString
  shift: DailyShiftValue
  onDateChange: (date: ISODateString) => void
  onShiftChange: (shift: DailyShiftValue) => void
}

export function DailyShiftSelector({ date, shift, onDateChange, onShiftChange }: DailyShiftSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <DatePicker label="Date" value={date} onChange={(value) => value && onDateChange(value as ISODateString)} />
      <ShiftSelector label="Shift" value={shift} onChange={onShiftChange as (value: ShiftValue) => void} />
    </div>
  )
}
