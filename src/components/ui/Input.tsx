import { type ReactNode } from 'react'
import { TextInput } from '@astryxdesign/core/TextInput'

interface InputProps {
  label: string
  value?: string
  placeholder?: string
  helperText?: string
  onChange?: (value: string) => void
  icon?: ReactNode
}

export function Input({ label, value = '', placeholder, onChange }: InputProps) {
  return <TextInput label={label} value={value} placeholder={placeholder} onChange={onChange ?? (() => undefined)} />
}
