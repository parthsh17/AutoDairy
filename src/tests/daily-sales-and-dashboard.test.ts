import { describe, expect, it } from 'vitest'
import {
  calculateRemainingMilk,
  calculateRevenue,
  calculateTotalCustomerSales,
} from '@/features/daily-sales/utils/daily-sales.utils'
import {
  calculateMonthSummary,
  calculateSummary,
  buildActivity,
  buildSeries,
  buildShiftCollection,
  buildTopCustomers,
} from '@/features/dashboard/utils/dashboard.utils'
import type { ISODateString } from '@/types/common.types'

const iso = (value: string): ISODateString => value as ISODateString

describe('daily sales and dashboard calculations', () => {
  const shifts = [
    {
      id: 's1',
      date: iso('2026-07-01'),
      shift: 'Morning' as const,
      milk_collected: 100,
      home_quantity: 10,
      milk_price: 50,
      created_at: '2026-07-01T00:00:00Z',
      updated_at: '2026-07-01T00:00:00Z',
    },
    {
      id: 's2',
      date: iso('2026-07-01'),
      shift: 'Evening' as const,
      milk_collected: 80,
      home_quantity: 5,
      milk_price: 60,
      created_at: '2026-07-01T00:00:00Z',
      updated_at: '2026-07-01T00:00:00Z',
    },
  ]
  const sales = [
    {
      id: 'a',
      daily_shift_id: 's1',
      customer_id: 'c1',
      quantity: 40,
      created_at: '2026-07-01T00:00:00Z',
      customers: { name: 'A' },
    },
    {
      id: 'b',
      daily_shift_id: 's2',
      customer_id: 'c1',
      quantity: 20,
      created_at: '2026-07-01T00:00:00Z',
      customers: { name: 'A' },
    },
  ]
  const customers = [
    { id: 'c1', customer_memberships: [{ start_date: iso('2026-01-01'), end_date: null as ISODateString | null }] },
  ]
  const income = [{ id: 'i1', date: iso('2026-07-01'), name: 'Gov', amount: 1000, created_at: '2026-07-01T00:00:00Z' }]
  const expenses = [
    { id: 'e1', date: iso('2026-07-01'), name: 'Feed', amount: 250, created_at: '2026-07-01T00:00:00Z' },
  ]

  it('calculates daily milk totals and revenue', () => {
    expect(calculateTotalCustomerSales({ c1: 40, c2: 20 })).toBe(60)
    expect(calculateRemainingMilk({ milkCollected: 100, homeQuantity: 10, sales: { c1: 20 } })).toBe(70)
    expect(calculateRevenue({ milkCollected: 100, homeQuantity: 10, sales: { c1: 20, c2: 30 } }, 50)).toBe(2500)
  })

  it('calculates dashboard summaries', () => {
    expect(calculateSummary(shifts, sales, customers, iso('2026-07-01')).revenue).toBe(3200)
    expect(
      calculateMonthSummary(shifts, sales, income, expenses, { from: iso('2026-07-01'), to: iso('2026-07-31') })
        .netProfit,
    ).toBe(3950)
    expect(
      buildSeries(shifts, sales, income, expenses, { from: iso('2026-07-01'), to: iso('2026-07-31') }),
    ).toHaveLength(1)
    expect(buildShiftCollection(shifts, { from: iso('2026-07-01'), to: iso('2026-07-31') })).toHaveLength(2)
    expect(buildTopCustomers(shifts, sales, { from: iso('2026-07-01'), to: iso('2026-07-31') })).toHaveLength(1)
    expect(buildActivity(shifts, sales, income, expenses)).toHaveLength(4)
  })
})
