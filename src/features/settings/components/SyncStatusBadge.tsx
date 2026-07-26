import { CircleAlert, CircleCheckBig, CloudOff, RefreshCw, Wifi, WifiOff } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { SyncStatusState } from '@/types/sync.types'

interface SyncStatusBadgeProps {
  state: SyncStatusState
}

export function SyncStatusBadge({ state }: SyncStatusBadgeProps) {
  const icon =
    state.status === 'online'
      ? Wifi
      : state.status === 'offline'
        ? WifiOff
        : state.status === 'syncing'
          ? RefreshCw
          : state.status === 'failed'
            ? CircleAlert
            : state.status === 'pending'
              ? CloudOff
              : CircleCheckBig

  const Icon = icon

  return (
    <Card className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-primary/10 p-2 text-primary">
          <Icon className="size-4" />
        </span>
        <div>
          <p className="text-sm font-medium capitalize">{state.status}</p>
          <p className="text-xs text-muted-foreground">{state.pendingCount} pending changes</p>
        </div>
      </div>
      <span className="text-xs text-muted-foreground">{state.lastSyncAt ?? 'Never synced'}</span>
    </Card>
  )
}
