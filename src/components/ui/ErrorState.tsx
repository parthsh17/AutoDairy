import { Button } from './Button'
import { Card } from './Card'

interface ErrorStateProps {
  title: string
  description: string
  actionLabel?: string
  onRetry?: () => void
}

export function ErrorState({ title, description, actionLabel = 'Try again', onRetry }: ErrorStateProps) {
  return (
    <Card className="grid gap-3 text-center">
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {onRetry ? (
        <div className="flex justify-center">
          <Button type="button" onClick={onRetry}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </Card>
  )
}
