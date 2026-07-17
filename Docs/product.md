# PRODUCT.md

# AutoDairy

## Product Vision

AutoDairy is a modern, mobile-first Progressive Web Application (PWA) built to completely digitize the operations of a small family-run dairy business.

The application replaces manual spreadsheet-based workflows with a centralized, real-time system for managing customers, recording daily milk sales, tracking income and expenses, generating customer bills, and providing meaningful business analytics.

AutoDairy is designed for daily use by family members with minimal technical knowledge.

The application should feel fast, modern, intuitive, and reliable.

---

# Mission

Reduce manual work.

Reduce calculation errors.

Provide complete visibility into the dairy business.

Allow every family member to use the application confidently from their mobile phone.

---

# Users

The application is designed for one dairy business.

Approximately five to six family members will use the application.

All users have identical permissions.

There are

- no roles
- no administrators
- no authentication

Every user can

- create
- update
- delete
- view

all records.

---

# Business Overview

The dairy collects milk twice every day.

Business operations are divided into

- Morning Shift
- Evening Shift

Every shift has its own

- Milk collection
- Home quantity
- Customer sales

Bills and analytics are generated shift-wise.

---

# Core Objectives

The application should completely replace the existing spreadsheet.

It must provide

- Customer management
- Membership management
- Daily milk sales
- Automatic bill calculation
- Income tracking
- Expense tracking
- Business analytics
- Profit and loss reporting
- Offline operation
- Automatic synchronization
- Backup and restore

---

# Customer Management

Each customer stores only

- Name
- Mobile Number
- Shift

Shift options

- Morning
- Evening
- Both

Nothing else is required.

---

# Customer Membership

Customers may

- start taking milk
- stop temporarily
- stop permanently
- resume after weeks or months

Therefore every customer has one or more membership periods.

Each membership stores

- Start Date
- End Date

End Date may be empty.

An empty End Date means the membership is currently active.

Example

Rahul

```
01 Jan 2026 → 31 Mar 2026

15 Apr 2026 → 20 Jun 2026

10 Jul 2026 → Present
```

The application automatically determines whether a customer should appear on a selected day.

Users should never manually filter customers.

---

# Daily Sales Workflow

Daily sales are the most important feature.

The workflow should be optimized to minimize typing.

For every shift the user enters

- Date
- Shift
- Total Milk Collected
- Home Quantity

After entering these values

the application automatically loads every customer

whose

- membership is active
- shift matches the selected shift

The user enters milk quantity for each customer.

Every customer defaults to

0 litres.

---

# Home Quantity

Home Quantity represents milk retained for family consumption.

It is entered separately for

Morning

and

Evening.

It is never treated as a customer.

---

# Milk Sales

Each sale stores

- Date
- Shift
- Customer
- Quantity
- Milk Price

Milk price is stored with every day's sales to preserve historical accuracy.

---

# Milk Price

Milk price is global.

Default

₹100/Litre

The application provides a Settings page where this value can be updated.

Changing the price affects only future sales.

Historical sales must never change.

---

# Bills

Bills are calculated dynamically.

Users choose

- Month
- One or More Customers

The application generates

Morning

- Litres
- Amount

Evening

- Litres
- Amount

Overall

- Total Litres
- Total Amount

Bills are never stored.

Bills are always calculated from sales.

---

# Income

Users can record income.

Each record stores

- Date
- Name
- Amount

Examples

- Cow Sold
- Government Scheme
- Other Income

No categories.

---

# Expenses

Users can record expenses.

Each record stores

- Date
- Name
- Amount

Examples

- Feed
- Labour
- Electricity
- Fuel

No categories.

---

# Dashboard

The dashboard is the application's home.

It should immediately answer

How is today's business performing?

How is this month's business performing?

The dashboard displays

Today's

- Milk Collected
- Milk Sold
- Home Quantity
- Revenue

Current Month

- Revenue
- Expenses
- Income
- Profit/Loss

Quick Actions

- Daily Sales
- Customers
- Bills
- Income
- Expenses

Recent Activity

- Latest sales
- Latest income
- Latest expenses

---

# Analytics

Analytics are generated entirely from live data.

The application never stores calculated analytics.

Users can view analytics for

- Today
- Yesterday
- Current Month
- Any Previous Month

Analytics include

## Daily

- Milk Collected
- Milk Sold
- Home Quantity
- Remaining Milk
- Revenue

## Monthly

- Total Milk Collected
- Total Milk Sold
- Revenue
- Income
- Expenses
- Profit/Loss

## Shift Analytics

Morning

- Total Milk Sold
- Revenue

Evening

- Total Milk Sold
- Revenue

Morning vs Evening comparison.

## Customer Analytics

Users may select one or more customers.

The application displays

- Total Milk Purchased
- Morning Quantity
- Evening Quantity
- Total Bill

This allows family members or customers who do not pay to be excluded from reports.

---

# Automatic Calculations

The application automatically calculates

Total Milk Sold

Revenue

Remaining Milk

Monthly Bills

Profit

Loss

Customer Totals

Shift Totals

Monthly Totals

No manual calculations should ever be required.

---

# Backup & Restore

The application supports complete backup and restore.

Backup includes

- Customers
- Memberships
- Sales
- Income
- Expenses
- Settings

Users can export the backup.

Users can restore from a backup at any time.

---

# Offline Support

The application continues functioning without internet.

Users can

- create records
- edit records
- delete records
- browse existing records

while offline.

All changes synchronize automatically once connectivity returns.

Users should never lose data because of internet issues.

---

# Synchronization

All connected devices remain synchronized.

Whenever one user changes data

every connected device receives the update automatically.

Manual refresh should never be necessary.

---

# Mobile Experience

The application is designed primarily for phones.

Desktop support is secondary.

The interface should require

- minimal typing
- minimal scrolling
- minimal navigation

Most daily work should be completed within two minutes.

---

# Product Principles

Always prioritize

- Simplicity
- Speed
- Accuracy
- Reliability
- Readability

Avoid

- unnecessary features
- excessive configuration
- complicated workflows

---

# Success Criteria

The application is successful when

- Daily sales can be entered in under two minutes.
- No manual calculations are required.
- Customer bills are generated instantly.
- Profit and loss are always available.
- Historical reports remain accurate.
- Family members can comfortably use the application without technical training.
- The spreadsheet is no longer required for daily operations.