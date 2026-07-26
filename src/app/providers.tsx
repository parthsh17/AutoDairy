import { type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Theme } from '@astryxdesign/core/theme'
import { neutralTheme } from '@astryxdesign/theme-neutral/built'
import { queryClient } from './query-client'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme theme={neutralTheme}>{children}</Theme>
    </QueryClientProvider>
  )
}
