# DESIGN.md

# AutoDairy Design System

This document defines the complete visual language and user experience for AutoDairy.

Every screen in the application must follow these design guidelines.

The goal is to build an application that feels modern, lightweight and effortless to use every day.

---

# Design Philosophy

AutoDairy is used multiple times every day.

Users should never have to think about how to use the application.

The interface should feel

- Clean
- Modern
- Fast
- Friendly
- Minimal

Inspired by

- Material Design 3
- Apple Health
- Linear
- Notion Calendar

---

# Design Principles

Every screen should prioritize

- Clarity
- Simplicity
- Speed
- Accessibility
- Readability

Avoid

- Visual clutter
- Too many colors
- Complex menus
- Hidden interactions
- Tiny touch targets

---

# Mobile First

The application is designed for phones.

Desktop support is secondary.

Design every page assuming

- portrait orientation
- one-handed use
- touch interaction

---

# Theme

Only Light Mode is supported.

Dark mode should not be implemented.

---

# Typography

Application Font

```
Lexend
```

Hierarchy

| Usage | Weight |
|---------|--------|
| Page Title | 700 |
| Section Title | 600 |
| Card Title | 600 |
| Body | 400 |
| Caption | 400 |

---

# Spacing

Use an 8-point spacing system.

Allowed spacing

```
4
8
12
16
20
24
32
40
48
64
```

Avoid arbitrary spacing.

---

# Border Radius

Small

```
8px
```

Medium

```
12px
```

Large

```
16px
```

Cards

```
20px
```

Buttons

```
14px
```

---

# Elevation

Prefer subtle shadows.

Cards should appear slightly elevated.

Avoid heavy shadows.

---

# Color Palette

Primary

```
Emerald Green
```

Used for

- Primary buttons
- Charts
- Active states

Secondary

```
Blue
```

Used sparingly.

Success

```
Green
```

Warning

```
Amber
```

Danger

```
Red
```

Background

```
Off White
```

Cards

```
White
```

Text

Primary

```
Near Black
```

Secondary

```
Gray
```

---

# Icons

Use

Lucide React

Icons should remain

- Simple
- Consistent
- Outlined

---

# Buttons

Primary

Filled

Large

Full width when appropriate.

Secondary

Outlined

Danger

Red

Icon Buttons

Only for common actions.

---

# Inputs

Every input should have

- Label
- Placeholder
- Validation message

Never rely only on placeholders.

---

# Cards

Cards are the primary container.

Each card should

- Have rounded corners
- Subtle shadow
- Comfortable padding
- Clear hierarchy

Avoid overcrowding.

---

# Lists

Use cards instead of traditional tables whenever possible.

Each list item should display only the most important information.

Example

Customer Card

```
Rahul

Morning + Evening

9876543210

Edit
```

---

# Navigation

Bottom Navigation

```
Dashboard

Daily

Customers

Analytics

More
```

Bottom navigation should always remain visible.

---

# More Screen

Contains

- Bills
- Income
- Expenses
- Settings
- Backup & Restore

---

# Dashboard

The Dashboard should answer

How is today's business doing?

Layout

```
Greeting

↓

Today's Summary

↓

Monthly Summary

↓

Quick Actions

↓

Charts

↓

Recent Activity
```

---

# Summary Cards

Each metric should appear inside its own card.

Examples

```
Milk Collected

Milk Sold

Revenue

Home Quantity
```

Cards should be glanceable.

---

# Quick Actions

Use large rounded buttons.

Actions

- Daily Entry
- Customers
- Bills
- Income
- Expenses

---

# Charts

Use Recharts.

Charts should be responsive.

Recommended charts

Daily Sales

```
Line Chart
```

Revenue Trend

```
Area Chart
```

Income vs Expense

```
Bar Chart
```

Morning vs Evening

```
Grouped Bar
```

Customer Distribution

```
Pie Chart
```

Charts should never feel crowded.

---

# Customer Screen

Each customer appears as a card.

Display

- Name
- Phone
- Shift

Actions

- Edit
- Pause
- Resume

---

# Daily Sales Screen

Flow

```
Date

↓

Shift

↓

Milk Collected

↓

Home Quantity

↓

Customer List

↓

Save
```

Customer cards

```
Customer Name

Quantity Input
```

Default quantity

```
0
```

Users should never scroll horizontally.

---

# Bills Screen

Simple layout

```
Month

↓

Customer Selector

↓

Generate

↓

Bill Summary
```

Display

Morning

Evening

Overall

---

# Analytics Screen

Use tabs or chips.

```
Today

Yesterday

Month

Custom
```

Cards

↓

Charts

↓

Tables

Avoid overwhelming the user.

---

# Income Screen

Simple list.

Floating Action Button

```
+
```

for adding income.

---

# Expense Screen

Same layout as Income.

Maintain consistency.

---

# Settings Screen

Minimal.

Contains

- Milk Price
- Backup
- Restore

Nothing more.

---

# Empty States

Every empty screen should explain

- What this screen is
- Why it is empty
- What action should be taken

Example

```
No customers yet.

Add your first customer to begin.
```

---

# Loading States

Use skeleton loaders.

Avoid loading spinners whenever possible.

---

# Error States

Show friendly messages.

Example

```
Unable to save data.

Please try again.
```

Never expose technical details.

---

# Success Feedback

Show

- Snackbar
- Toast

Examples

```
Customer Added

Sales Saved

Expense Updated
```

Duration

```
2–3 seconds
```

---

# Animations

Use Framer Motion.

Animations should be

- Quick
- Subtle
- Purposeful

Examples

- Card fade-in
- Button press
- List insertion
- Modal transition

Avoid decorative animations.

---

# Touch Targets

Minimum

```
44 × 44 px
```

Interactive elements should be comfortably tappable.

---

# Forms

Every form should

- Auto focus first field
- Show inline validation
- Preserve entered values
- Prevent invalid submission

---

# Accessibility

Maintain sufficient color contrast.

Provide labels for every input.

Icons must have accessible labels.

Avoid relying solely on color.

---

# Responsive Behaviour

Primary breakpoint

Mobile

Tablet layouts may use two columns.

Desktop should simply expand spacing.

Never redesign the workflow for desktop.

---

# Reusable Components

Shared components should include

```
Button

Card

Input

Number Input

Date Picker

Shift Selector

Customer Card

Summary Card

Stat Card

Chart Card

Confirmation Dialog

Bottom Navigation

FAB

Search Bar

Empty State

Loading Skeleton

Toast

Modal
```

---

# UX Principles

Every interaction should

- Minimize typing
- Minimize taps
- Minimize scrolling

The application should feel predictable.

Users should always know

- Where they are
- What to do next
- What just happened

---

# Final Design Goal

A first-time user should be able to complete

- adding a customer
- recording milk sales
- generating a bill

without reading any instructions.

If an interaction requires explanation, the design should be simplified rather than documented.