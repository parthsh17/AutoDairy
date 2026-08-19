import { type ReactNode } from 'react'

interface InputProps {
  label: string
  value?: string
  placeholder?: string
  helperText?: string
  onChange?: (value: string) => void
  icon?: ReactNode
}

export function Input({ label, value = '', placeholder, helperText, onChange, icon }: InputProps) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}
        <input
          type="text"
          className={`flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:border-primary/40 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${icon ? 'pl-9' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
      {helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
    </div>
  )
}
