interface ConfigurationErrorProps {
  message?: string
}

export function ConfigurationError({ message }: ConfigurationErrorProps) {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-6 text-foreground">
      <section className="w-full max-w-lg rounded-card border border-border bg-card p-6 shadow-card">
        <h1 className="text-xl font-semibold">App configuration is incomplete</h1>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Add these variables in Vercel under Project Settings → Environment Variables, then redeploy.
        </p>
      </section>
    </main>
  )
}
