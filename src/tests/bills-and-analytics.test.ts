import { describe, expect, it } from 'vitest'
import { buildBillRows, calculateBillSummary, getMonthRange } from '@/features/bills/utils/bill.utils'
import { buildAnalyticsReport, exportAnalyticsCsv, getTodayRange } from '@/features/analytics/utils/analytics.utils'
import type { ISODateString } from '@/types/common.types'

const iso = (value: string) => value as ISODateString

describe('bills and analytics calculations', () => {
  const customers = [
    {
      id: 'c1',
      name: 'Alpha',
      phone: '111',
      morning_enabled: true,
      evening_enabled: true,
      customer_memberships: [{ start_date: iso('2026-01-01'), end_date: null }],
    },
  ]
  const sales = [
    {
      customer_id: 'c1',
      quantity: 10,
      daily_shifts: { date: iso('2026-07-01'), shift: 'Morning' as const, milk_price: 50 },
    },
    {
      customer_id: 'c1',
      quantity: 5,
      daily_shifts: { date: iso('2026-07-01'), shift: 'Evening' as const, milk_price: 60 },
    },
  ]

  it('builds monthly bills dynamically from historical prices', () => {
    const range = getMonthRange(2026, 7)
    const rows = buildBillRows(customers, sales, range.from, range.to)
    expect(rows[0].totalAmount).toBe(800)
    expect(calculateBillSummary(rows).totalRevenue).toBe(800)
  })

  it('builds analytics report and CSV export', () => {
    const report = buildAnalyticsReport(
      {
        customers: [
          {
            id: 'c1',
            name: 'Alpha',
            phone: '111',
            morning_enabled: true,
            evening_enabled: true,
            customer_memberships: [{ start_date: iso('2026-01-01'), end_date: null }],
          },
        ],
        expenses: [{ id: 'e1', date: iso('2026-07-01'), name: 'Feed', amount: 100 }],
        income: [{ id: 'i1', date: iso('2026-07-01'), name: 'Gov', amount: 200 }],
        sales: [
          {
            id: 's1',
            daily_shift_id: 'ds1',
            customer_id: 'c1',
            quantity: 15,
            daily_shifts: {
              date: iso('2026-07-01'),
              shift: 'Morning',
              milk_price: 50,
              milk_collected: 100,
              home_quantity: 10,
            },
            customers: { id: 'c1', name: 'Alpha' },
          },
        ],
        shifts: [
          {
            id: 'ds1',
            date: iso('2026-07-01'),
            shift: 'Morning',
            milk_collected: 100,
            home_quantity: 10,
            milk_price: 50,
          },
        ],
      },
      getTodayRange(new Date('2026-07-01T00:00:00Z')),
      'quantity',
    )
    expect(report.overview.revenue).toBe(750)
    expect(exportAnalyticsCsv(report)).toContain('Net Profit')
  })
})
