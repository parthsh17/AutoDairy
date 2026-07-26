import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { incomeService } from '../services/income.service'

export function useIncome() {
  return useQuery({ queryKey: queryKeys.income.all, queryFn: () => incomeService.list() })
}
