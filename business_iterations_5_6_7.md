# M5–M7 sub-iterations TZ

Source of truth: `web_business/src/pages/{Overview,Forecast,Offers}.tsx`. Visual fidelity required (1:1 layout, colors, copy, spacing).

Toolchain confirmed:
- Expo Web running on :8081 → Playwright smoke gate enabled
- `react-native-toast-message` already wired in `src/app/index.tsx`
- `@expo/vector-icons` Feather for icons (lucide → feather mapping below)
- All screens render inside `BusinessLayout` via `business-stack.tsx`
- Use `useBusinessAppStore` (already in `src/entities/business-app/model/store.ts`)

## Lucide → Feather icon map

| web_business (lucide) | RN (Feather via `@expo/vector-icons/Feather`) |
|---|---|
| `Box` | `box` |
| `DollarSign` | `dollar-sign` |
| `Receipt` | `file-text` (closest) |
| `Leaf` | custom SVG (no Feather equivalent) |
| `ArrowUpRight` | `arrow-up-right` |
| `ArrowDownRight` | `arrow-down-right` |
| `MoreHorizontal` | `more-horizontal` |
| `ChevronRight` | `chevron-right` |
| `Filter` | `filter` |
| `X` | `x` |
| `Plus` | `plus` |
| `AlertOctagon` | `alert-octagon` |
| `Pencil` | `edit-2` |

For `Leaf` (no Feather match), reuse `chevron-right`/`box` placeholder or hand-port small SVG (TBD per stage).

---

## M5 — Overview

### Stage 5.1 — KPI cards + Top sales + Outsiders (no charts)
**Goal:** static layout port of Overview header, period toggle, 4 KPI cards, top-sales card, outsiders card. No charts yet.

**Files:**
- create `src/screens/business/overview/styles.ts` — sheet for screen layout
- create `src/screens/business/overview/data.ts` — static seed (`statsByPeriod`, `topSales`, `outsiders`) ported from `Overview.tsx:9-83`
- create `src/screens/business/overview/components/period-toggle.tsx` — reusable rounded pill toggle (variants: `large` vs `compact`)
- create `src/screens/business/overview/components/kpi-card.tsx` — single KPI card with gradient icon tile + delta line
- create `src/screens/business/overview/components/top-sales-card.tsx` — static list with header + 4 rows + "Смотреть все"
- create `src/screens/business/overview/components/outsiders-card.tsx` — static list with 3 rows + "Изменить"
- modify `src/screens/business/overview/index.tsx` — compose above; uses `Screen scroll` wrapper
- extend `src/shared/i18n/locales/ru/business.ts` — `overview.*` keys (subtitle, kpi labels, period labels, "Смотреть все", "Изменить")
- modify `src/widgets/business-topbar.tsx` if subtitle override needed (skip if not)

**Acceptance:**
- TS clean
- 4 KPI cards render with gradient icon tile, value, delta colored green/red with arrow icon
- Period toggle switches between 7д/30д/90д stat sets
- Top-sales lists 4 rows (rank, name, sold, revenue, percent pill)
- Outsiders lists 3 rows (rank, name, sold count, "Изменить" cta)
- All copy via i18n
- Visual match against `web_business` running on its own port (1280px)

### Stage 5.2 — Revenue line + hourly bar charts (react-native-svg)
**Goal:** add `RevenueLineChart` and `HourlyBarChart` widgets and mount in Overview.

**Files:**
- create `src/widgets/business-charts/index.ts` — barrel
- create `src/widgets/business-charts/revenue-line-chart.tsx` — SVG line+area chart with hover tooltip via `onPointerEnter`/`onPointerLeave` (web only; on native swallow with `Platform.OS==='web'` guard)
- create `src/widgets/business-charts/hourly-bar-chart.tsx` — paired bars with gradient fills + tooltip
- create `src/widgets/business-charts/data.ts` — `revenueByPeriod`, `hoursData` ported from `Overview.tsx:30-59`
- create `src/widgets/business-charts/styles.ts`
- modify `src/screens/business/overview/index.tsx` — wire chart widgets in 2-col grid alongside KPIs/lists per `Overview.tsx:138-301`
- extend i18n with chart titles ("Выручка", "Продажи по часам", "Пик: 18:00–20:00", legend "Продажи"/"План")

**Acceptance:**
- TS clean
- Line chart renders area gradient + dashed grid + 7 dots, points expand on hover, tooltip shows day + value
- Bar chart renders 8 paired bars with two gradients + Y-axis ticks `тыс.` + tooltip on hover
- Period switcher inside revenue card switches dataset
- Native fallback: charts render without tooltips (Pressable on bar group instead)

---

## M6 — Forecast

### Stage 6.1 — Forecast table + risk filter chips + alert banner
**Goal:** wire the Forecast screen content (table + filters + high-risk banner) without modals.

