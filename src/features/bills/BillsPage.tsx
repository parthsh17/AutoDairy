import { useMemo, useState } from 'react'
import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getUserFacingErrorMessage } from '@/lib/errors'
import { BillDetail } from './components/BillDetail'
import { BillFilters } from './components/BillFilters'
import { BillList } from './components/BillList'
import { BillPrintView } from './components/BillPrintView'
import { BillSummaryCards } from './components/BillSummaryCards'
import { useMonthlyBills } from './hooks/useMonthlyBills'
import type { BillMonthFilter } from './types/bill.types'

const today = new Date()
const initialFilter: BillMonthFilter & { search: string } = {
  month: String(today.getMonth() + 1).padStart(2, '0'),
  search: '',
  year: String(today.getFullYear()),
}

export function BillsPage() {
  const [filters, setFilters] = useState(initialFilter)
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null)
  const [printMode, setPrintMode] = useState<'all' | 'single'>('all')
  const query = useMonthlyBills(filters)

  const filteredRows = useMemo(() => {
    const rows = query.data?.rows ?? []
    const search = filters.search.trim().toLowerCase()
    if (!search) return rows
    return rows.filter(
      (row) => row.customerName.toLowerCase().includes(search) || (row.phone ?? '').toLowerCase().includes(search),
    )
  }, [filters.search, query.data?.rows])

  const selectedBill = filteredRows.find((row) => row.customerId === selectedBillId) ?? filteredRows[0] ?? null

  const handlePrintAll = () => {
    setPrintMode('all')
    window.setTimeout(() => window.print(), 0)
  }

  const handlePrintSelected = () => {
    if (!selectedBill) return
    setPrintMode('single')
    window.setTimeout(() => window.print(), 0)
  }

  return (
    <div className="grid gap-4 pb-6">
      <SectionHeader
        title="Bills"
        description="Generate monthly bills dynamically from daily sales and historical milk prices."
        headingLevel={1}
        action={
          <Button type="button" variant="primary" icon={<Printer className="size-4" />} onClick={handlePrintAll}>
            Export all PDF
          </Button>
        }
      />
      <BillFilters value={filters} onChange={setFilters} />
      {query.isLoading ? (
        <div className="grid gap-3" role="status" aria-label="Loading monthly bills">
          <LoadingSkeleton className="h-24" />
          <LoadingSkeleton className="h-40" />
          <LoadingSkeleton className="h-96" />
        </div>
      ) : query.isError ? (
        <ErrorState
          title="Unable to load bills"
          description={getUserFacingErrorMessage(query.error)}
          onRetry={() => void query.refetch()}
        />
      ) : query.data ? (
        query.data.rows.length > 0 ? (
          <div className="grid gap-4">
            <BillSummaryCards summary={query.data.summary} />
            {filteredRows.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
                <BillList
                  rows={filteredRows}
                  selectedId={selectedBill?.customerId ?? null}
                  onSelect={(row) => setSelectedBillId(row.customerId)}
                />
                {selectedBill ? (
                  <BillDetail
                    row={selectedBill}
                    billingMonth={filters.month}
                    billingYear={filters.year}
                    onPrint={handlePrintSelected}
                  />
                ) : null}
              </div>
            ) : (
              <EmptyState title="No matching bills" description="Try another customer name or phone number." />
            )}
          </div>
        ) : (
          <EmptyState
            title="No bills for this month"
            description="Record daily sales for active customers to generate monthly bills."
          />
        )
      ) : null}
      <BillPrintView
        rows={query.data?.rows ?? []}
        billingMonth={filters.month}
        billingYear={filters.year}
        mode={printMode}
        selectedCustomerId={selectedBill?.customerId ?? null}
      />
    </div>
  )
}
