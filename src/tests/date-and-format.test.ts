import { describe, expect, it } from 'vitest'
import { formatDate, toISODate } from '@/utils/date.utils'
import { formatAmount } from '@/utils/financial.utils'

describe('date and formatting utilities', () => {
  it('formats ISO dates in local display form', () => {
    expect(formatDate('2026-07-26')).toMatch(/26/)
  })

  it('creates ISO dates', () => {
    expect(toISODate(new Date('2026-07-26T00:00:00Z'))).toBe('2026-07-26')
  })

  it('formats currency', () => {
    expect(formatAmount(1234.5)).toContain('1,234.50')
  })
})
