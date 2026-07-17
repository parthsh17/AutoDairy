# AGENTS.md

# AutoDairy — Agent Instructions

Welcome to AutoDairy.

This project is being built with AI-assisted development. Every coding agent working on this repository must follow the instructions in this document before making any code changes.

This document defines how to understand the project, how to navigate the documentation, and the workflow that must be followed throughout development.

---

# Project Overview

AutoDairy is a modern, mobile-first Progressive Web Application (PWA) that digitizes the day-to-day operations of a small family-run dairy business.

The project emphasizes:

- Simplicity
- Reliability
- Maintainability
- Excellent UX
- Mobile-first design
- Real-time synchronization
- Offline support

This is **not** a demo project.

This application is intended for real-world daily usage.

Every implementation should reflect production-quality engineering.

---

# Documentation Reading Order

Before implementing **any** feature, read the following documents **in this exact order**.

1. PRODUCT.md
2. RULES.md
3. ARCHITECTURE.md
4. SCHEMA.md
5. DESIGN.md
6. TODO.md
7. README.md
8. CHANGELOG.md

Never skip documentation.

Never assume requirements.

---

# Purpose of Each Document

## PRODUCT.md

Contains the complete business specification.

Read this first.

This document defines:

- Product vision
- Objectives
- Features
- User workflows
- Business rules
- Functional requirements

Whenever there is uncertainty about business behaviour, PRODUCT.md is the source of truth.

---

## RULES.md

Defines engineering standards.

Includes:

- Technology stack
- Coding standards
- Folder structure
- Naming conventions
- State management
- Component architecture
- Styling rules
- UI conventions

Never violate RULES.md.

---

## ARCHITECTURE.md

Defines application architecture.

Includes:

- Feature boundaries
- Module interactions
- Data flow
- Navigation
- Offline architecture
- Synchronization flow

Do not introduce architecture outside this document unless explicitly required.

---

## SCHEMA.md

Defines the database.

Contains:

- Tables
- Relationships
- Constraints
- Derived values
- Data integrity rules

Never duplicate data.

Never invent tables.

Never modify relationships without updating this document.

---

## DESIGN.md

Defines the design language.

Contains:

- Typography
- Layout
- Components
- Colors
- Navigation
- Charts
- Mobile behaviour
- Animations

Every screen must follow DESIGN.md.

---

## TODO.md

Defines project progress.

Always work on the highest priority incomplete task.

Never start unrelated work.

Whenever a task is completed:

- Update TODO.md
- Update CHANGELOG.md

---

## README.md

General project overview.

Useful for onboarding.

---

## CHANGELOG.md

Records completed work.

Every meaningful implementation should be recorded.

---

# Development Workflow

Whenever implementing a feature

1. Read PRODUCT.md.
2. Understand the business requirement.
3. Read ARCHITECTURE.md.
4. Understand how the feature integrates.
5. Read SCHEMA.md.
6. Understand required data.
7. Read DESIGN.md.
8. Build the feature.
9. Test the feature.
10. Update TODO.md.
11. Update CHANGELOG.md.

Never skip testing.

Never skip documentation.

---

# Core Development Principles

Always prefer

- Simplicity
- Readability
- Maintainability
- Predictability
- Consistency

Avoid

- Clever code
- Premature optimization
- Deep abstraction
- Unnecessary configuration
- Duplicate logic

The simplest correct solution is usually the right solution.

---

# Product Philosophy

AutoDairy is not a spreadsheet.

AutoDairy is not an ERP.

AutoDairy is a workflow application.

Every feature should reduce manual work.

Every calculation should happen automatically.

Every screen should require the minimum number of user interactions.

---

# Mobile First

This application is designed for phones.

Desktop support is secondary.

Every UI decision should assume the application is being used on a mobile device.

Design for

- one-handed use
- large touch targets
- vertical scrolling
- minimal typing

Never build desktop-first layouts.

---

# User Experience

Primary users are family members with limited technical knowledge.

The application should require almost no training.

Prioritize

- large buttons
- obvious actions
- readable typography
- clear feedback

Avoid

- hidden interactions
- complicated forms
- excessive settings
- unnecessary confirmations

---

# Component Philosophy

Every component should have one responsibility.

Prefer composition over inheritance.

Extract reusable logic into hooks.

Extract reusable UI into components.

Avoid components becoming excessively large.

---

# State Management

Local UI state belongs in React.

Server state belongs in TanStack Query.

Offline state belongs in IndexedDB.

Never duplicate server state.

Never mirror database state inside React state unnecessarily.

---

# Forms

Every form must

- validate inputs
- prevent invalid submissions
- provide inline validation
- use sensible defaults

Always use

- React Hook Form
- Zod

Never manually manage large forms.

---

# Database Philosophy

Source data is the only truth.

Bills

Revenue

Profit

Analytics

must always be calculated from source records.

Never store derived values unless historical accuracy requires it.

Example

Milk price used for a specific day's sales must be stored because prices can change.

Monthly revenue should never be stored because it can always be calculated.

---

# Offline Support

Offline functionality is a core requirement.

The application must continue functioning without internet.

Users should be able to

- create
- edit
- delete
- browse

while offline.

Synchronization should happen automatically.

Never lose user data.

---

# Synchronization

Multiple users will use the application simultaneously.

Changes should appear on every connected device automatically.

Never require manual refresh.

Design for eventual consistency.

---

# Error Handling

Never fail silently.

Every error should

- explain what happened
- explain why
- suggest what the user should do

Technical errors should never be exposed directly to users.

---

# Performance

Optimize for perceived performance.

Prefer

- optimistic UI
- skeleton loaders
- lazy loading
- responsive interactions

Avoid premature optimization.

---

# Accessibility

Every screen should

- use semantic HTML
- have labels
- support keyboard navigation where appropriate
- maintain sufficient contrast

Accessibility is not optional.

---

# Code Quality

All code should

- compile successfully
- pass TypeScript checks
- pass linting
- avoid dead code
- avoid duplicated logic

Never commit

- console.log
- commented-out code
- placeholder implementations
- unfinished TODOs

---

# Documentation

Whenever behaviour changes

update the appropriate documentation.

Documentation is part of the implementation.

---

# If Documentation Conflicts

Priority order

1. PRODUCT.md
2. RULES.md
3. ARCHITECTURE.md
4. SCHEMA.md
5. DESIGN.md

If documentation is incomplete

Do not guess.

Pause implementation and request clarification.

Never invent business logic.