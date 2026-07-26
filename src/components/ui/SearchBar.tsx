import { TextInput } from '@astryxdesign/core/TextInput'

interface SearchBarProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

export function SearchBar({ label = 'Search', placeholder = 'Search...', value = '', onChange }: SearchBarProps) {
  return <TextInput label={label} value={value} placeholder={placeholder} onChange={onChange ?? (() => undefined)} />
}
