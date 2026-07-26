import { type ReactNode } from 'react'
import { Dialog as AstryxDialog } from '@astryxdesign/core/Dialog'

interface DialogProps {
  open: boolean
  title: string
  description?: string
  children?: ReactNode
  onClose: () => void
}

export function Dialog({ open, children, onClose }: DialogProps) {
  return (
    <AstryxDialog isOpen={open} onOpenChange={(value) => !value && onClose()}>
      {children}
    </AstryxDialog>
  )
}
