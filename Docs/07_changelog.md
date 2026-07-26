# CHANGELOG.md

All notable changes to this project will be documented in this file.

This project follows the principles of **Keep a Changelog**.

Versioning loosely follows **Semantic Versioning**.

---

# [Unreleased]

## Added

- Vercel deployment configuration and security response headers
- GitHub Actions quality and dependency review workflows
- Prettier, Husky, and lint-staged developer tooling
- Provider-neutral structured logging, monitoring, route telemetry, and React error reporting
- Deployment and operations guide with release and rollback procedures

## Changed

- Centralized Supabase environment validation for local and hosted deployments
- Added SEO, Open Graph, and Apple web app metadata

# [1.0.0-rc.1] - 2026-07-26

## Added

- Release candidate packaging and release workflow scripts
- Production deployment guide, user guide, and updated README

## Changed

- Standardized the test command to run once in CI-friendly mode
- Added a dedicated typecheck script for release validation

## Fixed

- Corrected backup helper validation to match the exported file structure
- Set the package version to the release candidate identifier

---

## Added

- Initial project planning
- Product specification
- Engineering standards
- System architecture
- Database schema
- Design system
- Development roadmap
- Project documentation
- Foundation application shell
- React Router placeholder routes for Dashboard, Daily, Customers, Analytics, and More
- TanStack Query provider and client setup
- Supabase client initialization with environment validation
- Dexie local database scaffold
- Tailwind CSS 3.3 and shadcn/ui base configuration
- Feature-first source structure and shared UI scaffolding
- Supabase migration scaffolding and initial database schema migration
- Supabase configuration for version-controlled migrations
- Database tables, constraints, indexes, RLS, and realtime publication setup
- Shared UI component system with reusable layout primitives
- Demo screens for Dashboard, Daily, Customers, Analytics, and More
- Reusable chart wrappers with placeholder data
- Astryx core component library and neutral theme integration
- Astryx-backed shared UI wrappers for buttons, cards, inputs, dialogs, empty states, skeletons, toasts, and date/number controls
- Shared typed primitives for results, async state, pagination, JSON values, navigation, and domain-independent identifiers
- Shared date and number formatting utilities
- Centralized query-key, route, and navigation registries
- Reusable debounce, disclosure, online-status, and global-loading hooks
- Base service execution and repository contracts for future feature modules
- Centralized application error normalization and user-facing error messaging
- Feature scaffolding for dashboard, customers, daily sales, bills, income, expenses, analytics, and settings
- Customer records with Supabase-backed listing, creation, and editing
- Customer membership lifecycle with initial membership creation, pause, resume, and preserved history
- Customer search, active/inactive status filtering, shift filtering, details, and membership history views
- Customer forms with React Hook Form and Zod validation plus loading, empty, error, and toast feedback states
- Daily shift workflow for date and Morning/Evening selection
- Milk collection, home quantity, customer quantities, remaining milk, and shift revenue calculations
- Historical milk-price capture for new daily shifts with stored prices preserved during edits
- Membership-aware customer sales entry with daily shift load, edit, save, and reset flows
- Daily Sales validation for non-negative, two-decimal quantities and sales exceeding collected milk
- Income records with date/name/amount listing, creation, editing, deletion, search, and date-range filtering
- Expense records with date/name/amount listing, creation, editing, deletion, search, and date-range filtering
- Shared financial forms, filters, record cards, and deletion confirmation dialog
- Dynamic Bills module with month/year filtering, customer name and phone search, monthly summary cards, per-customer bill details, daily quantity and amount breakdowns, and print-friendly PDF export via browser print
- Historical bill calculation utilities that aggregate sales from daily shifts while respecting each shift's stored milk price
- Bills route wiring from the More menu and direct route access for monthly bill review
- Dynamic Analytics module with preset and custom date-range filters, overview cards, milk analytics, customer insights, shift analytics, financial trends, and monthly comparison views
- Reusable analytics calculations for live daily and monthly series, customer ranking, shift summaries, and CSV export
- Recharts-based analytics charts for collection, sales, home quantity, remaining milk, shift comparison, and financial trends
- Settings module with global milk price editing, application information, and backup navigation
- Backup & Restore page with JSON backup download and validated restore flow
- Offline sync core with Dexie-backed local queues, sync status tracking, and app header indicators

## Changed

