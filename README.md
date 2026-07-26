# AutoDairy

AutoDairy is a mobile-first dairy operations app for customer management, daily sales, monthly bills, analytics, backup and restore, and offline sync.

Current release candidate: `1.0.0-rc.1`

## Stack

- React 19
- TypeScript
- Vite
- TanStack Query
- Supabase
- Dexie
- Recharts
- Astryx components
- Lexend font

## Getting Started

1. Install dependencies with `npm install`.
2. Start the app with `npm run dev`.
3. Open the local Vite URL in your browser.

## Verification

- `npm run lint`
- `npm run typecheck`
- `npm run test:run`
- `npm run build`

## Deployment

See [docs/08_deployment.md](docs/08_deployment.md) for Vercel configuration, GitHub Actions, monitoring, backups, release checks, and rollback guidance. Copy `.env.example` to `.env.local` for development; production variables are configured in Vercel.

## Release Summary

- Dynamic bills and analytics
- Settings with historical milk-price preservation
- JSON backup and restore
- Offline sync with local queuing
- PWA install support
- Production hardening tests and release docs

## Features

- Customer management with membership history
- Daily milk entry with historical price tracking
- Monthly bills with print-friendly layout and PDF export
- Live analytics for sales, revenue, costs, and profit
- Settings for global milk price
- Backup and restore through JSON export/import
- Offline sync with local queueing and status indicators
- PWA install support

## Notes

- Historical milk prices are stored per daily shift and are not overwritten by later settings changes.
- Calculated bills and analytics are generated dynamically and are never stored in the database.
