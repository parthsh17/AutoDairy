import { supabase } from '@/lib/supabase'
import { BaseRepository } from '@/repositories/base.repository'
import type { ExpenseRecord } from '../types/expense.types'

export class ExpenseRepository extends BaseRepository<ExpenseRecord> {
  constructor() {
    super('Expense')
  }

  async list() {
    return this.execute(async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false })
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data ?? []) as ExpenseRecord[]
    })
  }

  async create(input: { date: string; name: string; amount: number }) {
    return this.execute(async () => {
      const { data, error } = await supabase.from('expenses').insert(input).select('*').single()
      if (error) throw error
      return data as ExpenseRecord
    })
  }

  async update(id: string, input: { date: string; name: string; amount: number }) {
    return this.execute(async () => {
      const { data, error } = await supabase.from('expenses').update(input).eq('id', id).select('*').single()
      if (error) throw error
      return data as ExpenseRecord
    })
  }

  async delete(id: string) {
    return this.execute(async () => {
      const { error } = await supabase.from('expenses').delete().eq('id', id)
      if (error) throw error
    })
  }
}
