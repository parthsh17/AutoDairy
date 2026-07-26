import { supabase } from '@/lib/supabase'
import { BaseRepository } from '@/repositories/base.repository'
import { customerService } from '@/features/customers/services/customer.service'
import { isMembershipActive } from '@/features/customers/utils/customer.utils'
import type { ISODateString } from '@/types/common.types'
import type { DailySaleRecord, DailyShiftRecord, DailyShiftValue, EligibleCustomer } from '../types/daily-sales.types'
import { DEFAULT_MILK_PRICE } from '../utils/daily-sales.utils'

export class DailySalesRepository extends BaseRepository<DailyShiftRecord> {
  constructor() {
    super('Daily shift')
  }

  async findShift(date: ISODateString, shift: DailyShiftValue) {
    return this.execute(async () => {
      const { data, error } = await supabase
        .from('daily_shifts')
        .select('*')
        .eq('date', date)
        .eq('shift', shift)
        .maybeSingle()

      if (error) throw error
      return data as DailyShiftRecord | null
    })
  }

  async listSales(dailyShiftId: string) {
    return this.execute(async () => {
      const { data, error } = await supabase.from('sales').select('*').eq('daily_shift_id', dailyShiftId)

      if (error) throw error
      return (data ?? []) as DailySaleRecord[]
    })
  }

  async getEligibleCustomers(date: ISODateString, shift: DailyShiftValue) {
    return this.execute(async () => {
      const customers = await customerService.listCustomers()
      const enabledForShift = shift === 'Morning' ? 'morning_enabled' : 'evening_enabled'

      return customers
        .filter((customer) => customer[enabledForShift])
        .filter((customer) => customer.customer_memberships.some((membership) => isMembershipActive(membership, date)))
        .map<EligibleCustomer>((customer) => ({
          evening_enabled: customer.evening_enabled,
          id: customer.id,
          morning_enabled: customer.morning_enabled,
          name: customer.name,
        }))
        .sort((left, right) => left.name.localeCompare(right.name))
    })
  }

  async getCurrentMilkPrice() {
    return this.execute(async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('milk_price')
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle()

      if (error) throw error
      return Number(data?.milk_price ?? DEFAULT_MILK_PRICE)
    })
  }

  async insertShift(input: {
    date: ISODateString
    shift: DailyShiftValue
    milk_collected: number
    home_quantity: number
    milk_price: number
  }) {
    return this.execute(async () => {
      const { data, error } = await supabase.from('daily_shifts').insert(input).select('*').single()
      if (error) throw error
      return data as DailyShiftRecord
    })
  }

  async updateShift(id: string, input: { milk_collected: number; home_quantity: number }) {
    return this.execute(async () => {
      const { data, error } = await supabase.from('daily_shifts').update(input).eq('id', id).select('*').single()
      if (error) throw error
      return data as DailyShiftRecord
    })
  }

  async deleteSales(dailyShiftId: string) {
    return this.execute(async () => {
      const { error } = await supabase.from('sales').delete().eq('daily_shift_id', dailyShiftId)
      if (error) throw error
    })
  }

  async insertSales(rows: Array<{ daily_shift_id: string; customer_id: string; quantity: number }>) {
    if (rows.length === 0) return

    return this.execute(async () => {
      const { error } = await supabase.from('sales').insert(rows)
      if (error) throw error
    })
  }

  async deleteShift(id: string) {
    return this.execute(async () => {
      const { error } = await supabase.from('daily_shifts').delete().eq('id', id)
      if (error) throw error
    })
  }
}
