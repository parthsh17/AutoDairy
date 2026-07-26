import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { customerService } from '../services/customer.service'
import type { CustomerFormValues } from '../types/customer.types'

export function useCustomerMutations() {
  const queryClient = useQueryClient()

  const invalidateCustomers = () => queryClient.invalidateQueries({ queryKey: queryKeys.customers.all })

  const create = useMutation({
    mutationFn: (values: CustomerFormValues) => customerService.createCustomer(values),
    onSuccess: invalidateCustomers,
  })

  const update = useMutation({
    mutationFn: ({ id, values }: { id: string; values: CustomerFormValues }) =>
      customerService.updateCustomer(id, values),
    onSuccess: invalidateCustomers,
  })

  const pause = useMutation({
    mutationFn: (id: string) => customerService.pauseCustomer(id),
    onSuccess: invalidateCustomers,
  })

  const resume = useMutation({
    mutationFn: (id: string) => customerService.resumeCustomer(id),
    onSuccess: invalidateCustomers,
  })

  return { create, pause, resume, update }
}
