# TODO.md

# AutoDairy Development Roadmap

This document tracks the implementation progress of AutoDairy.

Only work on the highest priority incomplete task.

Every completed task should

- be tested
- be committed
- update CHANGELOG.md

---

# Project Status

Current Phase

```
Planning
```

Progress

```
0%
```

---

# Phase 1 — Project Setup

## Repository

- [ ] Initialize Vite + React + TypeScript
- [ ] Configure Tailwind CSS 3.3
- [ ] Install shadcn/ui
- [ ] Configure ESLint
- [ ] Configure Prettier
- [ ] Configure TypeScript aliases
- [ ] Configure environment variables
- [ ] Configure React Router
- [ ] Configure TanStack Query
- [ ] Configure React Hook Form
- [ ] Configure Zod
- [ ] Configure Framer Motion
- [ ] Configure Recharts
- [ ] Configure Lucide Icons

---

## Supabase

- [ ] Create Supabase project
- [ ] Configure local environment
- [ ] Create database
- [ ] Configure Realtime
- [ ] Configure Row Level Security
- [ ] Create Storage bucket (if required)

---

## Database

- [ ] Create customers table
- [ ] Create memberships table
- [ ] Create daily shifts table
- [ ] Create sales table
- [ ] Create income table
- [ ] Create expenses table
- [ ] Create settings table

---

## Offline

- [ ] Configure IndexedDB
- [ ] Configure Dexie
- [ ] Configure synchronization queue

---

# Phase 2 — Shared Foundation

## Layout

- [ ] App Layout
- [ ] Bottom Navigation
- [ ] Page Container
- [ ] Header
- [ ] Floating Action Button

---

## Shared Components

- [ ] Button
- [ ] Card
- [ ] Input
- [ ] Number Input
- [ ] Search Bar
- [ ] Date Picker
- [ ] Shift Selector
- [ ] Dialog
- [ ] Toast
- [ ] Empty State
- [ ] Loading Skeleton
- [ ] Confirmation Dialog

---

## Utilities

- [ ] Date Utilities
- [ ] Currency Formatter
- [ ] Validation Helpers
- [ ] Constants
- [ ] Query Keys

---

# Phase 3 — Customer Module

## Customer CRUD

- [ ] Customer List
- [ ] Customer Details
- [ ] Add Customer
- [ ] Edit Customer
- [ ] Delete Customer

---

## Membership

- [ ] Membership History
- [ ] Pause Customer
- [ ] Resume Customer
- [ ] Membership Validation

---

## Search

- [ ] Search Customers
- [ ] Filter by Shift

---

# Phase 4 — Daily Sales

## Daily Entry

- [ ] Select Date
- [ ] Select Shift
- [ ] Enter Milk Collected
- [ ] Enter Home Quantity
- [ ] Load Active Customers
- [ ] Enter Customer Quantities
- [ ] Save Sales

---

## Validation

- [ ] Remaining Milk Calculation
- [ ] Warning Messages
- [ ] Prevent Invalid Inputs

---

## Editing

- [ ] Edit Existing Entry
- [ ] Delete Entry

---

# Phase 5 — Dashboard

## Summary Cards

- [ ] Today's Milk Collected
- [ ] Today's Milk Sold
- [ ] Today's Revenue
- [ ] Home Quantity

---

## Monthly Cards

- [ ] Revenue
- [ ] Income
- [ ] Expenses
- [ ] Profit

---

## Charts

- [ ] Sales Trend
- [ ] Revenue Trend
- [ ] Income vs Expense
- [ ] Morning vs Evening
- [ ] Top Customers

---

## Recent Activity

- [ ] Latest Sales
- [ ] Latest Income
- [ ] Latest Expenses

---

# Phase 6 — Bills

- [ ] Month Selector
- [ ] Customer Multi Select
- [ ] Bill Generation
- [ ] Morning Summary
- [ ] Evening Summary
- [ ] Overall Summary
- [ ] Print Friendly View

---

# Phase 7 — Income

- [ ] Income List
- [ ] Add Income
- [ ] Edit Income
- [ ] Delete Income

---

# Phase 8 — Expenses

- [ ] Expense List
- [ ] Add Expense
- [ ] Edit Expense
- [ ] Delete Expense

---

# Phase 9 — Analytics

## Filters

- [ ] Today
- [ ] Yesterday
- [ ] Current Month
- [ ] Previous Month
- [ ] Custom Date Range

---

## Reports

- [ ] Daily Analytics
- [ ] Monthly Analytics
- [ ] Shift Analytics
- [ ] Customer Analytics

---

## Charts

- [ ] Revenue Chart
- [ ] Sales Chart
- [ ] Expense Chart
- [ ] Profit Chart

---

# Phase 10 — Settings

- [ ] Milk Price
- [ ] Update Price
- [ ] Validation

---

# Phase 11 — Backup & Restore

## Backup

- [ ] Export Customers
- [ ] Export Memberships
- [ ] Export Sales
- [ ] Export Income
- [ ] Export Expenses
- [ ] Export Settings

---

## Restore

- [ ] Import Backup
- [ ] Validate Backup
- [ ] Restore Data

---

# Phase 12 — Offline Support

- [ ] Queue Mutations
- [ ] Automatic Retry
- [ ] Conflict Resolution
- [ ] Pending Sync Indicator
- [ ] Offline Indicator
- [ ] Sync Status

---

# Phase 13 — Polish

## UX

- [ ] Empty States
- [ ] Skeleton Loaders
- [ ] Success Toasts
- [ ] Error Handling

---

## Performance

- [ ] Lazy Loading
- [ ] Query Optimization
- [ ] Bundle Optimization

---

## Accessibility

- [ ] Keyboard Navigation
- [ ] Labels
- [ ] Screen Reader Support
- [ ] Color Contrast

---

# Phase 14 — Testing

## Manual Testing

- [ ] Customer Flow
- [ ] Daily Sales
- [ ] Bills
- [ ] Income
- [ ] Expenses
- [ ] Analytics
- [ ] Offline Mode
- [ ] Backup
- [ ] Restore

---

## Cross Device

- [ ] Android
- [ ] iOS
- [ ] Tablet
- [ ] Desktop

---

# Phase 15 — Release

- [ ] Final QA
- [ ] Production Build
- [ ] Deploy to Vercel
- [ ] Verify Supabase
- [ ] Smoke Test
- [ ] Release v1.0.0

---

# Definition of Done

A task is complete only when

- Feature is implemented
- UI matches DESIGN.md
- Business rules match PRODUCT.md
- Database matches SCHEMA.md
- Manual testing passes
- TypeScript has zero errors
- ESLint has zero warnings
- Documentation is updated
- CHANGELOG.md is updated

---

# Backlog

Future enhancements should **not** be implemented unless they are added to PRODUCT.md.

Ideas can be collected here, but they are intentionally out of scope for the initial release.