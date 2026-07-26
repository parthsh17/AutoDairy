import { useMemo, useState } from 'react'
import { Download, Printer } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Toast } from '@/components/ui/Toast'
import { toISODate } from '@/utils/date.utils'
import { getUserFacingErrorMessage } from '@/lib/errors'
import { AnalyticsCustomerInsights } from './components/AnalyticsCustomerInsights'
import { AnalyticsDailyCharts, AnalyticsFinancialCharts, AnalyticsShiftCharts } from './components/AnalyticsCharts'
import { AnalyticsFilters } from './components/AnalyticsFilters'
import { AnalyticsMetricCards } from './components/AnalyticsMetricCards'
import { AnalyticsPrintView } from './components/AnalyticsPrintView'
import { useAnalyticsReport } from './hooks/useAnalyticsReport'
import type { AnalyticsCustomerSort, AnalyticsDateRange, AnalyticsRangePreset } from './types/analytics.types'
import {
  exportAnalyticsCsv,
  getDefaultRange,
  getPreviousMonthRange,
  getTodayRange,
  getMonthRange,
} from './utils/analytics.utils'

const today = new Date()
const initialPreset: AnalyticsRangePreset = 'current-month'
const initialRange = getDefaultRange(initialPreset)

export function AnalyticsPage() {
  const [preset, setPreset] = useState<AnalyticsRangePreset>(initialPreset)
  const [customRange, setCustomRange] = useState<AnalyticsDateRange>(initialRange)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<AnalyticsCustomerSort>('quantity')
  const [feedback, setFeedback] = useState<{ title: string; message: string } | null>(null)

  const resolvedRange = useMemo(() => {
    if (preset === 'custom') return customRange
    if (preset === 'today') return getTodayRange(today)
    if (preset === 'yesterday') {
      const previous = new Date(today)
      previous.setDate(previous.getDate() - 1)
      return { from: toISODate(previous), to: toISODate(previous) }
    }
    if (preset === 'previous-month') return getPreviousMonthRange(today)
    return getMonthRange(today)
  }, [customRange, preset])

  const query = useAnalyticsReport(resolvedRange, sort)

  const filteredCustomerInsights = useMemo(() => {
    const report = query.data
    if (!report) return null
    const filtered = (items: typeof report.customerInsights.topByQuantity) =>
      items.filter((item) => item.customerName.toLowerCase().includes(search.toLowerCase()))
    return {
      ...report.customerInsights,
      lowestQuantity: filtered(report.customerInsights.lowestQuantity),
      topByQuantity: filtered(report.customerInsights.topByQuantity),
      topByRevenue: filtered(report.customerInsights.topByRevenue),
    }
  }, [query.data, search])

  const handleExportCsv = () => {
    if (!query.data) return
    const blob = new Blob([exportAnalyticsCsv(query.data)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `analytics-${resolvedRange.from}-${resolvedRange.to}.csv`
    link.click()
    URL.revokeObjectURL(url)
    setFeedback({ title: 'CSV exported', message: 'Analytics CSV download started.' })
  }

  const handleExportPdf = () => {
    window.print()
  }

  return (
    <div className="grid gap-4 pb-6">
      <SectionHeader
        title="Analytics"
        description="Live business insights generated from source data only."
        headingLevel={1}
        action={
          <div className="flex gap-2">
            <Button type="button" icon={<Download className="size-4" />} onClick={handleExportCsv}>
              CSV
            </Button>
            <Button type="button" variant="primary" icon={<Printer className="size-4" />} onClick={handleExportPdf}>
              PDF
            </Button>
          </div>
        }
      />
      <AnalyticsFilters
        preset={preset}
        range={resolvedRange}
        search={search}
        sort={sort}
        onPresetChange={(next) => setPreset(next)}
        onRangeChange={(next) => {
          setPreset('custom')
          setCustomRange(next)
        }}
        onSearchChange={setSearch}
        onSortChange={setSort}
      />
      {query.isLoading ? (
        <div className="grid gap-3" aria-label="Loading analytics" role="status">
          <LoadingSkeleton className="h-24" />
          <LoadingSkeleton className="h-96" />
          <LoadingSkeleton className="h-96" />
        </div>
      ) : query.isError ? (
        <ErrorState
          title="Unable to load analytics"
          description={getUserFacingErrorMessage(query.error)}
          onRetry={() => void query.refetch()}
        />
      ) : query.data ? (
        query.data.hasData ? (
          <div className="grid gap-4">
            <AnalyticsMetricCards
              overview={query.data.overview}
              milk={query.data.milk}
              customer={query.data.customers}
              shift={query.data.shift}
              financial={query.data.financial}
            />
            <AnalyticsDailyCharts data={query.data.dailySeries} />
            <AnalyticsShiftCharts shift={query.data.shift} />
            <AnalyticsFinancialCharts data={query.data.monthlySeries} />
            {filteredCustomerInsights ? <AnalyticsCustomerInsights {...filteredCustomerInsights} /> : null}
          </div>
        ) : (
          <EmptyState
            title="No analytics data"
            description="Add sales, income, or expenses in the selected range to see insights."
          />
        )
      ) : null}
      {feedback ? <Toast title={feedback.title} message={feedback.message} /> : null}
      <AnalyticsPrintView report={query.data ?? null} />
    </div>
  )
}
