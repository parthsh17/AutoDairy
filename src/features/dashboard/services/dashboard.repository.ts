import { supabase } from '@/lib/supabase'
import { BaseRepository } from '@/repositories/base.repository'
import type { DashboardDateRange, DashboardSourceData } from '../types/dashboard.types'

export class DashboardRepository extends BaseRepository<DashboardSourceData> {
  constructor() {
    super('Dashboard')
  }

  async load(range: DashboardDateRange) {
    return this.execute(async () => {
      const [shiftResult, incomeResult, expenseResult, customerResult] = await Promise.all([
        supabase
          .from('daily_shifts')
          .select('*')
          .gte('date', range.from)
          .lte('date', range.to)
          .order('date', { ascending: true }),
        supabase
          .from('income')
          .select('*')
          .gte('date', range.from)
          .lte('date', range.to)
          .order('date', { ascending: false }),
        supabase
          .from('expenses')
          .select('*')
          .gte('date', range.from)
          .lte('date', range.to)
          .order('date', { ascending: false }),
        supabase.from('customers').select('id, customer_memberships(start_date, end_date)'),
      ])
      if (shiftResult.error) throw shiftResult.error
      if (incomeResult.error) throw incomeResult.error
      if (expenseResult.error) throw expenseResult.error
      if (customerResult.error) throw customerResult.error

      const shifts = (shiftResult.data ?? []) as DashboardSourceData['shifts']
      const shiftIds = shifts.map((shift) => shift.id)
      const salesResult =
        shiftIds.length === 0
          ? { data: [], error: null }
          : await supabase.from('sales').select('*, customers(name)').in('daily_shift_id', shiftIds)
      if (salesResult.error) throw salesResult.error
      return {
        customers: (customerResult.data ?? []) as DashboardSourceData['customers'],
        expenses: (expenseResult.data ?? []) as DashboardSourceData['expenses'],
        income: (incomeResult.data ?? []) as DashboardSourceData['income'],
        sales: (salesResult.data ?? []) as DashboardSourceData['sales'],
        shifts,
      }
    })
  }
}

export const dashboardRepository = new DashboardRepository()
