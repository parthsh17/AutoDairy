import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Toast } from '@/components/ui/Toast'
import { getUserFacingErrorMessage } from '@/lib/errors'
import { toISODate } from '@/utils/date.utils'
import { CustomerCard } from './components/CustomerCard'
import { CustomerDetails } from './components/CustomerDetails'
import { CustomerFilters } from './components/CustomerFilters'
import { CustomerForm } from './components/CustomerForm'
import { useCustomerMutations } from './hooks/useCustomerMutations'
import { useCustomers } from './hooks/useCustomers'
import type {
  CustomerFilters as CustomerFiltersValue,
  CustomerFormValues,
  CustomerViewModel,
} from './types/customer.types'
import { customerShiftFromFlags } from './utils/customer.utils'

type DialogMode = 'create' | 'edit' | 'details' | null

const initialFilters: CustomerFiltersValue = { search: '', shift: 'all', status: 'active' }

export function CustomerPage() {
  const [filters, setFilters] = useState(initialFilters)
  const [dialogMode, setDialogMode] = useState<DialogMode>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerViewModel | null>(null)
  const [feedback, setFeedback] = useState<{ message: string; title: string } | null>(null)
  const { customers, error, isError, isLoading, refetch } = useCustomers(filters)
  const mutations = useCustomerMutations()

  const closeDialog = () => {
    setDialogMode(null)
    setSelectedCustomer(null)
  }

  const openCreate = () => {
    setSelectedCustomer(null)
    setDialogMode('create')
  }

  const openEdit = (customer: CustomerViewModel) => {
    setSelectedCustomer(customer)
    setDialogMode('edit')
  }

  const openDetails = (customer: CustomerViewModel) => {
    setSelectedCustomer(customer)
    setDialogMode('details')
  }

  const handleCreate = async (values: CustomerFormValues) => {
    try {
      await mutations.create.mutateAsync(values)
      closeDialog()
      setFeedback({ title: 'Customer added', message: 'The customer and initial membership were saved.' })
    } catch (mutationError) {
      setFeedback({
        title: 'Unable to add customer',
        message: getUserFacingErrorMessage(mutationError, 'Please check the form and try again.'),
      })
    }
  }

  const handleEdit = async (values: CustomerFormValues) => {
    if (!selectedCustomer) return

    try {
      await mutations.update.mutateAsync({ id: selectedCustomer.id, values })
      closeDialog()
      setFeedback({ title: 'Customer updated', message: 'Customer details were saved.' })
    } catch (mutationError) {
      setFeedback({ title: 'Unable to update customer', message: getUserFacingErrorMessage(mutationError) })
    }
  }

  const handlePause = async (customer: CustomerViewModel) => {
    try {
      await mutations.pause.mutateAsync(customer.id)
      setFeedback({ title: 'Membership paused', message: `${customer.name} is now inactive.` })
    } catch (mutationError) {
      setFeedback({ title: 'Unable to pause membership', message: getUserFacingErrorMessage(mutationError) })
    }
  }

  const handleResume = async (customer: CustomerViewModel) => {
    try {
      await mutations.resume.mutateAsync(customer.id)
      setFeedback({ title: 'Membership resumed', message: `${customer.name} is now active.` })
    } catch (mutationError) {
      setFeedback({ title: 'Unable to resume membership', message: getUserFacingErrorMessage(mutationError) })
    }
  }

  const isSubmitting = mutations.create.isPending || mutations.update.isPending
  const isMembershipMutating = mutations.pause.isPending || mutations.resume.isPending
  const formValues = selectedCustomer
    ? {
        membershipStartDate: toISODate(new Date()),
        name: selectedCustomer.name,
        phone: selectedCustomer.phone ?? '',
        shift: customerShiftFromFlags(selectedCustomer.morning_enabled, selectedCustomer.evening_enabled),
      }
    : undefined

  return (
    <div className="grid gap-4 pb-6">
      <SectionHeader
        title="Customers"
        description="Manage customers and preserve every membership period."
        headingLevel={1}
        action={
          <Button type="button" variant="primary" icon={<Plus className="size-4" />} onClick={openCreate}>
            Add customer
          </Button>
        }
      />
      <CustomerFilters value={filters} onChange={setFilters} />
      {isLoading ? (
        <div className="grid gap-3" aria-label="Loading customers" role="status">
          <LoadingSkeleton className="h-36" />
          <LoadingSkeleton className="h-36" />
          <LoadingSkeleton className="h-36" />
        </div>
      ) : isError ? (
        <ErrorState
          title="Unable to load customers"
          description={getUserFacingErrorMessage(error)}
          onRetry={() => void refetch()}
        />
      ) : customers.length > 0 ? (
        <div className="grid gap-3" aria-live="polite">
          {customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              isMutating={isMembershipMutating}
              onEdit={() => openEdit(customer)}
              onOpen={() => openDetails(customer)}
              onPause={() => void handlePause(customer)}
              onResume={() => void handleResume(customer)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={filters.status === 'active' ? 'No active customers' : 'No customers found'}
          description={
            filters.search
              ? 'Try another name or phone number.'
              : 'Add a customer to start building your dairy customer list.'
          }
          action={
            <Button type="button" variant="primary" onClick={openCreate}>
              Add your first customer
            </Button>
          }
        />
      )}
      {feedback ? <Toast title={feedback.title} message={feedback.message} /> : null}
      <Dialog
        open={dialogMode !== null}
        title={dialogMode === 'create' ? 'Add customer' : dialogMode === 'edit' ? 'Edit customer' : 'Customer details'}
        onClose={closeDialog}
      >
        {dialogMode === 'details' && selectedCustomer ? (
          <CustomerDetails customer={selectedCustomer} onClose={closeDialog} />
        ) : null}
        {dialogMode === 'create' ? (
          <CustomerForm
            isSubmitting={isSubmitting}
            onCancel={closeDialog}
            onSubmit={(values) => void handleCreate(values)}
          />
        ) : null}
        {dialogMode === 'edit' && selectedCustomer ? (
          <CustomerForm
            initialValues={formValues}
            isEditing
            isSubmitting={isSubmitting}
            onCancel={closeDialog}
            onSubmit={(values) => void handleEdit(values)}
          />
        ) : null}
      </Dialog>
    </div>
  )
}
