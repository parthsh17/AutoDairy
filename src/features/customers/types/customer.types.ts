import type { ISODateString } from '@/types/common.types'

export interface CustomerRecord {
  id: string
  name: string
  phone: string | null
  morning_enabled: boolean
  evening_enabled: boolean
  created_at: string
  updated_at: string
  customer_memberships: MembershipRecord[]
}

export interface MembershipRecord {
  id: string
  customer_id: string
  start_date: ISODateString
  end_date: ISODateString | null
  created_at: string
}

export type CustomerShift = 'morning' | 'evening' | 'both'
export type CustomerStatusFilter = 'active' | 'inactive' | 'all'
export type CustomerShiftFilter = 'all' | 'morning' | 'evening'

export interface CustomerFilters {
  search: string
  status: CustomerStatusFilter
  shift: CustomerShiftFilter
}

export interface CustomerFormValues {
  name: string
  phone: string
  shift: CustomerShift
  membershipStartDate: string
}

export interface CustomerViewModel extends Omit<CustomerRecord, 'customer_memberships'> {
  customer_memberships: MembershipRecord[]
  isActive: boolean
}
