import { supabase } from '@/lib/supabase'
import { BaseRepository } from '@/repositories/base.repository'

export interface SettingsRecord {
  id: string
  milk_price: number
  created_at: string
  updated_at: string
}

export class SettingsRepository extends BaseRepository<SettingsRecord | null> {
  constructor() {
    super('Settings')
  }

  async getCurrent() {
    return this.execute(async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle()
      if (error) throw error
      return (data ?? null) as SettingsRecord | null
    })
  }

  async upsertMilkPrice(milkPrice: number) {
    return this.execute(async () => {
      const current = await this.getCurrent()
      if (!current) {
        const { data, error } = await supabase.from('settings').insert({ milk_price: milkPrice }).select('*').single()
        if (error) throw error
        return data as SettingsRecord
      }

      const { data, error } = await supabase
        .from('settings')
        .update({ milk_price: milkPrice })
        .eq('id', current.id)
        .select('*')
        .single()
      if (error) throw error
      return data as SettingsRecord
    })
  }
}

export const settingsRepository = new SettingsRepository()
