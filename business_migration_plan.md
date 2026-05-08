# Business migration — checklist

Migration of `web_business/` (Vite + React + Tailwind + shadcn/ui) into the existing RN/Expo project. Web-only target (Platform.OS === 'web' AND width ≥ 768px). Native phones see a styled block screen telling them to use the web version.

Strategy decisions (locked):
- Port to RN code that runs on RN-Web; no `react-native-webview`.
- Min screen width: ≥768px (md).
- Visual fidelity: match `web_business` colors exactly via `theme.business` sub-theme.
- Reuse existing `useAuthStore` for staff/admin gating; mocks now, real entities later.
- Charts: hand-rolled SVG via `react-native-svg`.
- i18n: `business` namespace, all RU strings extracted.
- Routing: `BusinessStack` + custom sidebar layout (replaces stub `BusinessTabs`).

## Iterations

### M1 — Foundation
- [x] **1.1** `react-native-svg` installed; `theme.business` sub-theme + this checklist file
- [x] **1.2** Block screen + `business` i18n namespace + root-navigator gating

### M2 — Layout shell
- [x] **2.1** `BusinessStack` (4 native-stack routes, empty placeholders)
- [x] **2.2** `BusinessLayout` widget (sidebar 260px + topbar 42px h1)

### M3 — Business UI atoms
- [x] **3.1** `b-card`, `b-button`, `b-badge`, `status-pill`
- [x] **3.2** `b-table`, `b-dialog`, `b-tabs`, `b-select`, `b-input`, `b-skeleton`

### M4 — Mock data + store
- [x] **4.1** Business mocks ported from `useAppStore`
- [x] **4.2** `useBusinessAppStore` with full action set

### M5 — Overview
- [x] **5.1** KPI stats + top-sales table + outsider list
- [x] **5.2** `RevenueLineChart` + `HourlyBarChart` (react-native-svg)

### M6 — Forecast
- [x] **6.1** Forecast table + risk filter chips
- [x] **6.2** Forecast modal (surprise box / single offer)

### M7 — Offers
- [x] **7.1** Offers list with draft/published tabs + inline edit
- [x] **7.2** Offer modal + status transitions

### M8 — Orders
- [ ] **8.1** Orders table + status filter
- [ ] **8.2** Order status lifecycle flow

### M9 — Polish
- [ ] **9.1** Toaster + fade-in animations
- [ ] **9.2** Final review (a11y, dark mode TBD, FSD audit, CLAUDE.md update)

## Working cadence
- Two iterations per work block, then user review.
- TS gate + code-simplifier + code-reviewer per iteration (rn-implement-tz skill).
- One commit per iteration. Conventional Commits. No AI attribution.
