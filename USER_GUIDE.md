# AutoDairy User Guide

## Installation

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Configure the Supabase environment variables.
4. Start development with `npm run dev`.

## Daily Use

- Add customers and memberships from the Customers module.
- Record morning and evening sales from the Daily module.
- Review monthly bills from the Bills module.
- Review trends and summaries from the Analytics module.
- Change the global milk price from Settings when the future rate changes.

## Backup Procedure

1. Open Settings.
2. Open Backup & Restore.
3. Download the JSON backup file.

## Restore Procedure

1. Open Backup & Restore.
2. Select a previously exported JSON backup file.
3. Confirm the restore action after validation passes.

## Offline Behaviour

- The app shows an offline indicator when the browser loses connectivity.
- Pending changes are queued locally and synchronized when the connection returns.
- The app keeps cached data in Dexie so the most recent working state remains available.

## Troubleshooting

- If Supabase access fails, confirm the environment variables are set correctly.
- If sync remains pending, refresh after the connection is restored.
- If a backup import fails, verify the file was exported from AutoDairy and was not modified.
