interface DatePickerProps {
  label: string
  value?: string
  onChange?: (value: string | undefined) => void
}

export function DatePicker({ label, value, onChange }: DatePickerProps) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <input
        type="date"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={value ?? ''}
        onChange={(e) => {
          const val = e.target.value
          onChange?.(val === '' ? undefined : val)
        }}
      />
    </div>
  )
}
