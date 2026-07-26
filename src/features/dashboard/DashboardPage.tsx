import { useState } from 'react'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatCard } from '@/components/ui/StatCard'
import { SummaryCard } from '@/components/ui/SummaryCard'
import { formatAmount } from '@/utils/financial.utils'
import { getMonthRange, getPreviousMonthRange } from './utils/dashboard.utils'
import { useDashboard } from './hooks/useDashboard'
import { DashboardActivity } from './components/DashboardActivity'
import { DashboardQuickActions } from './components/DashboardQuickActions'
import { DashboardRangeSelector } from './components/DashboardRangeSelector'
import { ShiftCollectionChart, TimeSeriesChart, TopCustomersChart } from './components/DashboardCharts'
import type { DashboardDateRange, DashboardRange } from './types/dashboard.types'

function formatLitres(value: number) {
  return `${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L`
}

export function DashboardPage() {
  const [range, setRange] = useState<DashboardRange>('current-month')
  const [customDates, setCustomDates] = useState<DashboardDateRange>(getMonthRange())
  const chartDates =
    range === 'previous-month' ? getPreviousMonthRange() : range === 'custom' ? customDates : getMonthRange()
  const query = useDashboard(chartDates)
  if (query.isPending)
    return (
      <div className="grid gap-4">
        <SectionHeader title="Dashboard" description="Your dairy business at a glance." headingLevel={1} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <LoadingSkeleton key={index} className="h-28" />
          ))}
        </div>
        <LoadingSkeleton className="h-72" />
      </div>
    )
  if (query.isError)
    return (
      <ErrorState
        title="Dashboard unavailable"
        description="We could not load your business overview."
        onRetry={() => void query.refetch()}
      />
    )
  const data = query.data
  return (
    <div className="grid gap-6">
      <SectionHeader title="Dashboard" description="Your dairy business at a glance." headingLevel={1} />
      <section className="grid gap-3">
        <SectionHeader title="Today's summary" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard label="Milk Collected" value={formatLitres(data.today.milkCollected)} />
          <SummaryCard label="Milk Sold" value={formatLitres(data.today.milkSold)} />
          <SummaryCard label="Home Quantity" value={formatLitres(data.today.homeQuantity)} />
          <SummaryCard label="Remaining Milk" value={formatLitres(data.today.remainingMilk)} />
          <SummaryCard label="Revenue" value={formatAmount(data.today.revenue)} />
          <SummaryCard label="Active Customers" value={data.today.activeCustomers.toLocaleString('en-IN')} />
        </div>
      </section>
      <section className="grid gap-3">
        <SectionHeader title="Current month" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Total Milk Sold" value={formatLitres(data.month.milkSold)} />
          <StatCard label="Total Revenue" value={formatAmount(data.month.revenue)} />
          <StatCard label="Total Income" value={formatAmount(data.month.income)} />
          <StatCard label="Total Expenses" value={formatAmount(data.month.expenses)} />
          <StatCard label="Net Profit" value={formatAmount(data.month.netProfit)} />
        </div>
      </section>
      <DashboardQuickActions />
      <section className="grid gap-3">
        <SectionHeader title="Charts" description="Explore performance by date range." />
        <DashboardRangeSelector
          range={range}
          dates={customDates}
          onRangeChange={setRange}
          onDatesChange={setCustomDates}
        />
        {!data.hasDashboardData ? (
          <EmptyState title="No dashboard data" description="Add daily sales, income, or expenses to see trends." />
        ) : (
          <div className="grid gap-3 lg:grid-cols-2">
            <TimeSeriesChart
              data={data.series}
              dataKey="milkSold"
              title="Daily Milk Sold"
              description="Customer quantities by day."
            />
            <TimeSeriesChart
              data={data.series}
              dataKey="revenue"
              title="Daily Revenue"
              description="Revenue using each shift's saved milk price."
            />
            <TimeSeriesChart
              data={data.series}
              dataKey="income"
              title="Daily Income"
              description="Income entries by day."
            />
            <TimeSeriesChart
              data={data.series}
              dataKey="expenses"
              title="Daily Expenses"
              description="Expense entries by day."
            />
            <TimeSeriesChart
              data={data.series}
              dataKey="profit"
              title="Daily Profit"
              description="Revenue plus income minus expenses."
            />
            <ShiftCollectionChart data={data.shiftCollection} />
            <TopCustomersChart data={data.topCustomers} />
          </div>
        )}
      </section>
      <DashboardActivity items={data.recentActivity} />
    </div>
  )
}
