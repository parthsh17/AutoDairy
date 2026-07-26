import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const sourceDirectory = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: false,
      manifest: false,
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      strategies: 'generateSW',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(sourceDirectory),
    },
    preserveSymlinks: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
  },
})
