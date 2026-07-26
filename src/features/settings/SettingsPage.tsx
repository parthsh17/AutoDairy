import { useMemo, useState } from 'react'
import { Shield, Database, Clock3, SquareArrowOutUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Toast } from '@/components/ui/Toast'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { getUserFacingErrorMessage } from '@/lib/errors'
import { ROUTES } from '@/lib/routes'
import { useSyncStatus } from '@/services/sync.service'
import { useSettings } from './hooks/useSettings'
import { saveMilkPrice } from './services/settings.service'
import { SyncStatusBadge } from './components/SyncStatusBadge'

export function SettingsPage() {
  const online = useOnlineStatus()
  const sync = useSyncStatus()
  const settingsQuery = useSettings()
  const [milkPrice, setMilkPrice] = useState('')
  const [feedback, setFeedback] = useState<{ title: string; message: string } | null>(null)

  const currentPrice = useMemo(() => settingsQuery.data?.milkPrice ?? 100, [settingsQuery.data?.milkPrice])

  const handleSave = async () => {
    try {
      await saveMilkPrice(Number(milkPrice))
      setFeedback({ title: 'Milk price saved', message: 'Future daily sales will use the new global milk price.' })
      setMilkPrice('')
    } catch (error) {
      setFeedback({ title: 'Unable to save milk price', message: getUserFacingErrorMessage(error) })
    }
  }

  return (
    <div className="grid gap-4 pb-6">
      <SectionHeader title="Settings" description="Manage global milk price and app status." headingLevel={1} />
      <SyncStatusBadge state={sync} />
      <Card className="grid gap-4">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/10 p-2 text-primary">
            <Database className="size-4" />
          </span>
          <div>
            <p className="font-medium">Milk Price</p>
            <p className="text-sm text-muted-foreground">Current global price: Rs. {currentPrice.toFixed(2)}/L</p>
          </div>
        </div>
        <Input label="Update milk price" placeholder="Enter new milk price" value={milkPrice} onChange={setMilkPrice} />
        <Button type="button" variant="primary" onClick={handleSave} loading={settingsQuery.isFetching}>
          Save milk price
        </Button>
        <p className="text-xs text-muted-foreground">Historical daily shifts keep their stored milk price unchanged.</p>
      </Card>
      <Card className="grid gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/10 p-2 text-primary">
            <Shield className="size-4" />
          </span>
          <div>
            <p className="font-medium">Application Information</p>
            <p className="text-sm text-muted-foreground">Current environment and sync state</p>
          </div>
        </div>
        <div className="grid gap-2 text-sm">
          <p>
            App Version: <span className="font-medium">0.0.0</span>
          </p>
          <p>
            Database Status: <span className="font-medium">{online ? 'Connected' : 'Offline'}</span>
          </p>
          <p>
            Last Sync Time: <span className="font-medium">{sync.lastSyncAt ?? 'Never'}</span>
          </p>
          <p>
            Current Environment: <span className="font-medium">{import.meta.env.MODE}</span>
          </p>
        </div>
      </Card>
      <Card className="grid gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/10 p-2 text-primary">
            <Clock3 className="size-4" />
          </span>
          <div>
            <p className="font-medium">Data Management</p>
            <p className="text-sm text-muted-foreground">Backup, restore, and offline sync tools</p>
          </div>
        </div>
        <Link to={ROUTES.backup} className="block">
          <Button type="button" variant="secondary" icon={<SquareArrowOutUpRight className="size-4" />}>
            Open Backup & Restore
          </Button>
        </Link>
      </Card>
      {feedback ? <Toast title={feedback.title} message={feedback.message} /> : null}
    </div>
  )
}
