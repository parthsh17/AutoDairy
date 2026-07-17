# ARCHITECTURE.md

# AutoDairy Application Architecture

This document defines the complete software architecture for AutoDairy.

Every implementation should follow this document.

The architecture prioritizes

- Simplicity
- Scalability
- Maintainability
- Mobile-first development
- Offline support
- Real-time synchronization

The application should remain easy to understand and modify even after years of development.

---

# High Level Architecture

```

                ┌──────────────────────┐
                │     React PWA        │
                │  (Mobile First UI)   │
                └──────────┬───────────┘
                           │
             TanStack Query│
                           │
                  Local Cache
                           │
                    IndexedDB
                           │
                 Sync Manager
                           │
                    Supabase API
                           │
        ┌──────────────────┴─────────────────┐
        │                                    │
 PostgreSQL                        Realtime Engine

```

The application is frontend-first.

Supabase provides

- Database
- Realtime synchronization

No custom backend exists.

Business logic lives inside the frontend.

---

# Application Modules

The application is divided into independent feature modules.

```

Application

├── Dashboard
├── Customers
├── Daily Sales
├── Bills
├── Income
├── Expenses
├── Analytics
├── Settings

```

Every feature owns

- Components
- Hooks
- Services
- Types

Features should remain isolated.

---

# Navigation

Bottom Navigation

```

🏠 Dashboard

🥛 Daily

👥 Customers

📊 Analytics

⚙ More

```

More contains

- Bills
- Income
- Expenses
- Settings
- Backup & Restore

The four most frequently used features should always be one tap away.

---

# Dashboard Module

Purpose

Provide an overview of today's business.

Displays

Today's

- Milk Collected
- Milk Sold
- Revenue
- Home Quantity

Current Month

- Revenue
- Income
- Expenses
- Profit

Quick Actions

- New Daily Entry
- Customers
- Bills

Charts

- Daily Sales Trend
- Monthly Revenue
- Income vs Expenses
- Morning vs Evening Sales

---

# Customer Module

Purpose

Manage dairy customers.

Functions

- Create Customer
- Edit Customer
- Delete Customer
- View Membership History
- Pause Membership
- Resume Membership

Each customer stores

- Name
- Mobile Number
- Shift

The module also manages customer memberships.

---

# Membership Module

Each customer may have multiple memberships.

Example

```

Rahul

1 Jan → 31 Mar

15 Apr → Present

```

When opening Daily Sales

the application checks

```

Selected Date

↓

Customer Membership

↓

Customer Visible?

```

Only matching customers appear.

No manual filtering.

---

# Daily Sales Module

This is the primary workflow.

Flow

```

Select Date

↓

Select Shift

↓

Enter Milk Collected

↓

Enter Home Quantity

↓

Load Active Customers

↓

Enter Customer Quantities

↓

Save

↓

Dashboard Updates

```

The workflow should take less than two minutes.

---

# Daily Validation

After entering sales

the application calculates

```

Collected

-

Home

-

Customer Sales

=

Remaining

```

If Remaining ≠ 0

display warning

but allow saving.

---

# Bills Module

Purpose

Generate customer bills.

Flow

```

Select Month

↓

Select Customers

↓

Generate Bills

```

Display

Morning

- Litres
- Amount

Evening

- Litres
- Amount

Overall

- Total
- Bill

Bills are calculated.

Nothing is stored.

---

# Income Module

Simple CRUD.

Fields

- Date
- Name
- Amount

---

# Expense Module

Simple CRUD.

Fields

- Date
- Name
- Amount

---

# Analytics Module

Analytics are generated from source data.

Never store analytics.

Users can filter

- Today
- Yesterday
- Current Month
- Previous Months

Analytics include

Daily

- Collected
- Sold
- Revenue
- Home

Monthly

- Revenue
- Expenses
- Income
- Profit

Customer

- Milk Purchased
- Bill

Shift

- Morning
- Evening

---

# Settings Module

Contains application configuration.

Settings

- Milk Price

Changing price affects

future sales only.

Historical sales remain unchanged.

---

# Backup Module

Users can

Export

↓

Download Backup

Restore

↓

Upload Backup

↓

Restore Database

Backups include

- Customers
- Memberships
- Sales
- Income
- Expenses
- Settings

---

# Offline Architecture

```

User

↓

React

↓

IndexedDB

↓

Sync Queue

↓

Supabase

```

When offline

operations are stored locally.

When internet returns

queue synchronizes automatically.

Users should never lose data.

---

# Synchronization

Every mutation

↓

Supabase

↓

Realtime Event

↓

TanStack Query Cache

↓

UI Updates

Users should never refresh manually.

---

# Data Flow

Example

Daily Sales

```

User

↓

Form

↓

Validation

↓

Service

↓

Supabase

↓

Realtime

↓

Cache Update

↓

Dashboard

↓

Analytics

```

The same source data powers every module.

---

# Folder Structure

```

src/

assets/

components/

features/

dashboard/

customers/

daily-sales/

analytics/

income/

expenses/

bills/

settings/

hooks/

layouts/

lib/

routes/

services/

types/

utils/

```

Each feature contains

```

components/

hooks/

services/

types/

```

Avoid feature coupling.

---

# Service Layer

Every feature should expose services.

Example

```

customer.service.ts

sales.service.ts

income.service.ts

expense.service.ts

analytics.service.ts

```

Business logic belongs here.

---

# Hook Layer

Hooks encapsulate server state.

Example

```

useCustomers()

useSales()

useAnalytics()

useExpenses()

```

Components should rarely interact with Supabase directly.

---

# Component Layer

Components

display data.

They should not

- calculate business logic
- perform database operations
- duplicate state

Keep components focused.

---

# Error Flow

```

User

↓

Validation

↓

Service

↓

Supabase

↓

Success

or

↓

Error

↓

Friendly UI Message

```

Never expose technical errors.

---

# Realtime Flow

```

Device A

↓

Supabase

↓

Realtime

↓

Device B

↓

UI Updates

```

Changes should appear automatically.

---

# Security

Although authentication is not used,

the database should never expose unnecessary permissions.

Only the application should interact with the database.

Sensitive configuration belongs in environment variables.

Never hardcode secrets.

---

# Performance

Prefer

- lazy loading
- pagination (if needed)
- optimistic updates
- cached queries

Avoid unnecessary rerenders.

Avoid duplicate requests.

---

# Design Philosophy

Architecture should always prioritize

- simplicity
- clear separation of concerns
- predictable data flow

Every module should be independently understandable.

Every piece of business logic should exist in exactly one place.

The architecture should remain maintainable for years without requiring major refactoring.