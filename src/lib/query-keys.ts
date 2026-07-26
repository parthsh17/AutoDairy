const root = ['autodairy'] as const

export const queryKeys = {
  all: root,
  dashboard: {
    all: [...root, 'dashboard'] as const,
    range: (from: string, to: string) => [...root, 'dashboard', 'range', from, to] as const,
  },
  customers: {
    all: [...root, 'customers'] as const,
    list: (filters?: Record<string, string | number | boolean | null>) =>
      [...root, 'customers', 'list', filters ?? {}] as const,
    detail: (id: string) => [...root, 'customers', 'detail', id] as const,
  },
  dailySales: {
    all: [...root, 'daily-sales'] as const,
    list: (date?: string) => [...root, 'daily-sales', 'list', date ?? 'all'] as const,
    detail: (id: string) => [...root, 'daily-sales', 'detail', id] as const,
  },
  bills: {
    all: [...root, 'bills'] as const,
  },
  income: {
    all: [...root, 'income'] as const,
    list: (dateRange?: string) => [...root, 'income', 'list', dateRange ?? 'all'] as const,
  },
  expenses: {
    all: [...root, 'expenses'] as const,
    list: (dateRange?: string) => [...root, 'expenses', 'list', dateRange ?? 'all'] as const,
  },
  analytics: {
    all: [...root, 'analytics'] as const,
    report: (period?: string) => [...root, 'analytics', 'report', period ?? 'current'] as const,
  },
  settings: {
    all: [...root, 'settings'] as const,
  },
} as const
