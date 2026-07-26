import { z } from 'zod'

const quantitySchema = z
  .number({ message: 'Enter a valid number' })
  .finite('Enter a valid number')
  .min(0, 'Quantity cannot be negative')
  .refine((value) => Number.isInteger(value * 100), 'Use no more than two decimal places')

export const dailySalesFormSchema = z
  .object({
    milkCollected: quantitySchema,
    homeQuantity: quantitySchema,
    sales: z.record(z.string(), quantitySchema),
  })
  .superRefine((values, context) => {
    const totalSales = Object.values(values.sales).reduce((total, quantity) => total + quantity, 0)
    const remainingMilk = values.milkCollected - values.homeQuantity - totalSales

    if (remainingMilk < 0) {
      context.addIssue({
        code: 'custom',
        message: 'Collected milk must cover home quantity and customer sales.',
        path: ['root'],
      })
    }
  })

export type DailySalesFormSchema = z.infer<typeof dailySalesFormSchema>
