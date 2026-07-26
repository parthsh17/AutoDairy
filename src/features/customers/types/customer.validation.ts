import { z } from 'zod'

export const customerFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120, 'Name is too long'),
  phone: z.string().trim().max(30, 'Phone number is too long'),
  shift: z.enum(['morning', 'evening', 'both'], { message: 'Select at least one shift' }),
  membershipStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date is required'),
})

export type CustomerFormSchema = z.infer<typeof customerFormSchema>
