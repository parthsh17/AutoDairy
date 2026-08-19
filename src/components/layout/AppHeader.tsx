import { useState } from 'react'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'
import { syncPendingOperations, useSyncStatus } from '@/services/sync.service'

interface AppHeaderProps {
  title: string
  subtitle: string
}

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  const sync = useSyncStatus()
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      await syncPendingOperations()
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 shadow-card backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <SectionHeader title={title} description={subtitle} />
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium capitalize text-muted-foreground shadow-sm">
            {sync.status}
          </span>
          <Button type="button" variant="secondary" loading={isSyncing} onClick={() => void handleSync()}>
            Sync
          </Button>
        </div>
      </div>
    </header>
  )
}
