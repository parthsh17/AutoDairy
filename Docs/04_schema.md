# SCHEMA.md

# AutoDairy Database Schema

This document defines the complete database structure for AutoDairy.

The schema is designed around a few principles:

- Normalize data
- Avoid duplication
- Store only source data
- Calculate derived values on demand
- Preserve historical accuracy

All tables should use UUID primary keys.

---

# Entity Relationship Diagram

```text
Customers
    │
    │ 1:N
    ▼
Customer Memberships

Customers
    │
    │ 1:N
    ▼
Sales
    ▲
    │
    │ N:1
Daily Shifts

Income

Expenses

Settings
```

---

# customers

Stores customer information.

## Fields

| Column | Type | Description |
|----------|------|-------------|
| id | UUID | Primary Key |
| name | TEXT | Customer name |
| phone | TEXT | Mobile number |
| morning_enabled | BOOLEAN | Receives milk in morning |
| evening_enabled | BOOLEAN | Receives milk in evening |
| created_at | TIMESTAMP | Created timestamp |
| updated_at | TIMESTAMP | Updated timestamp |

---

# customer_memberships

Tracks when a customer is active.

A customer may have multiple memberships.

## Fields

| Column | Type |
|----------|------|
| id | UUID |
| customer_id | UUID FK |
| start_date | DATE |
| end_date | DATE NULL |
| created_at | TIMESTAMP |

---

## Example

```text
Rahul

1 Jan → 31 Mar

15 Apr → 20 Jun

10 Jul → Present
```

The application considers a customer active when

```text
start_date <= selected_date

AND

(end_date IS NULL
 OR end_date >= selected_date)
```

---

# daily_shifts

One record exists for every

Date + Shift.

Morning

and

Evening

have separate records.

## Fields

| Column | Type |
|----------|------|
| id | UUID |
| date | DATE |
| shift | TEXT |
| milk_collected | NUMERIC(6,2) |
| home_quantity | NUMERIC(6,2) |
| milk_price | NUMERIC(8,2) |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## Unique Constraint

```text
(date, shift)
```

Only one Morning

and

one Evening

record may exist for a date.

---

# sales

Stores milk sold to customers.

## Fields

| Column | Type |
|----------|------|
| id | UUID |
| daily_shift_id | UUID FK |
| customer_id | UUID FK |
| quantity | NUMERIC(6,2) |
| created_at | TIMESTAMP |

---

## Notes

Revenue is NOT stored.

Revenue is calculated.

```text
quantity × milk_price
```

---

# income

Stores income.

## Fields

| Column | Type |
|----------|------|
| id | UUID |
| date | DATE |
| name | TEXT |
| amount | NUMERIC(10,2) |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# expenses

Stores expenses.

## Fields

| Column | Type |
|----------|------|
| id | UUID |
| date | DATE |
| name | TEXT |
| amount | NUMERIC(10,2) |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# settings

Application configuration.

Only one row should exist.

## Fields

| Column | Type |
|----------|------|
| id | UUID |
| milk_price | NUMERIC(8,2) |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# Relationships

```text
customers

1

↓

customer_memberships


customers

1

↓

sales


daily_shifts

1

↓

sales
```

---

# Derived Values

The following values are NEVER stored.

## Revenue

```text
SUM(quantity × milk_price)
```

---

## Customer Bill

```text
SUM(quantity × milk_price)
```

---

## Milk Sold

```text
SUM(quantity)
```

---

## Remaining Milk

```text
milk_collected

-

home_quantity

-

SUM(quantity)
```

---

## Monthly Revenue

```text
SUM(quantity × milk_price)
```

---

## Monthly Income

```text
SUM(income.amount)
```

---

## Monthly Expenses

```text
SUM(expenses.amount)
```

---

## Profit

```text
Revenue

+

Income

-

Expenses
```

---

# Historical Accuracy

Milk price is copied into every Daily Shift.

Example

```text
1 Jan

₹100/L

2 Feb

₹105/L
```

Bills for January continue using ₹100/L.

Historical records must never change.

---

# Deletion Rules

Deleting a customer should NOT automatically delete historical sales.

Historical data must remain intact.

Membership history should also remain intact.

Soft deletion is preferred if deletion becomes necessary.

---

# Validation Rules

Customer

- Name required
- Phone optional
- At least one shift enabled

Membership

- Start date required
- End date optional
- End date ≥ Start date

Daily Shift

- Date required
- Shift required
- Milk collected ≥ 0
- Home quantity ≥ 0

Sales

- Quantity ≥ 0

Income

- Amount > 0

Expenses

- Amount > 0

---

# Indexes

Create indexes on

```text
customers(name)

customer_memberships(customer_id)

customer_memberships(start_date)

daily_shifts(date)

daily_shifts(shift)

sales(customer_id)

sales(daily_shift_id)

income(date)

expenses(date)
```

---

# Data Integrity Rules

The database should guarantee

- One Daily Shift per Date + Shift
- No orphan sales
- No orphan memberships
- Valid foreign keys
- Historical data remains immutable
- Derived values are never stored

---

# Future Schema Changes

When adding new tables,

follow these principles:

- Normalize first
- Avoid duplicated data
- Store source data only
- Prefer computed values
- Preserve historical accuracy
- Update this document before implementing changes