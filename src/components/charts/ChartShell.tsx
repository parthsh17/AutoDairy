import { type ReactNode } from 'react'
import { ChartCard } from '../ui/ChartCard'

interface ChartShellProps {
  title: string
  description?: string
  children: ReactNode
}

export function ChartShell({ title, description, children }: ChartShellProps) {
  return (
    <ChartCard title={title} description={description}>
      {children}
    </ChartCard>
  )
}
