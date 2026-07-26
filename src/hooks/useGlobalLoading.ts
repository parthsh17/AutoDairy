import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import type { LoadingState } from '@/types/async.types'

export function useGlobalLoading(): LoadingState {
  const fetchingCount = useIsFetching()
  const mutatingCount = useIsMutating()

  return {
    isFetching: fetchingCount > 0,
    isLoading: fetchingCount > 0 || mutatingCount > 0,
    isMutating: mutatingCount > 0,
  }
}
