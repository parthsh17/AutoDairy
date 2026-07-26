import { BarChart3, Home, MoreHorizontal, NotebookPen, Users } from 'lucide-react'
import type { NavigationItem } from '@/types/navigation.types'
import { ROUTES } from './routes'

export const primaryNavigation: readonly NavigationItem[] = [
  { to: ROUTES.dashboard, label: 'Dashboard', icon: Home, end: true },
  { to: ROUTES.daily, label: 'Daily', icon: NotebookPen },
  { to: ROUTES.customers, label: 'Customers', icon: Users },
  { to: ROUTES.analytics, label: 'Analytics', icon: BarChart3 },
  { to: ROUTES.more, label: 'More', icon: MoreHorizontal },
]

export const moreNavigation = [
  { to: ROUTES.bills, label: 'Bills' },
  { to: ROUTES.income, label: 'Income' },
  { to: ROUTES.expenses, label: 'Expenses' },
  { to: ROUTES.settings, label: 'Settings' },
  { to: ROUTES.backup, label: 'Backup & Restore' },
] as const
