import { Plus } from 'lucide-react'
import { Button } from '../ui/Button'

interface FloatingActionButtonProps {
  label: string
  onClick?: () => void
}

export function FloatingActionButton({ label, onClick }: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-20 right-4 z-30 sm:right-6">
      <Button type="button" onClick={onClick}>
        <Plus className="h-4 w-4" />
        {label}
      </Button>
    </div>
  )
}
