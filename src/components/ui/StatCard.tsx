import { type ReactNode } from 'react'
import { Card } from './Card'

interface StatCardProps {
  label: string
  value: string
  change?: string
  icon?: ReactNode
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  return (
    <Card className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-xl font-semibold">{value}</p>
        {change ? <p className="mt-1 text-xs text-muted-foreground">{change}</p> : null}
      </div>
      {icon}
    </Card>
  )
}
