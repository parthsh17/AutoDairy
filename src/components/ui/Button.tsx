import { type ReactNode } from 'react'
import { Button as AstryxButton } from '@astryxdesign/core/Button'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  icon?: ReactNode
  disabled?: boolean
  loading?: boolean
}

export function Button({
  children,
  variant = 'secondary',
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  icon,
}: ButtonProps) {
  return (
    <AstryxButton
      label={typeof children === 'string' ? children : 'Action'}
      variant={variant}
      type={type}
      onClick={onClick}
      icon={icon}
      isDisabled={disabled}
      isLoading={loading}
    >
      {children}
    </AstryxButton>
  )
}
