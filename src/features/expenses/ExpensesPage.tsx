import { useState } from 'react'
import { Plus } from 'lucide-react'
import { FinancialFilters } from '@/components/finance/FinancialFilters'
import { FinancialRecordCard } from '@/components/finance/FinancialRecordCard'
import { FinancialEntryForm } from '@/components/finance/FinancialEntryForm'
import { DeleteFinancialRecordDialog } from '@/components/finance/DeleteFinancialRecordDialog'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Toast } from '@/components/ui/Toast'
import { getUserFacingErrorMessage } from '@/lib/errors'
import { filterFinancialRecords } from '@/utils/financial.utils'
import type { FinancialFilters as FinancialFiltersValue, FinancialFormValues } from '@/types/financial.types'
import { useExpenses } from './hooks/useExpenses'
import { useExpenseMutations } from './hooks/useExpenseMutations'
import type { ExpenseRecord } from './types/expense.types'

type DialogMode = 'create' | 'edit' | null
const initialFilters: FinancialFiltersValue = { from: '', search: '', to: '' }

export function ExpensesPage() {
  const [filters, setFilters] = useState(initialFilters)
  const [dialogMode, setDialogMode] = useState<DialogMode>(null)
  const [selected, setSelected] = useState<ExpenseRecord | null>(null)
  const [pendingDelete, setPendingDelete] = useState<ExpenseRecord | null>(null)
  const [feedback, setFeedback] = useState<{ message: string; title: string } | null>(null)
  const query = useExpenses()
  const mutations = useExpenseMutations()
  const records = filterFinancialRecords(query.data ?? [], filters)

  const closeForm = () => {
    setDialogMode(null)
    setSelected(null)
  }

  const handleSubmit = async (values: FinancialFormValues) => {
    try {
      if (selected) await mutations.update.mutateAsync({ id: selected.id, values })
      else await mutations.create.mutateAsync(values)
      closeForm()
      setFeedback({ title: selected ? 'Expense updated' : 'Expense added', message: 'The expense record was saved.' })
    } catch (error) {
      setFeedback({ title: 'Unable to save expense', message: getUserFacingErrorMessage(error) })
    }
  }

  const handleDelete = async () => {
    if (!pendingDelete) return
    try {
      await mutations.remove.mutateAsync(pendingDelete.id)
      setPendingDelete(null)
      setFeedback({ title: 'Expense deleted', message: 'The expense record was removed.' })
    } catch (error) {
      setFeedback({ title: 'Unable to delete expense', message: getUserFacingErrorMessage(error) })
    }
  }

  const isSaving = mutations.create.isPending || mutations.update.isPending

  return (
    <div className="grid gap-4 pb-6">
      <SectionHeader
        title="Expenses"
        description="Track expenses by date and name."
        headingLevel={1}
        action={
          <Button
            type="button"
            variant="primary"
            icon={<Plus className="size-4" />}
            onClick={() => setDialogMode('create')}
          >
            Add expense
          </Button>
        }
      />
      <FinancialFilters value={filters} onChange={setFilters} />
      {query.isLoading ? (
        <div className="grid gap-3" aria-label="Loading expenses" role="status">
          <LoadingSkeleton className="h-32" />
          <LoadingSkeleton className="h-32" />
          <LoadingSkeleton className="h-32" />
        </div>
      ) : query.isError ? (
        <ErrorState
          title="Unable to load expenses"
          description={getUserFacingErrorMessage(query.error)}
          onRetry={() => void query.refetch()}
        />
      ) : records.length > 0 ? (
        <div className="grid gap-3" aria-live="polite">
          {records.map((record) => (
            <FinancialRecordCard
              key={record.id}
              kind="expense"
              record={record}
              onEdit={() => {
                setSelected(record)
                setDialogMode('edit')
              }}
              onDelete={() => setPendingDelete(record)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No expense records"
          description={
            filters.search || filters.from || filters.to
              ? 'Try changing your search or date range.'
              : 'Add your first expense record to start tracking business expenses.'
          }
          action={
            <Button type="button" variant="primary" onClick={() => setDialogMode('create')}>
              Add expense
            </Button>
          }
        />
      )}
      {feedback ? <Toast title={feedback.title} message={feedback.message} /> : null}
      <Dialog open={dialogMode !== null} title={selected ? 'Edit expense' : 'Add expense'} onClose={closeForm}>
        {dialogMode ? (
          <FinancialEntryForm
            initialValues={selected ? { amount: selected.amount, date: selected.date, name: selected.name } : undefined}
            kind="expense"
            isSubmitting={isSaving}
            onCancel={closeForm}
            onSubmit={(values) => void handleSubmit(values)}
          />
        ) : null}
      </Dialog>
      {pendingDelete ? (
        <DeleteFinancialRecordDialog
          open
          kind="expense"
          name={pendingDelete.name}
          isDeleting={mutations.remove.isPending}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => void handleDelete()}
        />
      ) : null}
    </div>
  )
}
