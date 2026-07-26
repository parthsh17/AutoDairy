import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import type { AnalyticsCustomerSort, AnalyticsDateRange } from '../types/analytics.types'
import { loadAnalyticsReport } from '../services/analytics.service'

export function useAnalyticsReport(range: AnalyticsDateRange, sort: AnalyticsCustomerSort) {
  return useQuery({
    queryKey: [...queryKeys.analytics.all, range.from, range.to, sort],
    queryFn: () => loadAnalyticsReport(range, sort),
  })
}
