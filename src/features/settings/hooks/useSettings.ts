import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { loadMilkPrice } from '../services/settings.service'

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: async () => ({ milkPrice: await loadMilkPrice() }),
  })
}
