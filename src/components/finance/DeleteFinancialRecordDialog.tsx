import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'

interface DeleteFinancialRecordDialogProps {
  isDeleting?: boolean
  kind: 'income' | 'expense'
  name: string
  onCancel: () => void
  onConfirm: () => void
  open: boolean
}

export function DeleteFinancialRecordDialog({
  isDeleting = false,
  kind,
  name,
  onCancel,
  onConfirm,
  open,
}: DeleteFinancialRecordDialogProps) {
  const noun = kind === 'income' ? 'income' : 'expense'

  return (
    <Dialog open={open} title={`Delete ${noun}`} onClose={onCancel}>
      <div className="grid gap-4">
        <div>
          <h2 className="text-lg font-semibold">Delete {noun}?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This will permanently remove “{name}”. This action cannot be undone.
          </p>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm} loading={isDeleting} disabled={isDeleting}>
            Delete {noun}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
