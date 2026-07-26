import { type ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-4 sm:px-6 lg:px-8">{children}</main>
}
