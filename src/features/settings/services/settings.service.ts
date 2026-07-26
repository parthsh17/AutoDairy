import { AppError } from '@/lib/errors'
import { settingsRepository } from './settings.repository'
import { db } from '@/lib/db'
import { queryClient } from '@/app/query-client'
import { queryKeys } from '@/lib/query-keys'

export async function loadMilkPrice() {
  const current = await settingsRepository.getCurrent()
  return Number(current?.milk_price ?? 100)
}

export async function saveMilkPrice(milkPrice: number) {
  if (!Number.isFinite(milkPrice) || milkPrice <= 0) {
    throw new AppError('Invalid milk price', {
      code: 'VALIDATION_ERROR',
      userMessage: 'Enter a valid milk price greater than zero.',
    })
  }

  const record = await settingsRepository.upsertMilkPrice(milkPrice)
  await db.settings.put({ id: 'milk_price', value: String(milkPrice) })
  await db.sync_queue.add({
    attempts: 0,
    created_at: new Date().toISOString(),
    dedupe_key: `settings:milk_price:${record.id}`,
    entity: 'settings',
    id: crypto.randomUUID(),
    operation: 'update',
    payload: JSON.stringify({ id: record.id, milk_price: milkPrice }),
    status: 'completed',
    updated_at: new Date().toISOString(),
  })
  await queryClient.invalidateQueries({ queryKey: queryKeys.settings.all })
  return record
}
