export type SyncStatus = 'online' | 'offline' | 'syncing' | 'synced' | 'pending' | 'failed'

export interface SyncStatusState {
  status: SyncStatus
  pendingCount: number
  lastSyncAt: string | null
  lastError: string | null
}

export interface SyncOperationPayload {
  entity: string
  operation: 'create' | 'update' | 'delete'
  payload: unknown
  dedupeKey?: string
}

export interface BackupManifest {
  version: number
  exportedAt: string
  entities: Array<{
    name: string
    rows: unknown[]
  }>
}
