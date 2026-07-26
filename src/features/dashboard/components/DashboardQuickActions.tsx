import { ArrowRight, BarChart3, BookOpen, Calculator, CircleDollarSign, Settings, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ROUTES } from '@/lib/routes'

const actions = [
  { icon: BookOpen, label: 'Daily Sales', to: ROUTES.daily },
  { icon: Users, label: 'Customers', to: ROUTES.customers },
  { icon: Calculator, label: 'Bills', to: ROUTES.bills },
  { icon: CircleDollarSign, label: 'Income', to: ROUTES.income },
  { icon: CircleDollarSign, label: 'Expenses', to: ROUTES.expenses },
  { icon: BarChart3, label: 'Analytics', to: ROUTES.analytics },
  { icon: Settings, label: 'Settings', to: ROUTES.settings },
]

export function DashboardQuickActions() {
  return (
    <section className="grid gap-3">
      <SectionHeader title="Quick actions" description="Jump to the areas you use most." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {actions.map(({ icon: Icon, label, to }) => (
          <Link key={label} to={to} aria-label={label}>
            <Card className="flex h-full min-h-24 flex-col justify-between gap-4 transition-colors hover:bg-muted/60">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="flex items-center justify-between gap-2 text-sm font-medium">
                {label}
                <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
