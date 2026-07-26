import { describe, expect, it } from 'vitest'
import { customerFormSchema } from '@/features/customers/types/customer.validation'
import { dailySalesFormSchema } from '@/features/daily-sales/types/daily-sales.validation'
import { financialFormSchema } from '@/utils/financial.validation'

describe('validation schemas', () => {
  it('accepts valid customer data', () => {
    expect(
      customerFormSchema.safeParse({ name: 'A', phone: '', shift: 'both', membershipStartDate: '2026-07-01' }).success,
    ).toBe(true)
  })

  it('rejects invalid sales', () => {
    expect(dailySalesFormSchema.safeParse({ milkCollected: 10, homeQuantity: 8, sales: { c1: 5 } }).success).toBe(false)
  })

  it('validates financial entries', () => {
    expect(financialFormSchema.safeParse({ date: '2026-07-01', name: 'X', amount: 10 }).success).toBe(true)
  })
})
