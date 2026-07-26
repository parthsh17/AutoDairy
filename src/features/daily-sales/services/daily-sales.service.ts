import { AppError } from '@/lib/errors'
import type { ISODateString } from '@/types/common.types'
import { DailySalesRepository } from './daily-sales.repository'
import type { DailySalesSaveInput, DailySalesWorkflow, DailyShiftValue } from '../types/daily-sales.types'
import { calculateRemainingMilk } from '../utils/daily-sales.utils'

export class DailySalesService {
  private readonly repository: DailySalesRepository

  constructor(repository = new DailySalesRepository()) {
    this.repository = repository
  }

  async getWorkflow(date: ISODateString, shift: DailyShiftValue): Promise<DailySalesWorkflow> {
    const [shiftRecord, customers, currentMilkPrice] = await Promise.all([
      this.repository.findShift(date, shift),
      this.repository.getEligibleCustomers(date, shift),
      this.repository.getCurrentMilkPrice(),
    ])
    const sales = shiftRecord ? await this.repository.listSales(shiftRecord.id) : []

    return { customers, currentMilkPrice, sales, shift: shiftRecord }
  }

  async save(input: DailySalesSaveInput) {
    if (calculateRemainingMilk(input) < 0) {
      throw new AppError('Daily sales exceed available milk', {
        code: 'VALIDATION_ERROR',
        userMessage: 'Collected milk must cover home quantity and customer sales.',
      })
    }

    const existingShift = await this.repository.findShift(input.date, input.shift)
    const previousSales = existingShift ? await this.repository.listSales(existingShift.id) : []
    const shift = existingShift
      ? await this.repository.updateShift(existingShift.id, {
          home_quantity: input.homeQuantity,
          milk_collected: input.milkCollected,
        })
      : await this.repository.insertShift({
          date: input.date,
          home_quantity: input.homeQuantity,
          milk_collected: input.milkCollected,
          milk_price: await this.repository.getCurrentMilkPrice(),
          shift: input.shift,
        })

    const nextSales = Object.entries(input.sales)
      .filter(([, quantity]) => quantity > 0)
      .map(([customerId, quantity]) => ({ customer_id: customerId, daily_shift_id: shift.id, quantity }))

    try {
      await this.repository.deleteSales(shift.id)
      await this.repository.insertSales(nextSales)
    } catch (error) {
      await this.repository.deleteSales(shift.id).catch(() => undefined)
      if (existingShift) {
        await this.repository
          .insertSales(
            previousSales.map(({ customer_id, daily_shift_id, quantity }) => ({
              customer_id,
              daily_shift_id,
              quantity,
            })),
          )
          .catch(() => undefined)
        await this.repository
          .updateShift(existingShift.id, {
            home_quantity: existingShift.home_quantity,
            milk_collected: existingShift.milk_collected,
          })
          .catch(() => undefined)
      } else {
        await this.repository.deleteShift(shift.id).catch(() => undefined)
      }
      throw error
    }

    return shift
  }

  async reset(date: ISODateString, shift: DailyShiftValue) {
    const existingShift = await this.repository.findShift(date, shift)
    if (!existingShift) return

    await this.repository.deleteSales(existingShift.id)
    await this.repository.deleteShift(existingShift.id)
  }
}

export const dailySalesService = new DailySalesService()
