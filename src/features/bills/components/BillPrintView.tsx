import { formatAmount } from '@/utils/financial.utils'
import type { BillRow } from '../types/bill.types'
import { formatBillDate, formatBillLitreValue, getBillingPeriodLabel } from '../utils/bill.utils'

interface BillPrintViewProps {
  rows: BillRow[]
  billingMonth: string
  billingYear: string
  selectedCustomerId: string | null
  mode: 'all' | 'single'
}

export function BillPrintView({ rows, billingMonth, billingYear, mode, selectedCustomerId }: BillPrintViewProps) {
  const printableRows =
    mode === 'single' && selectedCustomerId ? rows.filter((row) => row.customerId === selectedCustomerId) : rows

  return (
    <div className="bill-print-view hidden bg-white p-6 text-black print:block">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Monthly Bills</h1>
        <p className="text-sm">{getBillingPeriodLabel(billingMonth, billingYear)}</p>
      </div>
      {printableRows.map((row) => (
        <section key={row.customerId} className="mb-8 break-inside-avoid">
          <h2 className="text-lg font-semibold">{row.customerName}</h2>
          <p className="text-sm">{row.phone ?? 'No phone number recorded'}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <p>Morning: {formatBillLitreValue(row.morningQuantity)}</p>
            <p>Evening: {formatBillLitreValue(row.eveningQuantity)}</p>
            <p>Total: {formatBillLitreValue(row.totalQuantity)}</p>
            <p>Amount: {formatAmount(row.totalAmount)}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium">Daily quantities</p>
            {row.dailyEntries.map((entry) => (
              <p key={`${entry.date}-${entry.shift}`} className="text-sm">
                {formatBillDate(entry.date)} {entry.shift}: {formatBillLitreValue(entry.totalQuantity)} at ₹
                {entry.milkPrice.toFixed(2)}/L
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
