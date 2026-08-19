import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Providers } from './app/providers'
import App from './App'
import '@fontsource/lexend/400.css'
import '@fontsource/lexend/600.css'
import '@fontsource/lexend/700.css'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import { AppErrorBoundary } from './components/system/AppErrorBoundary'
import { ConfigurationError } from './components/system/ConfigurationError'
import { initializeMonitoring } from './lib/monitoring'
import { publicEnv } from './lib/env'

registerSW({
  immediate: true,
  onNeedRefresh() {
    window.location.reload()
  },
})
initializeMonitoring()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {publicEnv.configurationError ? (
      <ConfigurationError message={publicEnv.configurationError} />
    ) : (
      <AppErrorBoundary>
        <Providers>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Providers>
      </AppErrorBoundary>
    )}
  </StrictMode>,
)
