import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import type { BillMonthFilter } from '../types/bill.types'
import { loadMonthlyBills } from '../services/bills.service'

export function useMonthlyBills(filter: BillMonthFilter) {
  return useQuery({
    queryKey: [...queryKeys.bills.all, filter.month, filter.year],
    queryFn: () => loadMonthlyBills(filter),
  })
}
