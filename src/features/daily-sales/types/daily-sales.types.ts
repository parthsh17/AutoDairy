import type { ISODateString } from '@/types/common.types'

export type DailyShiftValue = 'Morning' | 'Evening'

export interface DailyShiftRecord {
  id: string
  date: ISODateString
  shift: DailyShiftValue
  milk_collected: number
  home_quantity: number
  milk_price: number
  created_at: string
  updated_at: string
}

export interface DailySaleRecord {
  id: string
  daily_shift_id: string
  customer_id: string
  quantity: number
  created_at: string
}

export interface EligibleCustomer {
  id: string
  name: string
  morning_enabled: boolean
  evening_enabled: boolean
}

export interface DailySalesWorkflow {
  customers: EligibleCustomer[]
  currentMilkPrice: number
  sales: DailySaleRecord[]
  shift: DailyShiftRecord | null
}

export interface DailySalesFormValues {
  milkCollected: number
  homeQuantity: number
  sales: Record<string, number>
}

export interface DailySalesSaveInput extends DailySalesFormValues {
  date: ISODateString
  shift: DailyShiftValue
}
