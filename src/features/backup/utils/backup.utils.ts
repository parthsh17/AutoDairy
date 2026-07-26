import type { BackupManifest } from '@/types/sync.types'

export function validateBackupFile(value: unknown): value is BackupManifest {
  if (!value || typeof value !== 'object') return false
  const file = value as BackupManifest
  return (
    typeof file.version === 'number' &&
    typeof file.exportedAt === 'string' &&
    Array.isArray(file.entities) &&
    file.entities.every((entity) => typeof entity.name === 'string' && Array.isArray(entity.rows))
  )
}
