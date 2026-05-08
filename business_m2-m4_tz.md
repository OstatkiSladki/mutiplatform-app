# TZ — Business Migration M2, M3, M4

Детальный план реализации по этапам. Каждый этап — один коммит, FSD-совместим.

---

## Stage M2.1 — BusinessStack: навигация и маршруты

**Goal:** Заменить `BusinessTabs` на `BusinessStack` (native-stack) с 4 маршрутами: Overview, Forecast, Offers, Orders. Обновить типы и root-navigator.

**Files to create/modify:**
- `src/navigation/business-stack.tsx` — новый native-stack (4 маршрута, empty-screen плейсхолдеры)
- `src/navigation/types.ts` — заменить `BusinessTabsParamList` на `BusinessStackParamList` (Overview | Forecast | Offers | Orders)
- `src/navigation/root-navigator.tsx` — импортировать `BusinessStack` вместо `BusinessTabs`
- `src/screens/business/overview/index.tsx` — пустой плейсхолдер (EmptyState)
- `src/screens/business/forecast/index.tsx` — пустой плейсхолдер
- `src/screens/business/offers/index.tsx` — пустой плейсхолдер
- `src/screens/business/orders/index.tsx` — пустой плейсхолдер
- `src/navigation/business-tabs.tsx` — удалить (заменён)

**Acceptance criteria:**
- `npx tsc --noEmit` — чисто
- Навигация между 4 пустыми экранами работает на web
- Нет FSD-нарушений (navigation импортирует только screens/shared, не наоборот)

**Libraries this stage touches:** `@react-navigation/native-stack`

---

## Stage M2.2 — BusinessLayout: sidebar + topbar

**Goal:** Виджет `BusinessLayout` — sidebar 260px + topbar с заголовком. Внедрить как обёртку в `business-stack`.

**Files to create:**
- `src/widgets/business-layout/index.tsx` — основной layout (sidebar + content area)
- `src/widgets/business-layout/business-sidebar.tsx` — 260px, фон `sidebar.background`, 4 nav-пункта с rounded-full активным пиллом
- `src/widgets/business-layout/business-topbar.tsx` — заголовок (i18n titles), подзаголовок, поиск-input, аватар-пилл из `useAuthStore`
- `src/widgets/business-layout/styles.ts` — StyleSheet

**Reference:** `web_business/src/components/layout/{AppLayout,Sidebar,Topbar}.tsx`

**Acceptance criteria:**
- Sidebar навигирует между 4 маршрутами (active pill подсвечивает текущий)
- Topbar показывает localised заголовок + аватар user из `useAuthStore`
- Pixel-близко к `web_business` layout при ≥768px
- `npx tsc --noEmit` — чисто

**Libraries this stage touches:** `react-i18next`, `@react-navigation/native`

---

## Stage M3.1 — Business atoms: b-card, b-button, b-badge, status-pill

**Goal:** 4 базовых UI-примитива в `src/shared/ui/business/`, используют `theme.business` токены.

**Files to create:**
- `src/shared/ui/business/b-card.tsx` — rounded=24 (`businessTokens.radius.card`), shadow, header/content/footer subcomponents
- `src/shared/ui/business/b-button.tsx` — variants: `default` (primary fill), `outline`, `ghost`, `destructive`; sizes: `sm`, `default`, `lg`, `icon`
- `src/shared/ui/business/b-badge.tsx` — variants: `default`, `secondary`, `destructive`, `outline`
- `src/shared/ui/business/status-pill.tsx` — port из `web_business/src/components/ui-custom/StatusPill.tsx`; variant → `businessTokens.colors.status[*]`
- `src/shared/ui/business/index.ts` — barrel export

**Reference:**
- `web_business/src/components/ui/{card,button,badge}.tsx`
- `web_business/src/components/ui-custom/StatusPill.tsx`
- `web_business/src/index.css` — `.pill`, `.pill-dot` классы

