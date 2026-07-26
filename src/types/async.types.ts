export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<TData> {
  data: TData | null
  error: Error | null
  status: AsyncStatus
}

export interface LoadingState {
  isLoading: boolean
  isFetching: boolean
  isMutating: boolean
}
