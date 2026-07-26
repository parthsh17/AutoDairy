interface LoadingOverlayProps {
  label?: string
}

export function LoadingOverlay({ label = 'Loading...' }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-background/70 backdrop-blur-sm">
      <div className="rounded-[16px] border border-border bg-card px-4 py-3 text-sm font-medium shadow-lg">{label}</div>
    </div>
  )
}
