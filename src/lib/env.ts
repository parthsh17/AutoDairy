interface PublicEnv {
  supabaseUrl: string
  supabaseAnonKey: string
  monitoringEndpoint?: string
  configurationError?: string
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''
const missing = [!supabaseUrl ? 'VITE_SUPABASE_URL' : null, !supabaseAnonKey ? 'VITE_SUPABASE_ANON_KEY' : null].filter(
  (name): name is string => name !== null,
)

export const publicEnv: PublicEnv = {
  supabaseUrl: supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey: supabaseAnonKey || 'missing-configuration',
  monitoringEndpoint: import.meta.env.VITE_MONITORING_ENDPOINT?.trim() || undefined,
  configurationError:
    missing.length > 0 ? `Missing deployment environment variable(s): ${missing.join(', ')}` : undefined,
}
