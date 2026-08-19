import { AppError } from '@/lib/errors'
import { toISODate } from '@/utils/date.utils'
import type { ISODateString } from '@/types/common.types'
import { CustomerRepository } from './customer.repository'
import type { CustomerFormValues } from '../types/customer.types'
import { flagsFromCustomerShift, getCurrentMembership, isCustomerActive } from '../utils/customer.utils'

export class CustomerService {
  private readonly repository: CustomerRepository

  constructor(repository = new CustomerRepository()) {
    this.repository = repository
  }

  listCustomers() {
    return this.repository.list()
  }

  async createCustomer(values: CustomerFormValues) {
    const customer = await this.repository.insertCustomer({
      ...flagsFromCustomerShift(values.shift),
      name: values.name.trim(),
      phone: values.phone.trim() || null,
    })

    try {
      await this.repository.insertMembership({
        customer_id: customer.id,
        start_date: values.membershipStartDate,
      })
      return customer
    } catch (error) {
      await this.repository.rollbackNewCustomer(customer.id).catch(() => undefined)
      throw error
    }
  }

  updateCustomer(id: string, values: CustomerFormValues) {
    return this.repository.updateCustomer(id, {
      ...flagsFromCustomerShift(values.shift),
      name: values.name.trim(),
      phone: values.phone.trim() || null,
    })
  }

  async pauseCustomer(customerId: string, selectedDate: ISODateString = toISODate(new Date())) {
    const customer = await this.getCustomer(customerId)
    const membership = getCurrentMembership(customer, selectedDate)

    if (!membership) {
      throw new AppError('Customer has no active membership', {
        code: 'VALIDATION_ERROR',
        userMessage: 'This customer is already inactive.',
      })
    }

    // The database requires end_date to be on or after start_date. The
    // active-state calculation treats this date as the pause boundary.
    return this.repository.updateMembership(membership.id, { end_date: selectedDate })
  }

  async resumeCustomer(customerId: string, selectedDate: ISODateString = toISODate(new Date())) {
    const customer = await this.getCustomer(customerId)

    if (isCustomerActive(customer, selectedDate)) {
      throw new AppError('Customer already has an active membership', {
        code: 'VALIDATION_ERROR',
        userMessage: 'This customer is already active.',
      })
    }

    return this.repository.insertMembership({ customer_id: customerId, start_date: selectedDate })
  }

  private async getCustomer(id: string) {
    const customer = (await this.repository.list()).find((item) => item.id === id)

    if (!customer) {
      throw new AppError('Customer was not found', {
        code: 'NOT_FOUND',
        userMessage: 'The customer could not be found.',
      })
    }

    return customer
  }
}

export const customerService = new CustomerService()
