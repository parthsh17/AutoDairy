# AutoDairy Deployment Guide

## Production Build

1. Install dependencies with `npm install`.
2. Run `npm run build`.
3. Deploy the generated `dist` output to your hosting provider.

## Environment Variables

Set the following values in production:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Supabase

- Apply the existing database schema before first launch.
- Ensure RLS policies are enabled for the supported tables.
- Confirm the authenticated user has access to the relevant data.

## PWA

- The app includes a web manifest and service worker.
- Keep HTTPS enabled in production so install and offline features work correctly.

## Verification Checklist

- Open the deployed app and confirm the dashboard loads.
- Confirm the app can be installed on desktop and mobile.
- Confirm offline mode shows the cached shell and sync status.
- Confirm backup and restore flows work against production data.

## Troubleshooting

- If the app fails to load data, confirm Supabase credentials and policies.
- If service worker updates do not appear, force refresh the browser cache once.
