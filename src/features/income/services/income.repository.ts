import { supabase } from '@/lib/supabase'
import { BaseRepository } from '@/repositories/base.repository'
import type { IncomeRecord } from '../types/income.types'

export class IncomeRepository extends BaseRepository<IncomeRecord> {
  constructor() {
    super('Income')
  }

  async list() {
    return this.execute(async () => {
      const { data, error } = await supabase
        .from('income')
        .select('*')
        .order('date', { ascending: false })
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data ?? []) as IncomeRecord[]
    })
  }

  async create(input: { date: string; name: string; amount: number }) {
    return this.execute(async () => {
      const { data, error } = await supabase.from('income').insert(input).select('*').single()
      if (error) throw error
      return data as IncomeRecord
    })
  }

  async update(id: string, input: { date: string; name: string; amount: number }) {
    return this.execute(async () => {
      const { data, error } = await supabase.from('income').update(input).eq('id', id).select('*').single()
      if (error) throw error
      return data as IncomeRecord
    })
  }

  async delete(id: string) {
    return this.execute(async () => {
      const { error } = await supabase.from('income').delete().eq('id', id)
      if (error) throw error
    })
  }
}
