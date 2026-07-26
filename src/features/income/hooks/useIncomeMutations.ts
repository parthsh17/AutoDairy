import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import type { FinancialFormValues } from '@/types/financial.types'
import { incomeService } from '../services/income.service'

export function useIncomeMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: queryKeys.income.all })

  const create = useMutation({
    mutationFn: (values: FinancialFormValues) => incomeService.create(values),
    onSuccess: invalidate,
  })
  const update = useMutation({
    mutationFn: ({ id, values }: { id: string; values: FinancialFormValues }) => incomeService.update(id, values),
    onSuccess: invalidate,
  })
  const remove = useMutation({ mutationFn: (id: string) => incomeService.delete(id), onSuccess: invalidate })

  return { create, remove, update }
}