**Acceptance criteria:**
- `npx tsc --noEmit` — чисто
- Нет импортов из `theme.colors` (только `theme.business`)
- Все варианты реализованы (нет `any`)

**Libraries this stage touches:** — (только RN primitives + theme)

---

## Stage M3.2 — Business atoms: b-table, b-dialog, b-tabs, b-select, b-input, b-skeleton

**Goal:** 6 более сложных UI-примитивов для форм и таблиц.

**Files to create:**
- `src/shared/ui/business/b-table.tsx` — View-based таблица: `BTable`, `BTableHeader`, `BTableRow`, `BTableCell`; горизонтальный `ScrollView` при overflow
- `src/shared/ui/business/b-dialog.tsx` — RN `Modal` с backdrop (полупрозрачный overlay), анимация fade, заголовок + контент + footer
- `src/shared/ui/business/b-tabs.tsx` — Pressable-таббар + контент-область; управляется через `activeTab` + `onChange`
- `src/shared/ui/business/b-select.tsx` — TextInput + иконка + выпадающий список (Modal на web, simplified)
- `src/shared/ui/business/b-input.tsx` — TextInput с `theme.business` стилями, label, error state
- `src/shared/ui/business/b-skeleton.tsx` — анимированный opacity pulse через Reanimated (`useSharedValue` + `withRepeat`)
(update `src/shared/ui/business/index.ts`)

**Acceptance criteria:**
- `npx tsc --noEmit` — чисто
- `b-skeleton` использует Reanimated (не `Animated` из RN)
- Нет `any`

**Libraries this stage touches:** `react-native-reanimated`

---

## Stage M4.1 — Business types + mock data

**Goal:** Типизировать все бизнес-сущности. Портировать seed-данные из `web_business/src/store/useAppStore.ts`.

**Files to create:**
- `src/entities/business-app/model/types.ts` — `RiskLevel`, `OfferStatus`, `OrderStatus`, `ForecastItem`, `BusinessOffer`, `BusinessOrder`, `SurpriseBoxItem` (точно по web_business, без `any`)
- `src/shared/dev/business-mocks/forecast.ts` — `initialForecast: ForecastItem[]` (7 items из web_business)
- `src/shared/dev/business-mocks/offers.ts` — `initialOffers: BusinessOffer[]` (4 items)
- `src/shared/dev/business-mocks/orders.ts` — `initialOrders: BusinessOrder[]` (7 items)
- `src/entities/business-app/index.ts` — barrel export types

**Reference:** `web_business/src/store/useAppStore.ts` (lines 1–85)

**Acceptance criteria:**
- `npx tsc --noEmit` — чисто
- Типы совпадают с `web_business` сигнатурами (rename `Offer` → `BusinessOffer` во избежание коллизии с client `Offer`)
- Нет `any`

**Libraries this stage touches:** — (типы только)

---

## Stage M4.2 — useBusinessAppStore

**Goal:** Zustand store с полным набором actions из web_business. Seed из M4.1 моков.

**Files to create:**
- `src/entities/business-app/model/store.ts` — `useBusinessAppStore` (State + Actions): `forecast`, `offers`, `orders`; actions: `addOfferFromForecast`, `publishOffer`, `removeOffer`, `updateOffer`, `advanceOrder`, `cancelOrder`, `addOrder`

**Reference:** `web_business/src/store/useAppStore.ts` (lines 86–137)
**Pattern:** `reference/auth-store.example.ts` — State + Actions отдельными interfaces, `useShallow` на call-site

**Acceptance criteria:**
- `npx tsc --noEmit` — чисто
- State/Actions разделены в отдельные interfaces
- Нет `any`; actions типизированы через `Partial<Pick<...>>`

**Libraries this stage touches:** `zustand`

---

## Порядок выполнения

```
M2.1 → M2.2 → M3.1 → M3.2 → M4.1 → M4.2
```

Каждый этап: impl → tsc gate → simplifier → code-reviewer → fix loop → commit.
