import { useEffect, useRef, useState } from 'react'
import { db } from '@/lib/db'
import { supabase } from '@/lib/supabase'
import type { SyncOperationPayload, SyncStatusState } from '@/types/sync.types'

function now() {
  return new Date().toISOString()
}

export async function enqueueSyncOperation(operation: SyncOperationPayload) {
  const id = crypto.randomUUID()
  await db.sync_queue.put({
    attempts: 0,
    created_at: now(),
    dedupe_key: operation.dedupeKey,
    entity: operation.entity,
    id,
    operation: operation.operation,
    payload: JSON.stringify(operation.payload),
    status: 'pending',
    updated_at: now(),
  })
  return id
}

async function flushQueue() {
  const items = await db.sync_queue.where('status').anyOf(['pending', 'failed']).sortBy('created_at')
  for (const item of items) {
    try {
      await db.sync_queue.update(item.id, { status: 'processing', updated_at: now(), attempts: item.attempts + 1 })
      const payload = JSON.parse(item.payload) as Record<string, unknown>
      if (item.operation === 'delete') {
        const id = String(payload.id ?? '')
        if (id) await supabase.from(item.entity).delete().eq('id', id)
      } else if (item.operation === 'update') {
        const id = String(payload.id ?? '')
        if (id) await supabase.from(item.entity).update(payload).eq('id', id)
      } else {
        await supabase.from(item.entity).insert(payload)
      }
      await db.sync_queue.update(item.id, { status: 'completed', updated_at: now(), error_message: undefined })
    } catch (error) {
      await db.sync_queue.update(item.id, {
        status: 'failed',
        updated_at: now(),
        error_message: error instanceof Error ? error.message : 'Sync failed',
      })
      throw error
    }
  }
}

export function useSyncStatus(): SyncStatusState {
  const lastSyncAtRef = useRef<string | null>(null)
  const [state, setState] = useState<SyncStatusState>({
    lastError: null,
    lastSyncAt: null,
    pendingCount: 0,
    status: navigator.onLine ? 'online' : 'offline',
  })

  useEffect(() => {
    let alive = true
    const sync = async () => {
      const pendingCount = await db.sync_queue.where('status').anyOf(['pending', 'failed', 'processing']).count()
      const next: SyncStatusState = {
        lastError: null,
        lastSyncAt: lastSyncAtRef.current,
        pendingCount,
        status: navigator.onLine ? (pendingCount > 0 ? 'pending' : 'synced') : 'offline',
      }
      if (navigator.onLine && pendingCount > 0) {
        setState((current) => ({ ...current, status: 'syncing' }))
        try {
          await flushQueue()
          lastSyncAtRef.current = now()
          next.status = 'synced'
          next.lastSyncAt = lastSyncAtRef.current
          next.pendingCount = await db.sync_queue.where('status').anyOf(['pending', 'failed', 'processing']).count()
        } catch (error) {
          next.status = 'failed'
          next.lastError = error instanceof Error ? error.message : 'Sync failed'
        }
      }
      if (alive) setState(next)
    }

    sync().catch(() => undefined)
    const handle = () => sync().catch(() => undefined)
    window.addEventListener('online', handle)
    window.addEventListener('offline', handle)
    const interval = window.setInterval(() => sync().catch(() => undefined), 15_000)

    return () => {
      alive = false
      window.removeEventListener('online', handle)
      window.removeEventListener('offline', handle)
      window.clearInterval(interval)
    }
  }, [])

  return state
}

export async function exportBackup() {
  const [settings, localData, queue] = await Promise.all([
    db.settings.toArray(),
    db.local_data.toArray(),
    db.sync_queue.toArray(),
  ])
  const settingsRecords = await supabase.from('settings').select('*').order('created_at', { ascending: true })
  const customerRecords = await supabase.from('customers').select('*').order('name', { ascending: true })
  const membershipRecords = await supabase
    .from('customer_memberships')
    .select('*')
    .order('created_at', { ascending: true })
  const shiftRecords = await supabase.from('daily_shifts').select('*').order('date', { ascending: true })
  const saleRecords = await supabase.from('sales').select('*').order('created_at', { ascending: true })
  const incomeRecords = await supabase.from('income').select('*').order('date', { ascending: true })
  const expenseRecords = await supabase.from('expenses').select('*').order('date', { ascending: true })
  return {
    entities: {
      settings: settingsRecords.data ?? settings,
      customers: customerRecords.data ?? [],
      customer_memberships: membershipRecords.data ?? [],
      daily_shifts: shiftRecords.data ?? [],
      expenses: expenseRecords.data ?? [],
      income: incomeRecords.data ?? [],
      local_data: localData,
      sales: saleRecords.data ?? [],
      sync_queue: queue,
    },
    exportedAt: now(),
    version: 1,
  }
}

export async function restoreBackup(file: unknown) {
  if (!file || typeof file !== 'object') throw new Error('Invalid backup file')
  const backup = file as { entities?: Record<string, unknown[]>; version?: number }
  const entities = backup.entities
  if (!entities) throw new Error('Missing entities in backup file')
  await db.transaction('rw', db.settings, db.local_data, db.sync_queue, async () => {
    await db.settings.clear()
    await db.local_data.clear()
    await db.sync_queue.clear()
    if (Array.isArray(entities.settings)) await db.settings.bulkPut(entities.settings as never[])
  })

  const applyTable = async (table: string, rows: unknown[]) => {
    await supabase.from(table).delete()
    if (rows.length > 0) {
      const { error } = await supabase.from(table).insert(rows as never[])
      if (error) throw error
    }
  }

  await applyTable('settings', Array.isArray(entities.settings) ? entities.settings : [])
  await applyTable('customers', Array.isArray(entities.customers) ? entities.customers : [])
  await applyTable(
    'customer_memberships',
    Array.isArray(entities.customer_memberships) ? entities.customer_memberships : [],
  )
  await applyTable('daily_shifts', Array.isArray(entities.daily_shifts) ? entities.daily_shifts : [])
  await applyTable('sales', Array.isArray(entities.sales) ? entities.sales : [])
  await applyTable('income', Array.isArray(entities.income) ? entities.income : [])
  await applyTable('expenses', Array.isArray(entities.expenses) ? entities.expenses : [])
}
