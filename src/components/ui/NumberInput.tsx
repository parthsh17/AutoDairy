import { NumberInput as AstryxNumberInput } from '@astryxdesign/core/NumberInput'

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
    <AstryxNumberInput
      label={label}
      value={value}
      placeholder={placeholder}
      hasClear
      min={min}
      max={max}
      step={step}
      isDisabled={disabled}
      onChange={onChange ?? (() => undefined)}
    />
  )
}
