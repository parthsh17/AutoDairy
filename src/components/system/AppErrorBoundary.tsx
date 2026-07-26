import { Component, type ErrorInfo, type ReactNode } from 'react'
import { reportError } from '@/lib/monitoring'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportError(error, { source: 'react-boundary', componentStack: info.componentStack })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="px-4">
        <Card className="mx-auto mt-8 grid max-w-xl gap-3 text-center text-white">
          <h1 className="text-lg font-semibold">AutoDairy needs to restart</h1>
          <p className="text-sm text-slate-200">An unexpected error occurred. Your saved data was not changed.</p>
          <Button type="button" variant="secondary" onClick={() => window.location.reload()}>
            Reload application
          </Button>
        </Card>
      </main>
    )
  }
}
