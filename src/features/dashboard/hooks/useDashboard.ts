import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { loadDashboard } from '../services/dashboard.service'
import type { DashboardDateRange } from '../types/dashboard.types'

export function useDashboard(range: DashboardDateRange) {
  return useQuery({ queryKey: queryKeys.dashboard.range(range.from, range.to), queryFn: () => loadDashboard(range) })
}
