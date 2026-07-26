import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { toISODate } from '@/utils/date.utils'
import { customerService } from '../services/customer.service'
import { filterCustomers } from '../utils/customer.utils'
import type { CustomerFilters } from '../types/customer.types'

export function useCustomers(filters: CustomerFilters, selectedDate = toISODate(new Date())) {
  const query = useQuery({
    queryKey: queryKeys.customers.all,
    queryFn: () => customerService.listCustomers(),
  })

  return {
    ...query,
    customers: filterCustomers(query.data ?? [], filters, selectedDate),
    selectedDate,
  }
}
