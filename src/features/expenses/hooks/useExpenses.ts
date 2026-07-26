import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { expenseService } from '../services/expense.service'

export function useExpenses() {
  return useQuery({ queryKey: queryKeys.expenses.all, queryFn: () => expenseService.list() })
}
