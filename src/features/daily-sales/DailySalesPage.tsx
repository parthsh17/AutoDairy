import { useState } from 'react'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Toast } from '@/components/ui/Toast'
import { getUserFacingErrorMessage } from '@/lib/errors'
import { toISODate } from '@/utils/date.utils'
import { useDailySales } from './hooks/useDailySales'
import { useDailySalesMutations } from './hooks/useDailySalesMutations'
import { DailyEntryForm } from './components/DailyEntryForm'
import { DailyShiftSelector } from './components/DailyShiftSelector'
import type { DailySalesFormValues, DailyShiftValue } from './types/daily-sales.types'
import type { ISODateString } from '@/types/common.types'

export function DailySalesPage() {
  const [date, setDate] = useState<ISODateString>(toISODate(new Date()))
  const [shift, setShift] = useState<DailyShiftValue>('Morning')
  const [feedback, setFeedback] = useState<{ message: string; title: string } | null>(null)
  const workflowQuery = useDailySales(date, shift)
  const mutations = useDailySalesMutations()

  const handleSubmit = async (values: DailySalesFormValues) => {
    try {
      await mutations.save.mutateAsync({ ...values, date, shift })
      setFeedback({ title: 'Daily entry saved', message: `${date} ${shift} sales were saved successfully.` })
    } catch (error) {
      setFeedback({ title: 'Unable to save daily entry', message: getUserFacingErrorMessage(error) })
    }
  }

  const handleReset = async () => {
    if (!window.confirm(`Reset the ${shift.toLowerCase()} entry for ${date}? This removes its sales and shift record.`))
      return

    try {
      await mutations.reset.mutateAsync({ date, shift })
      setFeedback({ title: 'Daily entry reset', message: 'The selected shift entry was reset.' })
    } catch (error) {
      setFeedback({ title: 'Unable to reset daily entry', message: getUserFacingErrorMessage(error) })
    }
  }

  const isBusy = workflowQuery.isPending || workflowQuery.isFetching

  return (
    <div className="grid gap-4 pb-6">
      <SectionHeader
        title="Daily sales"
        description="Record milk collection and customer sales for one shift."
        headingLevel={1}
      />
      <DailyShiftSelector date={date} shift={shift} onDateChange={setDate} onShiftChange={setShift} />
      {isBusy ? (
        <div className="grid gap-3" aria-label="Loading daily sales" role="status">
          <LoadingSkeleton className="h-36" />
          <LoadingSkeleton className="h-64" />
          <LoadingSkeleton className="h-96" />
        </div>
      ) : workflowQuery.isError ? (
        <ErrorState
          title="Unable to load daily sales"
          description={getUserFacingErrorMessage(workflowQuery.error)}
          onRetry={() => void workflowQuery.refetch()}
        />
      ) : workflowQuery.data ? (
        <DailyEntryForm
          key={`${date}-${shift}-${workflowQuery.data.shift?.id ?? 'new'}`}
          workflow={workflowQuery.data}
          shift={shift}
          isResetting={mutations.reset.isPending}
          isSaving={mutations.save.isPending}
          onReset={() => void handleReset()}
          onSubmit={(values) => void handleSubmit(values)}
        />
      ) : null}
      {feedback ? <Toast title={feedback.title} message={feedback.message} /> : null}
    </div>
  )
}
