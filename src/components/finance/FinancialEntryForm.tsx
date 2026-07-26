import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { Input } from '@/components/ui/Input'
import { NumberInput } from '@/components/ui/NumberInput'
import { toISODate } from '@/utils/date.utils'
import { financialFormSchema, type FinancialFormSchema } from '@/utils/financial.validation'
import type { FinancialFormValues } from '@/types/financial.types'

interface FinancialEntryFormProps {
  initialValues?: FinancialFormValues
  isSubmitting?: boolean
  kind: 'income' | 'expense'
  onCancel: () => void
  onSubmit: (values: FinancialFormValues) => void
}

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p className="text-sm text-destructive" role="alert">
      {message}
    </p>
  ) : null
}

export function FinancialEntryForm({
  initialValues,
  isSubmitting = false,
  kind,
  onCancel,
  onSubmit,
}: FinancialEntryFormProps) {
  const form = useForm<FinancialFormSchema>({
    defaultValues: initialValues ?? { amount: 0, date: toISODate(new Date()), name: '' },
    resolver: zodResolver(financialFormSchema),
  })
  const noun = kind === 'income' ? 'income' : 'expense'

  return (
    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        control={form.control}
        name="date"
        render={({ field, fieldState }) => (
          <div className="grid gap-1">
            <DatePicker label="Date" value={field.value} onChange={(value) => field.onChange(value ?? '')} />
            <FieldError message={fieldState.error?.message} />
          </div>
        )}
      />
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <div className="grid gap-1">
            <Input
              label="Name"
              placeholder={`${kind === 'income' ? 'e.g. Cow sold' : 'e.g. Feed'}`}
              value={field.value}
              onChange={field.onChange}
            />
            <FieldError message={fieldState.error?.message} />
          </div>
        )}
      />
      <Controller
        control={form.control}
        name="amount"
        render={({ field, fieldState }) => (
          <div className="grid gap-1">
            <NumberInput
              label="Amount"
              placeholder="0.00"
              value={field.value}
              min={0.01}
              step={0.01}
              onChange={(value) => field.onChange(value ?? 0)}
            />
            <FieldError message={fieldState.error?.message} />
          </div>
        )}
      />
      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : `Save ${noun}`}
        </Button>
      </div>
    </form>
  )
}
