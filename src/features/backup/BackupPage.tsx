import { useRef, useState, type ChangeEvent } from 'react'
import { Download, Upload } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Toast } from '@/components/ui/Toast'
import { getUserFacingErrorMessage } from '@/lib/errors'
import { exportBackup, restoreBackup } from '@/services/sync.service'
import { validateBackupFile } from './utils/backup.utils'

export function BackupPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [feedback, setFeedback] = useState<{ title: string; message: string } | null>(null)

  const handleExport = async () => {
    try {
      const backup = await exportBackup()
      const file = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = url
      link.download = `autodairy-backup-${new Date().toISOString()}.json`
      link.click()
      URL.revokeObjectURL(url)
      setFeedback({ title: 'Backup generated', message: 'The backup file download has started.' })
    } catch (error) {
      setFeedback({ title: 'Unable to export backup', message: getUserFacingErrorMessage(error) })
    }
  }

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const parsed = JSON.parse(await file.text())
      if (!validateBackupFile(parsed)) {
        throw new Error('Invalid backup format')
      }
      await restoreBackup(parsed)
      setFeedback({ title: 'Backup restored', message: 'The database was restored successfully.' })
    } catch (error) {
      setFeedback({ title: 'Unable to restore backup', message: getUserFacingErrorMessage(error) })
    } finally {
      event.target.value = ''
    }
  }

  return (
    <div className="grid gap-4 pb-6">
      <SectionHeader
        title="Backup & Restore"
        description="Download or restore a full application backup."
        headingLevel={1}
      />
      <Card className="grid gap-4">
        <Button
          type="button"
          variant="primary"
          icon={<Download className="size-4" />}
          onClick={() => void handleExport()}
        >
          Download backup
        </Button>
        <Button
          type="button"
          variant="secondary"
          icon={<Upload className="size-4" />}
          onClick={() => inputRef.current?.click()}
        >
          Restore backup
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(event) => void handleImport(event)}
        />
        <p className="text-xs text-muted-foreground">
          Backup includes customers, memberships, daily shifts, sales, income, expenses, and settings.
        </p>
      </Card>
      {feedback ? <Toast title={feedback.title} message={feedback.message} /> : null}
    </div>
  )
}
