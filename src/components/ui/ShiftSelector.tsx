import { Button } from './Button'

export type ShiftValue = 'Morning' | 'Evening'

interface ShiftSelectorProps {
  label: string
  value: ShiftValue
  onChange: (value: ShiftValue) => void
}

export function ShiftSelector({ label, value, onChange }: ShiftSelectorProps) {
  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        {(['Morning', 'Evening'] as const).map((shift) => (
          <Button
            key={shift}
            type="button"
            variant={value === shift ? 'primary' : 'secondary'}
            onClick={() => onChange(shift)}
          >
            {shift}
          </Button>
        ))}
      </div>
    </fieldset>
  )
}
