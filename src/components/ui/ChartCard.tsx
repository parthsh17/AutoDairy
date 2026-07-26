import { type ReactNode } from 'react'
import { Card } from './Card'

interface ChartCardProps {
  title: string
  description?: string
  children: ReactNode
}

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </Card>
  )
}
