import { type ReactNode } from 'react'
import { EmptyState as AstryxEmptyState } from '@astryxdesign/core/EmptyState'

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return <AstryxEmptyState title={title} description={description} actions={action} />
}
