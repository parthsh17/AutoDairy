interface NumberInputProps {
  label: string
  value?: number | null
  placeholder?: string
  onChange?: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

export function NumberInput({
  label,
  value = null,
  placeholder,
  onChange,
  min,
  max,
  step,
  disabled = false,
}: NumberInputProps) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <input
        type="number"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        value={value ?? ''}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => {
          const val = e.target.value
          onChange?.(val === '' ? null : Number(val))
        }}
      />
    </div>
  )
}
