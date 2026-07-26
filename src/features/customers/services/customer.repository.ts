import { BaseRepository } from '@/repositories/base.repository'
import { supabase } from '@/lib/supabase'
import type { CustomerRecord, MembershipRecord } from '../types/customer.types'

const customerSelect = '*, customer_memberships(*)'

export class CustomerRepository extends BaseRepository<CustomerRecord> {
  constructor() {
    super('Customer')
  }

  async list() {
    return this.execute(async () => {
      const { data, error } = await supabase.from('customers').select(customerSelect).order('name', { ascending: true })

      if (error) throw error
      return (data ?? []) as CustomerRecord[]
    })
  }

  async insertCustomer(input: {
    name: string
    phone: string | null
    morning_enabled: boolean
    evening_enabled: boolean
  }) {
    return this.execute(async () => {
      const { data, error } = await supabase.from('customers').insert(input).select('*').single()
      if (error) throw error
      return data as CustomerRecord
    })
  }

  async updateCustomer(
    id: string,
    input: { name: string; phone: string | null; morning_enabled: boolean; evening_enabled: boolean },
  ) {
    return this.execute(async () => {
      const { data, error } = await supabase.from('customers').update(input).eq('id', id).select('*').single()
      if (error) throw error
      return data as CustomerRecord
    })
  }

  async insertMembership(input: { customer_id: string; start_date: string; end_date?: string | null }) {
    return this.execute(async () => {
      const { data, error } = await supabase.from('customer_memberships').insert(input).select('*').single()
      if (error) throw error
      return data as MembershipRecord
    })
  }

  async updateMembership(id: string, input: { end_date: string }) {
    return this.execute(async () => {
      const { data, error } = await supabase
        .from('customer_memberships')
        .update(input)
        .eq('id', id)
        .select('*')
        .single()
      if (error) throw error
      return data as MembershipRecord
    })
  }

  async rollbackNewCustomer(id: string) {
    return this.execute(async () => {
      const { error } = await supabase.from('customers').delete().eq('id', id)
      if (error) throw error
    })
  }
}
