import type { LoadingState } from '@/types/async.types'

export function getLoadingLabel(state: LoadingState) {
  if (state.isMutating) {
    return 'Saving changes...'
  }

  if (state.isFetching) {
    return 'Loading...'
  }

  return ''
}
