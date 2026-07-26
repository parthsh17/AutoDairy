import type { AnalyticsCustomerSort, AnalyticsDateRange } from '../types/analytics.types'
import { analyticsRepository } from './analytics.repository'
import { buildAnalyticsReport } from '../utils/analytics.utils'

export async function loadAnalyticsReport(range: AnalyticsDateRange, sort: AnalyticsCustomerSort) {
  const source = await analyticsRepository.load(range)
  return buildAnalyticsReport(source, range, sort)
}
