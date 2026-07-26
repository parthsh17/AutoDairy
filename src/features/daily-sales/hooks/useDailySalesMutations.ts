import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { dailySalesService } from '../services/daily-sales.service'
import type { DailySalesSaveInput, DailyShiftValue } from '../types/daily-sales.types'
import type { ISODateString } from '@/types/common.types'

export function useDailySalesMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: queryKeys.dailySales.all })

  const save = useMutation({
    mutationFn: (input: DailySalesSaveInput) => dailySalesService.save(input),
    onSuccess: invalidate,
  })
  const reset = useMutation({
    mutationFn: ({ date, shift }: { date: ISODateString; shift: DailyShiftValue }) =>
      dailySalesService.reset(date, shift),
    onSuccess: invalidate,
  })

  return { reset, save }
}
