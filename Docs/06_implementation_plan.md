# IMPLEMENTATION_PLAN.md

# AutoDairy Implementation Plan

This document is the execution roadmap for AutoDairy.

Unlike TODO.md, this document breaks the project into small, reviewable tasks suitable for AI-assisted development.

---

# General Instructions

Before starting **any** task:

1. Read `AGENTS.md`.
2. Follow the documentation reading order.
3. Read the documents relevant to the task.
4. Implement **only** the assigned task.
5. Do not make unrelated changes.
6. Update `TODO.md` (or task status) and `CHANGELOG.md` after completion.
7. Ensure:
   - TypeScript passes.
   - ESLint passes.
   - The application builds successfully.

---

# Status Legend

- [ ] Not Started
- [ ] In Progress
- [x] Completed
- [!] Blocked

---

# EPIC 1 — Project Foundation

## FND-001 — Install Dependencies

### Description

Install all dependencies listed in `RULES.md`.

### Deliverables

- Required runtime dependencies.
- Required development dependencies.

### Depends On

None.

### Acceptance Criteria

- `npm install` completes successfully.
- `package.json` updated.
- No vulnerabilities that block development.

Status

- [ ]

---

## FND-002 — Configure Tailwind CSS

### Deliverables

- Tailwind CSS 3.3 installed.
- PostCSS configured.
- Tailwind directives added.
- Default Vite styling removed.

Depends On

- FND-001

Status

- [ ]

---

## FND-003 — Initialize shadcn/ui

Deliverables

- shadcn initialized.
- Base theme configured.
- Components directory created.

Depends On

- FND-002

Status

- [ ]

---

## FND-004 — Configure TypeScript Path Aliases

Deliverables

- `@/*` alias.
- Vite configuration updated.

Depends On

- FND-001

Status

- [ ]

---

## FND-005 — Create Feature-First Folder Structure

Create:

```
src/
  components/
  features/
  hooks/
  layouts/
  lib/
  routes/
  types/
  utils/
```

Create empty feature folders:

- dashboard
- customers
- daily-sales
- bills
- income
- expenses
- analytics
- settings

Depends On

- FND-001

Status

- [ ]

---

## FND-006 — Configure React Router

Deliverables

Routes:

- Dashboard
- Daily
- Customers
- Analytics
- More

Temporary placeholder pages only.

Depends On

- FND-005

Status

- [ ]

---

## FND-007 — Configure TanStack Query

Deliverables

- QueryClient
- Provider
- Devtools (development only)

Depends On

- FND-001

Status

- [ ]

---

## FND-008 — Configure Supabase Client

Deliverables

```
src/lib/supabase.ts
```

Environment validation.

Depends On

- FND-001

Status

- [ ]

---

## FND-009 — Configure Dexie

Deliverables

IndexedDB initialized.

No synchronization logic yet.

Depends On

- FND-001

Status

- [ ]

---

## FND-010 — Configure App Shell

Deliverables

- Layout
- Header
- Bottom Navigation
- Page Container

No feature implementation.

Depends On

- FND-006

Status

- [ ]

---

# EPIC 2 — Database

## DB-001 — Create Customers Table

Read

- SCHEMA.md

Deliverables

- SQL migration
- Constraints
- Indexes

Status

- [ ]

---

## DB-002 — Create Customer Memberships Table

Status

- [ ]

---

## DB-003 — Create Daily Shifts Table

Status

- [ ]

---

## DB-004 — Create Sales Table

Status

- [ ]

---

## DB-005 — Create Income Table

Status

- [ ]

---

## DB-006 — Create Expenses Table

Status

- [ ]

---

## DB-007 — Create Settings Table

Status

- [ ]

---

## DB-008 — Add Foreign Keys

Status

- [ ]

---

## DB-009 — Add Indexes

Status

- [ ]

---

## DB-010 — Configure RLS Policies

Status

- [ ]

---

# EPIC 3 — Shared UI

## UI-001 — Button

## UI-002 — Card

## UI-003 — Input

## UI-004 — Number Input

