import { type ReactNode } from 'react'
import { ChartCard } from '@/components/ui/ChartCard'

interface AnalyticsChartCardProps {
  title: string
  description?: string
  children: ReactNode
}

export function AnalyticsChartCard({ title, description, children }: AnalyticsChartCardProps) {
  return (
    <ChartCard title={title} description={description}>
      {children}
    </ChartCard>
  )
}
