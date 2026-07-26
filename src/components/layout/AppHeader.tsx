import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'
import { useSyncStatus } from '@/services/sync.service'

interface AppHeaderProps {
  title: string
  subtitle: string
}

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  const sync = useSyncStatus()
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <SectionHeader title={title} description={subtitle} />
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
            {sync.status}
          </span>
          <Button type="button" variant="secondary">
            Sync
          </Button>
        </div>
      </div>
    </header>
  )
}
