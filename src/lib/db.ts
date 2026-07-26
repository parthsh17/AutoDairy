import Dexie, { type Table } from 'dexie'

export interface LocalSetting {
  id: string
  value: string
}

export interface SyncQueueEntry {
  id: string
  entity: string
  operation: 'create' | 'update' | 'delete'
  payload: string
  status: 'pending' | 'processing' | 'failed' | 'completed'
  created_at: string
  updated_at: string
  attempts: number
  error_message?: string
  dedupe_key?: string
}

export interface LocalDataSnapshot {
  id: string
  entity: string
  payload: string
  updated_at: string
}

class AutoDairyDatabase extends Dexie {
  settings!: Table<LocalSetting, string>
  sync_queue!: Table<SyncQueueEntry, string>
  local_data!: Table<LocalDataSnapshot, string>

  constructor() {
    super('autodairy')
    this.version(2).stores({
      settings: 'id',
      sync_queue: 'id, entity, status, dedupe_key, created_at, updated_at',
      local_data: 'id, entity, updated_at',
    })
  }
}

export const db = new AutoDairyDatabase()
