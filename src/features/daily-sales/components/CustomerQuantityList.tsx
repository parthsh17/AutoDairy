import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Card } from '@/components/ui/Card'
import { NumberInput } from '@/components/ui/NumberInput'
import type { DailySalesFormSchema } from '../types/daily-sales.validation'
import type { DailyShiftValue, EligibleCustomer } from '../types/daily-sales.types'

interface CustomerQuantityListProps {
  control: Control<DailySalesFormSchema>
  customers: EligibleCustomer[]
  errors: FieldErrors<DailySalesFormSchema>
  shift: DailyShiftValue
  disabled?: boolean
}

export function CustomerQuantityList({
  control,
  customers,
  errors,
  shift,
  disabled = false,
}: CustomerQuantityListProps) {
  return (
    <Card className="grid gap-4">
      <div>
        <h2 className="text-base font-semibold">Customer sales</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter litres sold to each active {shift.toLowerCase()} customer.
        </p>
      </div>
      {customers.length > 0 ? (
        <div className="grid gap-3">
          {customers.map((customer) => (
            <div
              className="grid grid-cols-[1fr_minmax(7rem,10rem)] items-center gap-3 rounded-xl border border-border/70 p-3"
              key={customer.id}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{customer.name}</p>
                <p className="text-xs text-muted-foreground">{shift} shift</p>
              </div>
              <Controller
                control={control}
                name={`sales.${customer.id}` as never}
                render={({ field, fieldState }) => (
                  <div className="grid gap-1">
                    <NumberInput
                      label={`${customer.name} quantity`}
                      value={field.value as number}
                      min={0}
                      step={0.01}
                      disabled={disabled}
                      onChange={(value) => field.onChange(value ?? 0)}
                    />
                    {fieldState.error || errors.sales ? (
                      <p className="text-xs text-destructive" role="alert">
                        {fieldState.error?.message}
                      </p>
                    ) : null}
                  </div>
                )}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">
          No active customers are assigned to this shift on the selected date.
        </p>
      )}
    </Card>
  )
}
