import { supabase } from '@/lib/supabase'
import { BaseRepository } from '@/repositories/base.repository'
import type { ISODateString } from '@/types/common.types'
import type { BillCustomerRecord, BillSaleRecord, MonthlyBillsSource } from '../types/bill.types'

export class BillsRepository extends BaseRepository<MonthlyBillsSource> {
  constructor() {
    super('Bills')
  }

  async loadMonth(monthStart: ISODateString, monthEnd: ISODateString) {
    return this.execute(async () => {
      const [customerResult, shiftResult] = await Promise.all([
        supabase
          .from('customers')
          .select('id, name, phone, morning_enabled, evening_enabled, customer_memberships(start_date, end_date)')
          .order('name', { ascending: true }),
        supabase
          .from('daily_shifts')
          .select('id, date, shift, milk_price')
          .gte('date', monthStart)
          .lte('date', monthEnd)
          .order('date', { ascending: true })
          .order('shift', { ascending: true }),
      ])

      if (customerResult.error) throw customerResult.error
      if (shiftResult.error) throw shiftResult.error

      const shiftIds = (shiftResult.data ?? []).map((shift) => shift.id)
      const salesResult =
        shiftIds.length === 0
          ? { data: [], error: null }
          : await supabase
              .from('sales')
              .select('customer_id, quantity, daily_shifts(date, shift, milk_price)')
              .in('daily_shift_id', shiftIds)

      if (salesResult.error) throw salesResult.error

      return {
        customers: (customerResult.data ?? []) as BillCustomerRecord[],
        sales: (salesResult.data ?? []) as BillSaleRecord[],
      }
    })
  }
}

export const billsRepository = new BillsRepository()
