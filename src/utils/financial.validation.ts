import { z } from 'zod'

export const financialFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date is required'),
  name: z.string().trim().min(1, 'Name is required').max(120, 'Name is too long'),
  amount: z
    .number({ message: 'Enter a valid amount' })
    .finite('Enter a valid amount')
    .positive('Amount must be greater than zero')
    .refine((value) => Number.isInteger(value * 100), 'Use no more than two decimal places'),
})

export type FinancialFormSchema = z.infer<typeof financialFormSchema>
