import { useEffect } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { NumberInput } from '@/components/ui/NumberInput'
import type { DailySalesFormValues, DailySalesWorkflow, DailyShiftValue } from '../types/daily-sales.types'
import { dailySalesFormSchema, type DailySalesFormSchema } from '../types/daily-sales.validation'
import { calculateRemainingMilk, toSalesFormValues } from '../utils/daily-sales.utils'
import { CustomerQuantityList } from './CustomerQuantityList'
import { DailySummary } from './DailySummary'

interface DailyEntryFormProps {
  workflow: DailySalesWorkflow
  shift: DailyShiftValue
  isSaving: boolean
  isResetting: boolean
  onReset: () => void
  onSubmit: (values: DailySalesFormValues) => void
}

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p className="text-sm text-destructive" role="alert">
      {message}
    </p>
  ) : null
}

export function DailyEntryForm({ workflow, shift, isSaving, isResetting, onReset, onSubmit }: DailyEntryFormProps) {
  const form = useForm<DailySalesFormSchema>({
    defaultValues: toSalesFormValues(workflow.customers, workflow.shift, workflow.sales),
    resolver: zodResolver(dailySalesFormSchema),
  })
  const values = useWatch({ control: form.control }) as DailySalesFormValues
  const remainingMilk = calculateRemainingMilk(values)

  useEffect(() => {
    form.reset(toSalesFormValues(workflow.customers, workflow.shift, workflow.sales))
  }, [form, workflow])

  return (
    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <DailySummary values={values} milkPrice={workflow.shift?.milk_price ?? workflow.currentMilkPrice} />
      {remainingMilk < 0 ? (
        <div
          className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
          role="alert"
        >
          Customer sales and home quantity exceed collected milk by {Math.abs(remainingMilk).toFixed(2)} L. Reduce the
          quantities before saving.
        </div>
      ) : null}
      <Card className="grid gap-4">
        <div>
          <h2 className="text-base font-semibold">Milk collection</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Milk price for this entry: ₹{(workflow.shift?.milk_price ?? workflow.currentMilkPrice).toFixed(2)}/L.
          </p>
        </div>
        <Controller
          control={form.control}
          name="milkCollected"
          render={({ field, fieldState }) => (
            <div className="grid gap-1">
              <NumberInput
                label="Total milk collected (litres)"
                value={field.value}
                min={0}
                step={0.01}
                disabled={isSaving}
                onChange={(value) => field.onChange(value ?? 0)}
              />
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name="homeQuantity"
          render={({ field, fieldState }) => (
            <div className="grid gap-1">
              <NumberInput
                label="Home quantity (litres)"
                value={field.value}
                min={0}
                step={0.01}
                disabled={isSaving}
                onChange={(value) => field.onChange(value ?? 0)}
              />
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />
      </Card>
      <CustomerQuantityList
        control={form.control}
        customers={workflow.customers}
        errors={form.formState.errors}
        shift={shift}
        disabled={isSaving}
      />
      <FieldError message={form.formState.errors.root?.message} />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" disabled={isSaving || isResetting || !workflow.shift} onClick={onReset}>
          Reset entry
        </Button>
        <Button type="submit" variant="primary" loading={isSaving} disabled={isSaving || isResetting}>
          Save daily entry
        </Button>
      </div>
    </form>
  )
}