**Files:**
- create `src/screens/business/forecast/styles.ts`
- create `src/screens/business/forecast/components/risk-banner.tsx` — yellow alert with count, ₽ loss estimate, "Сгенерировать" CTA. Visible only when high-risk count > 0.
- create `src/screens/business/forecast/components/risk-filter-bar.tsx` — pill tabs `Все/Высокий/Средний/Низкий` + `Категории` outline button
- create `src/screens/business/forecast/components/forecast-row.tsx` — row component (name+sku, category, stock, forecast+diff, StatusPill, "Создать предложение" outline button)
- modify `src/screens/business/forecast/index.tsx` — compose; reads from `useBusinessAppStore` (with `useShallow`); local state for active filter; row click is no-op in 6.1 (modal in 6.2)
- extend i18n: `forecast.*` (filter labels, banner title/desc, table headers, action labels, toast strings)
- create `src/shared/lib/business-toast.ts` — thin helper `showBusinessToast(text, type='success')` that sets `text1Style`/`text2Style` to business theme tokens

**Acceptance:**
- TS clean
- Risk banner appears when ≥1 high-risk; loss estimate computed `(stock-forecast)*50` summed
- Filter pills filter the table; "Все" shows all
- "Создать предложение" calls `addOfferFromForecast` and shows business-styled toast
- Diff text colored: positive=red ("+N избыток"), negative=green ("N дефицит")

### Stage 6.2 — Surprise box + single forecast modals
**Goal:** add the two action modals from `Forecast.tsx:171-331` driven by row click and banner CTA.

**Files:**
- create `src/features/business/forecast-action/index.ts` — barrel
- create `src/features/business/forecast-action/types.ts` — local types (`BoxSize = 'S'|'M'|'L'`, `ForecastModalState`)
- create `src/features/business/forecast-action/use-forecast-modal.ts` — hook owning modal state (open/close, items list, name, size, single+qty)
- create `src/features/business/forecast-action/surprise-box-modal.tsx` — `BDialog`-wrapped form: editable title, items rows with remove button, "Добавить товары"/"Сгенерировать", size pill toggle, price/commission grid, ready window pill, final price, "Опубликовать"
- create `src/features/business/forecast-action/single-offer-modal.tsx` — `BDialog`-wrapped form: title, category/stock display, qty input, price/commission grid, "Опубликовать"
- modify `src/screens/business/forecast/index.tsx` — wire row click → single modal; banner CTA → box modal
- extend i18n with all modal strings + size descriptions

**Acceptance:**
- TS clean
- Box modal: pre-fills with first 4 high-risk items; "Добавить товары" appends next available; remove button deletes; size pills cycle S/L/M; "Опубликовать" calls `addOfferFromForecast` per item, toast, closes
- Single modal: pre-fills with row data + qty=stock; "Опубликовать" creates offer + toast + closes
- ESC closes (already in `BDialog`)

---

## M7 — Offers

### Stage 7.1 — Offers list + tabs + row actions (no edit modal)
**Goal:** wire the Offers screen content (header counter card, tabs, table with publish/delete actions). Edit is button stub for 7.2.

**Files:**
- create `src/screens/business/offers/styles.ts`
- create `src/screens/business/offers/components/published-counter.tsx` — small inline card with "Опубликованы" + count
- create `src/screens/business/offers/components/offer-tabs.tsx` — pill tab bar `Все/Опубликовано/Черновик` + Категории outline button
- create `src/screens/business/offers/components/offer-row.tsx` — row: name+sku, category, stock, oldPrice strikethrough, price, StatusPill, action group (Опубликовать pill if draft, edit icon, x icon)
- modify `src/screens/business/offers/index.tsx` — compose; tab filter; subscribes via `useBusinessAppStore` selectors
- extend i18n: `offers.*` (tabs, counter label, table headers, button labels, toast strings)

**Acceptance:**
- TS clean
- Counter shows live published count
- Tabs filter rows; "Все" shows all
- "Опубликовать" pill on draft only; calls `publishOffer` + toast
- X button calls `removeOffer` + toast
- Pencil button opens placeholder no-op (wired in 7.2)

### Stage 7.2 — Offer edit modal
**Goal:** finish offer flow with edit modal from `Offers.tsx:126-181`.

**Files:**
- create `src/features/business/offer-edit/index.ts`
- create `src/features/business/offer-edit/use-offer-edit.ts` — hook with form state (`price`, `stock`) using local `useState` (RHF overhead unjustified for 2 fields)
- create `src/features/business/offer-edit/offer-edit-modal.tsx` — `BDialog` with two `BInput` fields (numeric), Cancel + Save buttons in footer
- modify `src/screens/business/offers/index.tsx` — wire pencil click → modal; on save → `updateOffer` + toast
- extend i18n with modal strings

**Acceptance:**
- TS clean
- Pencil opens modal pre-filled with current price/stock
- Cancel closes without mutation
- Save calls `updateOffer` + toast + closes
- Empty input → save disabled (price≥0, stock≥0)

---

## Working cadence

- One stage per loop. After each: `npx tsc --noEmit` → simplifier → reviewer → fix loop → Playwright smoke (overview/forecast/offers screens) → conventional commit.
- Conventional Commits, no AI attribution. One commit per stage.
- Tick boxes in `business_migration_plan.md` after each stage commit.
- Pause for user review after batch of 2 stages (per existing cadence rule).

## Out of scope for these milestones

- Order screen lifecycle (M8)
- Toast styled provider override (M9.1) — use defaults for now; helper centralizes in `business-toast.ts` so theming later is one file
- Dark mode
- Native phone polish (only block-screen there)