- Replaced Vite starter content with the AutoDairy shell and placeholder screens
- Added TypeScript path and module organization for the foundation layer
- Added migration-first database setup for customers, memberships, daily shifts, sales, income, expenses, and settings
- Enabled realtime publication for source tables used by the application
- Replaced the foundation shell with a complete shared UI system
- Added global Lexend typography and app-wide design tokens
- Switched the shared UI layer to Astryx as the primary UI system
- Marked Bills milestone items BILL-001 through BILL-005 as complete in the implementation plan
- Marked Analytics milestone items ANA-001 through ANA-007 as complete in the implementation plan
- Marked Settings, Backup & Restore, and Offline Sync milestone items as complete in the implementation plan

## Fixed

- Removed starter Vite app styling and placeholder structure
- Preserved historical accuracy by storing milk price per daily shift
- Implemented reusable empty, error, loading, toast, dialog, and overlay states
- Removed the custom-only UI implementation in favor of Astryx-backed primitives
- Added the Vite alias required to resolve the existing `@/*` TypeScript path aliases in production builds
- Replaced the customer placeholder screen with the Customer Management feature
- Replaced the daily placeholder screen with the Daily Sales workflow
- Wired More navigation to the Income and Expenses routes
- Fixed the More navigation Bills link to open the live monthly bill screen
- Replaced the analytics placeholder screen with the live Analytics experience and export workflow
- Added settings, backup, and sync routes to the application shell
- Added production hardening tests for calculation utilities, shared UI components, bills, analytics, and dashboard flows
- Added PWA manifest, service worker registration, and install metadata
- Added browser API test harness support for the new component tests
- Added production documentation for setup, usage, and deployment

---

# [1.0.0] - Initial Release

## Project Initialization

### Documentation

Added

- AGENTS.md
- PRODUCT.md
- RULES.md
- ARCHITECTURE.md
- SCHEMA.md
- DESIGN.md
- TODO.md
- README.md
- CHANGELOG.md

These documents establish the complete product specification and engineering guidelines for AutoDairy.

---

## Planned Features

### Customer Management

Planned

- Customer CRUD
- Membership history
- Pause membership
- Resume membership
- Search
- Shift filtering

---

### Daily Sales

Planned

- Morning shift
- Evening shift
- Milk collection
- Home quantity
- Customer sales
- Remaining milk calculation
- Daily validation

---

### Bills

Planned

- Monthly bill generation
- Multiple customer selection
- Morning summary
- Evening summary
- Overall totals
- Print-friendly layout

---

### Dashboard

Planned

- Today's summary
- Monthly summary
- Revenue
- Profit
- Quick actions
- Charts
- Recent activity

---

### Income

Planned

- CRUD operations
- Monthly totals

---

### Expenses

Planned

- CRUD operations
- Monthly totals

---

### Analytics

Planned

- Today
- Yesterday
- Current Month
- Previous Months
- Custom date range
- Revenue analytics
- Customer analytics
- Shift analytics
- Profit & Loss

---

### Settings

Planned

- Milk price management

---

### Backup & Restore

Planned

- Full database export
- Full database restore

---

### Offline Support

Planned

- IndexedDB
- Automatic synchronization
- Pending sync queue
- Conflict handling
- Offline indicators

---

### Infrastructure

Planned

- React 19
- TypeScript
- Vite
- Tailwind CSS 3.3
- shadcn/ui
- Supabase
- PostgreSQL
- TanStack Query
- React Hook Form
- Zod
- Recharts
- Framer Motion
- Dexie
- Vercel deployment

---

# Changelog Guidelines

Every completed feature should be recorded here.

Entries should include

- Added
- Changed
- Fixed
- Removed
- Deprecated
- Security

Use the following format.

```md
# [Version] - YYYY-MM-DD

## Added

- New feature

## Changed

- Updated behavior

## Fixed

- Bug fix

## Removed

- Removed feature

## Security

- Security improvement
```

---

# Release Process

Before creating a new release

- Update TODO.md
- Update CHANGELOG.md
- Verify documentation
- Run TypeScript checks
- Run linting
- Perform manual testing
- Build production bundle
- Deploy to Vercel
- Perform post-deployment smoke tests

---

# Versioning Strategy

## Major Version

Breaking changes

Example

```
1.0.0 → 2.0.0
```

---

## Minor Version

New backward-compatible features

Example

```
1.2.0 → 1.3.0
```

---

## Patch Version

Bug fixes and small improvements

Example

```
1.3.1 → 1.3.2
```

---

# Documentation Policy

Whenever functionality changes

Update the following if applicable

- PRODUCT.md
- RULES.md
- ARCHITECTURE.md
- SCHEMA.md
- DESIGN.md
- TODO.md
- README.md
- CHANGELOG.md

Documentation should always reflect the current state of the application.

---

# Notes

AutoDairy is intended to be a long-term production application for a real family dairy business.

This changelog should represent the complete development history of the project from planning through production releases.
