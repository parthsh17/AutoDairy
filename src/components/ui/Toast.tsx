interface ToastProps {
  title: string
  message?: string
}

export function Toast({ title, message }: ToastProps) {
  return (
    <div className="pointer-events-auto flex w-full max-w-sm items-start gap-4 rounded-lg border bg-background p-4 shadow-lg">
      <div className="flex-1 grid gap-0.5">
        <p className="text-sm font-semibold">{title}</p>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  )
}
