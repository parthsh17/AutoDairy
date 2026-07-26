export const ROUTES = {
  dashboard: '/',
  daily: '/daily',
  customers: '/customers',
  analytics: '/analytics',
  more: '/more',
  bills: '/more/bills',
  income: '/more/income',
  expenses: '/more/expenses',
  settings: '/more/settings',
  backup: '/more/backup',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
