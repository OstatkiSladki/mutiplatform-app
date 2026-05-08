# M8 + M9 — Iteration TZ

Sub-plan covering the final two milestones of `business_migration_plan.md`. Each stage is atomic, single-commit, FSD-compliant.

## M8 — Orders

### 8.1 — Orders table + tabs (visual layer)
**Goal:** Port `web_business/src/pages/Orders.tsx` UI into RN. Tabs `Все | Подтверждён | Отменён`, table rows with status pills.

**Files to create/modify:**
- `src/screens/business/orders/index.tsx` — replace placeholder with full screen
- `src/screens/business/orders/styles.ts` — table + tab styles via `theme.business`
- `src/screens/business/orders/components/order-tabs.tsx` — pill-style tab group + categories button (mirror `OfferTabs`)
- `src/screens/business/orders/components/order-row.tsx` — row with id, client, items, amount, time, status pill, action slot
- `src/shared/i18n/locales/ru/business.ts` — extend with `orders.tabs.*`, `orders.table.*`, `orders.actions.*`, `orders.toast.*`

**Acceptance:**
- TS clean
- Tabs filter the visible rows
- Status pill colors match web: Ожидает → pending, Подтверждён → draft, Выполнен → done, Отменён → cancelled
- All RU strings come from i18n

### 8.2 — Order status lifecycle action
**Goal:** Wire advance action `Ожидает → Подтверждён → Выполнен` + toast notification.

**Files to create/modify:**
- `src/screens/business/orders/index.tsx` — handle `advanceOrder` from store, show toast on transition
- `src/screens/business/orders/components/order-row.tsx` — render advance button when status is `Ожидает|Подтверждён`, else dash
- `src/shared/i18n/locales/ru/business.ts` — add `orders.toast.advanced`

**Acceptance:**
- TS clean
- Click advance on `Ожидает` row → status becomes `Подтверждён`; click again → `Выполнен`
- Toast `Заказ #<id> обновлён` shows on each transition
- `Выполнен` and `Отменён` rows show `—` instead of button

## M9 — Polish

### 9.1 — Fade-in animation + toaster sanity
**Goal:** Add `FadeIn` entry animation to business screen content via Reanimated. Confirm toast wiring works (already in `src/app/index.tsx`).

**Files to create/modify:**
- `src/widgets/business-layout/index.tsx` — wrap content with `Animated.View` + `FadeIn.duration(220)`
- `src/widgets/business-layout/styles.ts` — no change unless needed

**Acceptance:**
- TS clean
- Web 1280px: navigating between business routes triggers content fade-in
- No regression on existing toasts

### 9.2 — Final review
**Goal:** Audit FSD boundaries, a11y labels, theme tokens, hardcoded strings; tick checklist; update CLAUDE.md.

**Files to create/modify:**
- `business_migration_plan.md` — tick all completed boxes
- `CLAUDE.md` — append "Business stack" section
- Any spot-fixes uncovered by audit (small)

**Acceptance:**
- `npx tsc --noEmit` clean (excluding pre-existing `convert.js`)
- No `any` in business tree
- No raw RU strings in JSX
- All colors via `theme.business`
- FSD layer imports go downward only

## Working cadence

Per `rn-implement-tz` skill: TS gate → simplifier → reviewer → fix → commit per stage. No batching across stages. Conventional Commits, no AI attribution.
