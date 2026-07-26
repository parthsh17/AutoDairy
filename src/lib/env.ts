interface PublicEnv {
  supabaseUrl: string
  supabaseAnonKey: string
  monitoringEndpoint?: string
}

function required(name: 'VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY') {
  const value = import.meta.env[name]?.trim()
  if (!value) {
    throw new Error(`${name} is required. Configure it in the deployment environment.`)
  }
  return value
}

export const publicEnv: PublicEnv = {
  supabaseUrl: required('VITE_SUPABASE_URL'),
  supabaseAnonKey: required('VITE_SUPABASE_ANON_KEY'),
  monitoringEndpoint: import.meta.env.VITE_MONITORING_ENDPOINT?.trim() || undefined,
}
