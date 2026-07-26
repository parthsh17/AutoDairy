import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { Input } from '@/components/ui/Input'
import { toISODate } from '@/utils/date.utils'
import { customerFormSchema, type CustomerFormSchema } from '../types/customer.validation'
import type { CustomerFormValues } from '../types/customer.types'

interface CustomerFormProps {
  initialValues?: CustomerFormValues
  isEditing?: boolean
  isSubmitting?: boolean
  onCancel: () => void
  onSubmit: (values: CustomerFormValues) => void
}

const defaultValues: CustomerFormValues = {
  name: '',
  phone: '',
  shift: 'morning',
  membershipStartDate: toISODate(new Date()),
}

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p className="text-sm text-destructive" role="alert">
      {message}
    </p>
  ) : null
}

export function CustomerForm({
  initialValues,
  isEditing = false,
  isSubmitting = false,
  onCancel,
  onSubmit,
}: CustomerFormProps) {
  const form = useForm<CustomerFormSchema>({
    defaultValues: initialValues ?? defaultValues,
    resolver: zodResolver(customerFormSchema),
  })

  return (
    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <div className="grid gap-1">
            <Input label="Name" placeholder="Customer name" value={field.value} onChange={field.onChange} />
            <FieldError message={fieldState.error?.message} />
          </div>
        )}
      />
      <Controller
        control={form.control}
        name="phone"
        render={({ field, fieldState }) => (
          <div className="grid gap-1">
            <Input label="Phone" placeholder="Optional mobile number" value={field.value} onChange={field.onChange} />
            <FieldError message={fieldState.error?.message} />
          </div>
        )}
      />
      <Controller
        control={form.control}
        name="shift"
        render={({ field, fieldState }) => (
          <fieldset className="grid gap-2">
            <legend className="text-sm font-medium">Milk shift</legend>
            <div className="grid grid-cols-3 gap-2">
              {(['morning', 'evening', 'both'] as const).map((shift) => (
                <Button
                  key={shift}
                  type="button"
                  variant={field.value === shift ? 'primary' : 'secondary'}
                  onClick={() => field.onChange(shift)}
                  aria-pressed={field.value === shift}
                >
                  {shift[0].toUpperCase() + shift.slice(1)}
                </Button>
              ))}
            </div>
            <FieldError message={fieldState.error?.message} />
          </fieldset>
        )}
      />
      {!isEditing ? (
        <Controller
          control={form.control}
          name="membershipStartDate"
          render={({ field, fieldState }) => (
            <div className="grid gap-1">
              <DatePicker
                label="Membership start date"
                value={field.value}
                onChange={(value) => field.onChange(value ?? '')}
              />
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />
      ) : null}
      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
          {isEditing ? 'Save changes' : 'Add customer'}
        </Button>
      </div>
    </form>
  )
}
