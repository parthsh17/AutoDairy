import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './layouts/AppShell'
import { LoadingSkeleton } from './components/ui/LoadingSkeleton'
import { ROUTES } from '@/lib/routes'
import { RouteMonitor } from './components/system/RouteMonitor'

const DashboardPage = lazy(() => import('./routes/DashboardPage').then((module) => ({ default: module.DashboardPage })))
const DailyPage = lazy(() => import('./routes/DailyPage').then((module) => ({ default: module.DailyPage })))
const CustomersPage = lazy(() => import('./routes/CustomersPage').then((module) => ({ default: module.CustomersPage })))
const AnalyticsPage = lazy(() => import('./routes/AnalyticsPage').then((module) => ({ default: module.AnalyticsPage })))
const MorePage = lazy(() => import('./routes/MorePage').then((module) => ({ default: module.MorePage })))
const IncomePage = lazy(() => import('./routes/IncomePage').then((module) => ({ default: module.IncomePage })))
const ExpensesPage = lazy(() => import('./routes/ExpensesPage').then((module) => ({ default: module.ExpensesPage })))
const BillsPage = lazy(() => import('@/features/bills/BillsPage').then((module) => ({ default: module.BillsPage })))
const SettingsPage = lazy(() => import('./routes/SettingsPage').then((module) => ({ default: module.SettingsPage })))
const BackupPage = lazy(() => import('./routes/BackupPage').then((module) => ({ default: module.BackupPage })))

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="grid gap-3">
          <LoadingSkeleton className="h-24" />
          <LoadingSkeleton className="h-64" />
        </div>
      }
    >
      <RouteMonitor />
      <Routes>
        <Route element={<AppShell />}>
          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
          <Route path={ROUTES.daily} element={<DailyPage />} />
          <Route path={ROUTES.customers} element={<CustomersPage />} />
          <Route path={ROUTES.analytics} element={<AnalyticsPage />} />
          <Route path={ROUTES.more} element={<MorePage />} />
          <Route path={ROUTES.bills} element={<BillsPage />} />
          <Route path={ROUTES.income} element={<IncomePage />} />
          <Route path={ROUTES.expenses} element={<ExpensesPage />} />
          <Route path={ROUTES.settings} element={<SettingsPage />} />
          <Route path={ROUTES.backup} element={<BackupPage />} />
        </Route>
        <Route path="*" element={<Navigate replace to={ROUTES.dashboard} />} />
      </Routes>
    </Suspense>
  )
}
