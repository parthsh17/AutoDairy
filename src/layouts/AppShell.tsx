import { Outlet } from 'react-router-dom'
import { AppHeader } from '../components/layout/AppHeader'
import { BottomNavigation } from '../components/navigation/BottomNavigation'
import { PageContainer } from '../components/layout/PageContainer'

export function AppShell() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <AppHeader title="AutoDairy" subtitle="Shared UI system" />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <BottomNavigation />
    </div>
  )
}
