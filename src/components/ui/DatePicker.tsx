import { DateInput } from '@astryxdesign/core/DateInput'

interface DatePickerProps {
  label: string
  value?: string
  onChange?: (value: string | undefined) => void
}

export function DatePicker({ label, value, onChange }: DatePickerProps) {
  return <DateInput label={label} value={value as never} onChange={onChange ?? (() => undefined)} />
}
