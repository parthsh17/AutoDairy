# RULES.md

# AutoDairy Engineering Rules

This document defines the mandatory engineering standards for AutoDairy.

All contributors, including AI coding agents, must follow these rules.

If these rules conflict with implementation, these rules take precedence unless PRODUCT.md explicitly states otherwise.

---

# Engineering Principles

Every implementation should prioritize

- Simplicity
- Readability
- Maintainability
- Consistency
- Reliability
- Mobile-first design

Avoid

- Overengineering
- Premature optimization
- Unnecessary abstraction
- Duplicate logic

The simplest correct implementation is preferred.

---

# Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS **3.3.x**
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

Use

- PostgreSQL
- Realtime
- Storage (only if required)

Do not introduce another backend.

---

# Package Manager

Use

```
npm
```

Do not use

- pnpm
- yarn
- bun

---

# Styling

Use

Tailwind CSS **3.3.x**

Do not upgrade to Tailwind 4.

Do not use

- Bootstrap
- Material UI
- Chakra
- Ant Design

---

# Component Library

Use

shadcn/ui

Customize components only when necessary.

Do not replace the component library.

---

# Icons

Use

Lucide React

Do not mix icon libraries.

---

# Charts

Use

Recharts

Charts should

- be responsive
- work on mobile
- avoid clutter
- have readable labels

---

# Typography

Application font

Lexend

No other font should be introduced.

---

# Theme

Only Light Mode is supported.

Do not implement Dark Mode.

---

# Project Structure

Follow Feature-First Architecture.

```
src/

assets/

components/
    ui/

features/
    analytics/
    bills/
    customers/
    daily-sales/
    dashboard/
    expenses/
    income/
    settings/

hooks/

layouts/

lib/

routes/

types/

utils/
```

Inside every feature

```
components/

hooks/

services/

types/

utils/
```

Feature code should remain inside its feature.

Only shared code belongs outside.

---

# Naming Conventions

Components

```
CustomerCard.tsx
```

Hooks

```
useCustomers.ts
```

Services

```
customer.service.ts
```

Types

```
customer.types.ts
```

Utilities

```
date.utils.ts
```

Routes

```
CustomersPage.tsx
```

---

# Imports

Always use path aliases.

Example

```ts
import Button from "@/components/ui/button";
```

Avoid deep relative imports.

---

# TypeScript

Strict Mode is mandatory.

Never disable strict mode.

Never use

```ts
any
```

Prefer

- interfaces
- generics
- unknown

Use

interface

for objects.

Use

type

for unions.

---

# React

Prefer

Functional Components.

Prefer Hooks.

Never use Class Components.

---

# Component Rules

Components should

- Render UI
- Receive props
- Remain small
- Have a single responsibility

Avoid business logic inside components.

---

# State Management

Local UI State

React State

Server State

TanStack Query

Offline State

Dexie

Never duplicate server state.

---

# Business Logic

Business logic belongs inside

```
features/*/services
```

Never place business logic inside components.

---

# Forms

Every form must use

- React Hook Form
- Zod

Never manually validate forms.

---

# Validation

Validate

- Forms
- Database Input
- API Responses

Never trust user input.

---

# Database

The database is the source of truth.

Never duplicate derived values.

Do not store

- Revenue
- Bills
- Profit
- Analytics
- Totals

Always calculate them.

---

# Historical Accuracy

Milk price is stored per Daily Shift.

Historical records must never change.

---

# Dates

Store dates

ISO format

Display

Localized format.

Never store formatted dates.

---

# Money

Store money as numeric values.

Formatting belongs in the UI.

---

# Offline Support

Offline support is mandatory.

Users should be able to

- Create
- Update
- Delete

while offline.

Synchronization should occur automatically.

---

# Synchronization

Use

Supabase Realtime

Changes should automatically update every connected client.

Manual refresh should never be required.

---

# Routing

Use

React Router.

Every page should be lazy loaded where practical.

---

# Accessibility

Every input must have

- Label
- Validation
- Keyboard support

Buttons must remain accessible.

---

# Mobile First

Every screen must be designed for mobile first.

Desktop layouts are secondary.

Avoid

- horizontal scrolling
- large tables

Prefer

- cards
- stacked layouts

---

# Animations

Use

Framer Motion.

Animations should

- be subtle
- improve UX
- never block interaction

---

# Error Handling

Never expose technical errors.

Show user-friendly messages.

Every async operation should handle

- Loading
- Success
- Failure

---

# Performance

Prefer

- Lazy loading
- Cached queries
- Optimistic updates

Avoid unnecessary rerenders.

Do not optimize prematurely.

---

# Testing

Every completed task should be manually tested.

Verify

- Happy path
- Invalid input
- Edge cases

---

# Logging

Remove

- console.log
- debugger
- commented code

before completing a task.

---

# Documentation

Whenever implementation changes

Update

- CHANGELOG.md

If architecture or behaviour changes

also update

- PRODUCT.md
- ARCHITECTURE.md
- SCHEMA.md
- DESIGN.md
- IMPLEMENTATION_PLAN.md

Documentation is part of the implementation.

---

# Git

Every completed implementation should

- Build successfully
- Pass TypeScript
- Pass ESLint

Create focused commits.

Avoid mixing unrelated changes.

---

# AI Agent Rules

Before implementing any task

1. Read AGENTS.md.
2. Read all required documentation.
3. Implement only the assigned task IDs.
4. Do not implement future tasks.
5. Do not modify unrelated files.
6. Update CHANGELOG.md.
7. Report completed tasks.
8. Report blockers.
9. Confirm the project builds successfully.

---

# Definition of Done

A task is complete only if

- Business rules follow PRODUCT.md
- Architecture follows ARCHITECTURE.md
- Database follows SCHEMA.md
- UI follows DESIGN.md
- TypeScript passes
- ESLint passes
- Build succeeds
- Documentation updated
- CHANGELOG updated

---

# Final Rule

When in doubt,

prefer the simpler solution.

AutoDairy is a workflow application for a real family business.

Every implementation should reduce manual work and improve the daily user experience.