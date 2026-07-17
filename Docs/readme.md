# AutoDairy

A modern, mobile-first Progressive Web Application (PWA) for managing a family-run dairy business.

AutoDairy replaces manual spreadsheets with a fast, reliable system for recording milk sales, managing customers, generating bills, tracking income and expenses, and viewing business analytics.

---

# Features

- Customer Management
- Membership Management
- Daily Milk Sales
- Automatic Bill Generation
- Income Tracking
- Expense Tracking
- Dashboard
- Analytics
- Offline Support
- Real-time Synchronization
- Backup & Restore

---

# Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS 3.3
- React Router
- TanStack Query
- React Hook Form
- Zod
- Framer Motion
- Recharts
- shadcn/ui
- Lucide React

## Backend

Supabase

- PostgreSQL
- Realtime
- Storage (optional)

## Offline

- IndexedDB
- Dexie

## Deployment

- Vercel

---

# Documentation

Read the documentation in the following order before making changes.

1. PRODUCT.md
2. RULES.md
3. ARCHITECTURE.md
4. SCHEMA.md
5. DESIGN.md
6. TODO.md
7. CHANGELOG.md

---

# Project Structure

```text
src/

assets/

components/

features/

hooks/

layouts/

lib/

pages/

routes/

types/

utils/
```

Each feature owns its

- components
- hooks
- services
- types
- utilities

---

# Core Modules

- Dashboard
- Customers
- Daily Sales
- Bills
- Income
- Expenses
- Analytics
- Settings
- Backup & Restore

---

# Getting Started

## Clone

```bash
git clone <repository-url>
```

---

## Install

```bash
npm install
```

---

## Environment Variables

Create

```text
.env.local
```

Example

```text
VITE_SUPABASE_URL=

VITE_SUPABASE_ANON_KEY=
```

---

## Run Development Server

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

## Preview

```bash
npm run preview
```

---

# Coding Standards

Before implementing any feature

- Read PRODUCT.md
- Follow RULES.md
- Keep architecture consistent
- Never duplicate business logic
- Never store derived values

---

# Offline Support

AutoDairy works without an internet connection.

Changes are stored locally and synchronized automatically once connectivity is restored.

---

# Design Goals

The application should always feel

- Fast
- Simple
- Reliable
- Mobile-first

Daily business operations should require minimal typing and minimal navigation.

---

# Contributing

Before opening a pull request

- Run TypeScript checks
- Fix lint issues
- Test manually
- Update documentation
- Update CHANGELOG.md

---

# License

Private project.

Not intended for public distribution.