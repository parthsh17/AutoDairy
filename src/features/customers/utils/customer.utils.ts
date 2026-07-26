import type { ISODateString } from '@/types/common.types'
import type { CustomerRecord, CustomerShift, CustomerViewModel, MembershipRecord } from '../types/customer.types'

export function isMembershipActive(membership: MembershipRecord, selectedDate: ISODateString) {
  return membership.start_date <= selectedDate && (membership.end_date === null || membership.end_date >= selectedDate)
}

export function isCustomerActive(customer: CustomerRecord, selectedDate: ISODateString) {
  return customer.customer_memberships.some((membership) => isMembershipActive(membership, selectedDate))
}

export function toCustomerViewModel(customer: CustomerRecord, selectedDate: ISODateString): CustomerViewModel {
  return { ...customer, isActive: isCustomerActive(customer, selectedDate) }
}

export function filterCustomers(
  customers: CustomerRecord[],
  filters: { search: string; status: 'active' | 'inactive' | 'all'; shift: 'all' | 'morning' | 'evening' },
  selectedDate: ISODateString,
) {
  const search = filters.search.trim().toLocaleLowerCase()

  return customers
    .map((customer) => toCustomerViewModel(customer, selectedDate))
    .filter((customer) => {
      const matchesSearch =
        search.length === 0 ||
        customer.name.toLocaleLowerCase().includes(search) ||
        customer.phone?.toLocaleLowerCase().includes(search) === true
      const matchesStatus =
        filters.status === 'all' || (filters.status === 'active' ? customer.isActive : !customer.isActive)
      const matchesShift =
        filters.shift === 'all' || (filters.shift === 'morning' ? customer.morning_enabled : customer.evening_enabled)

      return matchesSearch && matchesStatus && matchesShift
    })
    .sort((left, right) => left.name.localeCompare(right.name))
}

export function customerShiftFromFlags(morningEnabled: boolean, eveningEnabled: boolean): CustomerShift {
  if (morningEnabled && eveningEnabled) return 'both'
  return morningEnabled ? 'morning' : 'evening'
}

export function flagsFromCustomerShift(shift: CustomerShift) {
  return {
    morning_enabled: shift === 'morning' || shift === 'both',
    evening_enabled: shift === 'evening' || shift === 'both',
  }
}

export function getCurrentMembership(customer: CustomerRecord, selectedDate: ISODateString) {
  return customer.customer_memberships
    .filter((membership) => isMembershipActive(membership, selectedDate))
    .sort((left, right) => right.start_date.localeCompare(left.start_date))[0]
}
