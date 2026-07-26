import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import type { ISODateString } from '@/types/common.types'
import { dailySalesService } from '../services/daily-sales.service'
import type { DailyShiftValue } from '../types/daily-sales.types'

export function useDailySales(date: ISODateString, shift: DailyShiftValue) {
  return useQuery({
    queryKey: queryKeys.dailySales.list(`${date}:${shift}`),
    queryFn: () => dailySalesService.getWorkflow(date, shift),
  })
}
