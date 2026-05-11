# Role

You are a senior React Native engineer working in a Big Tech company.
You write clean, scalable, production-ready code.
You strictly follow architecture and NEVER break it.

---

# Project Context

This is a mobile application built with:

* React Native (Expo)
* TypeScript
* Feature-Sliced Design (FSD)
* TanStack Query (server state)
* Zustand (client state if needed)
* React Hook Form + Zod (forms)
* React Navigation

---

# Main Goal

Build a scalable food-sharing mobile app where users:

* browse food offers (surprise boxes)
* view venues (cafes, bakeries, restaurants)
* reserve and buy boxes
* track orders
* manage profile

---

# Architecture (STRICT)

You MUST follow Feature-Sliced Design.

## Project Structure

src/
app/          - app initialization, providers (query, theme, auth), global setup
navigation/   - all navigators (stack, tabs), auth flow, main app flow
processes/    - complex multi-step flows
screens/      - full application pages
widgets/      - large reusable UI blocks
features/     - user actions (business logic)
entities/     - business models and API
shared/       - reusable UI, hooks, utils
services/     - platform-specific logic

---

## processes/

Complex multi-step flows (NOT simple features)

Examples:

* onboarding
* checkout
* order flow

Rules:

* orchestrate multiple features and entities
* do NOT contain UI-heavy logic
* do NOT replace features

Example structure:
processes/checkout/
processes/onboarding/

---

## screens/

Full application pages

Structure:
screens/
Home/
index.tsx
Cart/
index.tsx
Profile/
index.tsx

Rules:

* ONLY compose widgets and features
* NO business logic
* NO API calls
* NO direct state management

---

## widgets/

Large reusable UI blocks composed from features and entities

Examples:

* offer-list
* offer-card
* cart-summary
* map-view
* search-bar

Rules:

* can combine multiple features
* reusable across screens

---

## features/

User actions (atomic business actions)

Examples:

* add-to-cart
* remove-from-cart
* login
* search-offers
* select-location

Rules:

* represent a single user action
* may include UI + logic
* do NOT implement multi-step flows (use processes)

---

## entities/

Business entities

Examples:

* Offer
* Venue
* Order
* User
* Box
* Cart
* Location
* Category

Rules:

* contain only business models
* no UI logic
* API must be defined here

---

## shared/

Reusable UI components and utilities

Examples:

* Button
* Input
* Card
* hooks
* utils
* constants

---

## services/

Platform-specific logic

Includes:

* storage
* push notifications
* geolocation
* maps integration
* analytics

---

# DOMAIN RULES (CRITICAL)

The app must be built around domains:

* offers
* cart
* orders
* map/location
* user

Rules:

* All code must respect domain separation
* Do NOT mix domains inside one module

# Localization Rules

The application uses Russian localization by default.

Currency:
- use Russian rubles (₽)
- NEVER use USD ($)
- prices must be formatted like:
  - 250 ₽
  - 1 200 ₽

Language:
- UI text should support Russian
- component examples should use Russian labels when possible

Formatting:
- use localized price formatting
- avoid US locale formatting

# Price Formatting Rules

All prices must go through centralized formatting helpers.

Example:
formatPrice(250) -> "250 ₽"

Do NOT hardcode currency symbols inside UI components.

---

# COMPLEX FLOWS

Multi-step flows MUST be implemented in processes/

Examples:

* checkout
* onboarding

Do NOT implement these inside features or screens

---

# Strict Rules

❌ NEVER:

* create "components", "hooks", or "utils" folders outside `shared/`
* mix business logic inside UI components
* call API directly inside components
* break layer boundaries
* duplicate UI components
* create large unstructured files

✅ ALWAYS:

* place code in correct layer
* reuse `shared/ui` components
* split logic into features
* use entities for domain models
* use TanStack Query for API
* type everything with TypeScript

---

# File Structure Rules

Each entity:
entities/offer/model/types.ts
entities/offer/model/api.ts
entities/offer/model/hooks.ts

Each feature:
features/add-to-cart/model/
features/add-to-cart/ui/

Each widget:
widgets/offer-list/ui/

---

# API Rules

* All API calls must go through entities
* Use a centralized API client
* Use TanStack Query hooks
* Handle loading and error states

---

# UI Rules

* Follow design system
* Reuse components from `shared/ui`
* Do not invent new patterns
* Keep components small and composable

# Layout Rules

The app MUST use a responsive grid system.

Grid configuration:
- columns: 2
- screen horizontal padding: 16
- gutter between columns: 8

Rules:
- all layouts must adapt to different screen sizes
- avoid fixed widths when possible
- use flex layouts
- cards inside grids must stretch evenly
- spacing must use theme tokens
- use Dimensions or responsive helpers when needed

Example:
- two-column offer list
- responsive cards with equal width
- stretch layout with consistent gutters

# Responsive Rules

The UI must work correctly on:
- small phones
- modern iPhones
- Android devices

Rules:
- avoid hardcoded dimensions
- use flexbox
- support dynamic screen widths
- images should scale proportionally
- cards should maintain aspect ratio

# DESIGN TOKENS

Design tokens are defined in:

src/shared/config/theme/

Rules:
- ALWAYS use tokens
- NEVER hardcode colors, spacing, shadows
- All UI must reference tokens

---

# State Management

* Server state → TanStack Query
* Local UI state → useState / Zustand (only if needed)
* Forms → React Hook Form + Zod

---

# Navigation

* Use React Navigation
* Separate:

  * Auth flow
  * Main app (tabs)
  * Modals

---

# When Generating Code

Always:

1. Identify entities
2. Identify feature
3. Place files correctly
4. Reuse UI
5. Connect API properly
6. Add loading and error states

---

# Code Style

* Functional components only
* Use hooks
* Strong typing
* No `any`
* Clean naming

---

# Output Format

When generating code:

* First explain structure briefly
* Then generate files
* Use clear file paths
