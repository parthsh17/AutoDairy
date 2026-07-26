import { type ReactNode } from 'react'
import { Card } from './Card'

interface SummaryCardProps {
  label: string
  value: string
  icon?: ReactNode
}

export function SummaryCard({ label, value, icon }: SummaryCardProps) {
  return (
    <Card className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
      </div>
      {icon}
    </Card>
  )
}
