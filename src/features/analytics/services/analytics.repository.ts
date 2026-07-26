import { supabase } from '@/lib/supabase'
import { BaseRepository } from '@/repositories/base.repository'
import type { AnalyticsDateRange, AnalyticsSourceData } from '../types/analytics.types'

export class AnalyticsRepository extends BaseRepository<AnalyticsSourceData> {
  constructor() {
    super('Analytics')
  }

  async load(range: AnalyticsDateRange) {
    return this.execute(async () => {
      const [shiftResult, customerResult, incomeResult, expenseResult] = await Promise.all([
        supabase
          .from('daily_shifts')
          .select('id, date, shift, milk_collected, home_quantity, milk_price')
          .gte('date', range.from)
          .lte('date', range.to)
          .order('date', { ascending: true }),
        supabase
          .from('customers')
          .select('id, name, phone, morning_enabled, evening_enabled, customer_memberships(start_date, end_date)')
          .order('name', { ascending: true }),
        supabase
          .from('income')
          .select('id, date, name, amount')
          .gte('date', range.from)
          .lte('date', range.to)
          .order('date', { ascending: true }),
        supabase
          .from('expenses')
          .select('id, date, name, amount')
          .gte('date', range.from)
          .lte('date', range.to)
          .order('date', { ascending: true }),
      ])

      if (shiftResult.error) throw shiftResult.error
      if (customerResult.error) throw customerResult.error
      if (incomeResult.error) throw incomeResult.error
      if (expenseResult.error) throw expenseResult.error

      const shiftIds = (shiftResult.data ?? []).map((shift) => shift.id)
      const salesResult =
        shiftIds.length === 0
          ? { data: [], error: null }
          : await supabase
              .from('sales')
              .select(
                'id, daily_shift_id, customer_id, quantity, daily_shifts(date, shift, milk_price, milk_collected, home_quantity), customers(id, name)',
              )
              .in('daily_shift_id', shiftIds)

      if (salesResult.error) throw salesResult.error

      return {
        customers: (customerResult.data ?? []) as AnalyticsSourceData['customers'],
        expenses: (expenseResult.data ?? []) as AnalyticsSourceData['expenses'],
        income: (incomeResult.data ?? []) as AnalyticsSourceData['income'],
        sales: (salesResult.data ?? []) as AnalyticsSourceData['sales'],
        shifts: (shiftResult.data ?? []) as AnalyticsSourceData['shifts'],
      }
    })
  }
}

export const analyticsRepository = new AnalyticsRepository()
