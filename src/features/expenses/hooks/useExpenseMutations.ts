import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import type { FinancialFormValues } from '@/types/financial.types'
import { expenseService } from '../services/expense.service'

export function useExpenseMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all })

  const create = useMutation({
    mutationFn: (values: FinancialFormValues) => expenseService.create(values),
    onSuccess: invalidate,
  })
  const update = useMutation({
    mutationFn: ({ id, values }: { id: string; values: FinancialFormValues }) => expenseService.update(id, values),
    onSuccess: invalidate,
  })
  const remove = useMutation({ mutationFn: (id: string) => expenseService.delete(id), onSuccess: invalidate })

  return { create, remove, update }
}