## UI-005 — Search Bar

## UI-006 — Date Picker

## UI-007 — Shift Selector

## UI-008 — Toast

## UI-009 — Dialog

## UI-010 — Empty State

## UI-011 — Loading Skeleton

## UI-012 — Summary Card

## UI-013 — Chart Card

## UI-014 — Bottom Navigation

Each task

- One component.
- Story/demo page if appropriate.
- Responsive.
- Accessible.

---

# EPIC 4 — Customer Module

CUS-001 — Customer Types

CUS-002 — Customer Validation Schema

CUS-003 — Customer Service

CUS-004 — Customer Query Hooks

CUS-005 — Customer List

CUS-006 — Add Customer Dialog

CUS-007 — Edit Customer Dialog

CUS-008 — Delete Customer

CUS-009 — Membership History

CUS-010 — Pause Membership

CUS-011 — Resume Membership

CUS-012 — Search Customers

CUS-013 — Filter by Shift

CUS-014 — Manual Testing

---

# EPIC 5 — Daily Sales

SALE-001 — Daily Shift Types

SALE-002 — Validation

SALE-003 — Service Layer

SALE-004 — Query Hooks

SALE-005 — Daily Entry Screen

SALE-006 — Customer Quantity List

SALE-007 — Remaining Milk Calculation

SALE-008 — Save Workflow

SALE-009 — Edit Entry

SALE-010 — Delete Entry

SALE-011 — Manual Testing

---

# EPIC 6 — Dashboard

DASH-001 — Summary Cards

DASH-002 — Quick Actions

DASH-003 — Recent Activity

DASH-004 — Daily Sales Chart

DASH-005 — Revenue Chart

DASH-006 — Profit Card

DASH-007 — Dashboard Queries

---

# EPIC 7 — Bills

BILL-001 — Month Picker

BILL-002 — Customer Multi Select

BILL-003 — Bill Calculation Service

BILL-004 — Bill Summary UI

BILL-005 — Print Layout

---

# EPIC 8 — Income

INC-001 — Types

INC-002 — Service

INC-003 — CRUD

INC-004 — Manual Testing

---

# EPIC 9 — Expenses

EXP-001 — Types

EXP-002 — Service

EXP-003 — CRUD

EXP-004 — Manual Testing

---

# EPIC 10 — Analytics

ANA-001 — Analytics Service

ANA-002 — Filters

ANA-003 — Daily Analytics

ANA-004 — Monthly Analytics

ANA-005 — Shift Analytics

ANA-006 — Customer Analytics

ANA-007 — Charts

---

# EPIC 11 — Settings

SET-001 — Milk Price

SET-002 — Validation

SET-003 — Persistence

---

# EPIC 12 — Backup & Restore

BKP-001 — Export

BKP-002 — Import

BKP-003 — Validation

BKP-004 — Restore

---

# EPIC 13 — Offline Sync

OFF-001 — Local Database

OFF-002 — Mutation Queue

OFF-003 — Retry Logic

OFF-004 — Conflict Resolution

OFF-005 — Sync Indicator

OFF-006 — Offline Testing

---

# EPIC 14 — Release

REL-001 — Final QA

REL-002 — Performance Review

REL-003 — Accessibility Review

REL-004 — Production Build

REL-005 — Deploy to Vercel

REL-006 — Smoke Testing

---

# Definition of Done

A task is complete only if:

- Implementation matches `PRODUCT.md`.
- Architecture matches `ARCHITECTURE.md`.
- Database changes match `SCHEMA.md`.
- UI matches `DESIGN.md`.
- TypeScript passes.
- ESLint passes.
- Manual testing completed.
- Documentation updated.
- `CHANGELOG.md` updated.

## Completion Requirements

For every completed task, the agent must:

1. Mark the task as completed.
2. Update CHANGELOG.md.
3. Explain the implementation summary.
4. List all files created.
5. List all files modified.
6. List any assumptions made.
7. Report any blockers.
8. Confirm:
   - TypeScript passes
   - ESLint passes
   - Production build succeeds