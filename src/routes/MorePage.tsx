import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { SectionHeader } from '../components/ui/SectionHeader'
import { ROUTES } from '@/lib/routes'

const items = [
  { label: 'Bills', to: ROUTES.bills },
  { label: 'Income', to: ROUTES.income },
  { label: 'Expenses', to: ROUTES.expenses },
  { label: 'Settings', to: ROUTES.settings },
  { label: 'Backup & Restore', to: ROUTES.backup },
]

export function MorePage() {
  return (
    <div className="grid gap-4">
      <SectionHeader title="More" description="Placeholder navigation cards for secondary areas." headingLevel={1} />
      <div className="grid gap-3">
        {items.map((item) => (
          <Link key={item.label} to={item.to} className="block">
            <Card className="flex items-center justify-between">
              <span className="text-base font-medium">{item.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
