# Client Web → React Native Migration Plan

> **Цель:** Перенести `web_client/` (React + Vite + Tailwind + shadcn/ui) на текущий React Native / Expo стек (`src/screens/client/`) с **точным сохранением визуала и стилей**. Действующая RN реализация остаётся точкой входа, но её UI приводится к дизайну web версии.
>
> **Не цель:** Менять бизнес-логику, домен entities, API, навигацию, FSD layering. Все изменения визуальные + связанные с ними презентационные пропсы.

---

## 0. Контекст и базовые решения

### 0.1 Source of truth — web_client дизайн-токены

Из `web_client/src/index.css` (light theme — мобильный/web клиент использует только light):

| Token | HSL | Hex | Назначение |
|---|---|---|---|
| `--background` | `30 25% 96%` | `#F7F4EF` | фон страницы |
| `--foreground` | `0 0% 10%` | `#1A1A1A` | текст |
| `--card` | `0 0% 100%` | `#FFFFFF` | карточки |
| `--primary` | `24 95% 55%` | `#FA7B1F` | CTA (близко к текущему `#fa7201`) |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | текст на primary |
| `--secondary` / `--muted` | `0 0% 96%` | `#F5F5F5` | input bg / nav pill bg |
| `--muted-foreground` | `0 0% 45%` | `#737373` | вторичный текст |
| `--accent` | `24 100% 95%` | `#FFE9D6` | бледно-оранжевый chip bg |
| `--accent-foreground` | `24 95% 40%` | `#CC5800` | текст на accent chip |
| `--border` | `0 0% 90%` | `#E6E6E6` | разделители/обводки |
| `--star` | `38 95% 55%` | `#F8AC1F` | звёзды рейтинга |
| `--shadow-card` | — | `0 2px 12px rgba(0,0,0,0.06)` | card elevation |
| `--radius` | — | `14px` | базовый радиус (соответствует `lg`) |

Дополнительные accent цвета встречаются inline (например зелёный chip `hsl(160 60% 90%)` / `hsl(160 60% 25%)`). Эти инлайны фиксируем как `theme.colors.client.chipGreenBg/Fg`.

Шрифт: **Inter** (web), system-ui fallback. На RN — оставляем существующий стек (Source Sans Pro / Inter); если Inter не подключён — добавляем через `expo-font` в Stage 1.

### 0.2 Архитектурные ограничения

* FSD строго: `app → processes → screens → widgets → features → entities → shared`. Никаких новых вершинных папок.
* Никаких хардкоженных цветов / spacing / typography — только токены из `src/shared/config/theme`.
* Никаких пользовательских строк в JSX — `useTranslation('client' | существующие namespaces)`.
* Все стили — `StyleSheet.create` в соседнем `styles.ts`.
* Без `any`. Без div/span/p.
* Multiplatform: `Platform.select` / `useResponsive` для desktop layout (≥ `md`/`lg`). На mobile (390px) — стек, на tablet/desktop (≥768/1024) — grid и sticky сайдбары как в web.

### 0.3 Стратегия "не сломать"

Каждая итерация заменяет визуал, но сохраняет:
* Текущие React Query хуки (`useVenues`, `useOrders`, `useCart` ...)
* Текущие Zustand сторы
* Текущую навигацию (`ClientStackParamList`)
* Текущие i18n ключи (расширяем, не переименовываем)

Если требуется новый ключ — добавляем в существующий namespace.

---

## 1. Маппинг `web_client` → `src/screens/client`

| web_client | RN client | Статус |
|---|---|---|
| `pages/Index.tsx` | `screens/client/home/ui/HomeScreen.tsx` | визуал переделать |
| `pages/Place.tsx` | `screens/client/venue/ui/VenueScreen.tsx` | визуал переделать (grid + sticky cart sidebar) |
| `pages/Booking.tsx` | `screens/client/booking/ui/BookingScreen.tsx` | визуал переделать (split layout, payment sheet) |
| `pages/Cart.tsx` | `screens/client/cart/index.tsx` | визуал переделать (агрегатор по venue) |
| `pages/Orders.tsx` | `screens/client/orders/index.tsx` | визуал переделать (карточки заказов) |
| `pages/NotFound.tsx` | `screens/client/placeholder/index.tsx` | косметика |
| `components/Header.tsx` | `widgets/client-desktop-header` + `widgets/app-header` | объединить и переделать |
| `components/EstablishmentCard.tsx` | `widgets/venue-card` | новый visual |
| `components/PlaceListItem.tsx` | `widgets/venue-list-item` | новый visual |
| `components/SurpriseBoxCard.tsx` | `widgets/surprise-box-card` + `features/surprise-box-builder` | новый visual + form bindings |
| `components/ProductModal.tsx` | `features/product-details/ProductDetailsSheet` | новый visual |
| `components/PaymentModal.tsx` | `features/payment/PaymentBottomSheet` | новый visual |
| `components/Stars.tsx` | `shared/ui/stars` | сверить размеры |
| `components/MapPlaceholder.tsx` | новый `widgets/map-placeholder` | заглушка с CTA |

---

## 2. Итерации (6 × 2 stage)

> В работу берём **по 2 stage за итерацию**, верифицируем (TS gate, code-simplifier, code review per FSD checklist, optional Playwright web smoke), коммитим, отмечаем галочкой, переходим дальше.
>
> Используем sub-agents Sonnet (Explore, code-simplifier, code-reviewer) для дешёвых задач. Имплементационные шаги — основной поток.

### Iteration 1 — Foundation

#### [ ] Stage 1 — Theme tokens parity

* **Goal:** Привести `src/shared/config/theme/` к точному соответствию web_client CSS variables.
* **Files:**
  * `src/shared/config/theme/index.ts` — добавить `client` section: `background`, `foreground`, `card`, `cardForeground`, `mutedForeground`, `accent`, `accentForeground`, `border`, `star`, `shadowCard` (RN shadow object: `{ shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation }`), `radius.card = 14`.
  * `src/shared/config/theme/types.ts` — расширить тип.
  * (опц.) `src/app/AppEntry.tsx` — подключить Inter через `expo-font` если ещё нет.
* **Acceptance:**
  * TS компилирует.
  * Нет regression: businees theme не тронут.
  * Snapshot HSL→hex значений в комментарии у токена для traceability.
* **Libs:** —

#### [ ] Stage 2 — Shared atoms parity (Button, Card, Chip, Input, Stars, Avatar, Stepper)

* **Goal:** Привести базовые атомы к виду web_client.
* **Files:**
  * `src/shared/ui/button/Button.tsx` — варианты `primary` (orange filled, h=44 mobile / h=48 desktop, radius=14, font 600), `secondary` (#F5F5F5 bg, foreground text, radius=full pill), `ghost`, `icon-circle` (44x44 round, secondary bg).
  * `src/shared/ui/chip/Chip.tsx` — accent chip (FFE9D6/CC5800), small; вариант `chipGreen`.
  * `src/shared/ui/input/Input.tsx` — round-pill h=44 на secondary с лупой / clear (для поиска в Header).
  * `src/shared/ui/card/Card.tsx` — bg=#FFF, radius=14, border #E6E6E6, shadow-card, padding 16/20/24 пресеты.
  * `src/shared/ui/stars/Stars.tsx` — `size=13|16` варианты, fill #F8AC1F.
  * `src/shared/ui/avatar/Avatar.tsx` — circle 40/44, fallback initials.
  * `src/shared/ui/stepper/Stepper.tsx` — два варианта: маленький круглый (28px) для product card, большой pill (h=40, серый bg) для booking.
* **Acceptance:**
  * Каждому атому Storybook-style демо в `__sandbox__` (или одна demo screen за `__DEV__` — не обязательно, можно скип).
  * Атомы используют ТОЛЬКО токены темы.
  * Все экраны, которые их уже импортируют, продолжают работать (TS gate).
* **Libs:** —

---

### Iteration 2 — Layout + Home

#### [x] Stage 3 — Client Header (web/desktop) parity

* **Goal:** Реплицировать `components/Header.tsx`: логотип + brand, search pill, location pill, cart icon, avatar popover.
* **Files:**
  * `src/widgets/client-desktop-header/ui/ClientDesktopHeader.tsx` (заменить/расширить).
  * `src/widgets/app-header/ui/AppHeader.tsx` — мобильная версия (компактная: лого + cart + avatar; search в отдельной строке).
  * `src/shared/ui/popover/Popover.tsx` — если нет, добавить (cross-platform: Modal на native, абсолютное позиционирование на web). Иначе — переиспользовать `BottomSheet` на мобиле и `Modal` на web.
* **Acceptance:**
  * На web (Expo Web) шапка визуально идентична `web_client`.
  * На mobile — адаптивно (логика в `useResponsive`).
  * Search clear работает (state локальный — пока без интеграции с поиском).
  * Профиль popover содержит: "История заказов", "Поддержка", "Уведомления", "О сервисе", "Выйти".
* **Libs:** `react-native-reanimated`, `Platform`.

#### [x] Stage 4 — Home screen parity

* **Goal:** Реплицировать `pages/Index.tsx`: 3 секции (Заведения близко от вас + Map+List, Заведения carousel, Сюрприз бокс grid).
* **Files:**
  * `src/screens/client/home/ui/HomeScreen.tsx` — переделать layout.
  * `src/screens/client/home/ui/styles.ts` — стили.
  * `src/widgets/venue-list-item/ui/VenueListItem.tsx` — новый visual (логотип-плейсхолдер с фоном/текстом, адрес, теги, часы, ›).
  * `src/widgets/venue-card/ui/VenueCard.tsx` — Establishment card (image 230×128, name, tags, rating + distance + hours bar) — фиксированная ширина 230, shrink-0, overflow horizontal.
  * `src/widgets/surprise-box-card/ui/SurpriseBoxCard.tsx` — превью версии для Home (без расширенного builder).
  * `src/widgets/map-placeholder/ui/MapPlaceholder.tsx` — серый placeholder со ссылкой "открыть карту".
  * `src/shared/i18n/locales/ru/catalog.ts` — добавить `sectionNearby`, `sectionEstablishments`, `sectionSurpriseBoxes`.
* **Acceptance:**
  * Section padding/spacing 1:1 с web (page max-width 1280, py-24, gap-40 между секциями).
  * Mobile: секции стекуются, carousel остаётся горизонтальным со скроллом.
  * VenueCard рейтинг иконки совпадают по цвету.
* **Libs:** `react-native-svg` (если нужны иконки lucide-equivalent через `@expo/vector-icons` Feather).

---

### Iteration 3 — Catalog flows

#### [ ] Stage 5 — Venue / Place screen parity

* **Goal:** Реплицировать `pages/Place.tsx`: header info card + product grid (4 cols desktop / 2 cols mobile) + sticky cart sidebar (320px desktop) или bottom-sheet cart на mobile.
* **Files:**
  * `src/screens/client/venue/ui/VenueScreen.tsx` — переделать layout.
  * `src/widgets/venue-header-card/ui/VenueHeaderCard.tsx` — large logo placeholder + name + address + stars + chips + hours.
  * `src/widgets/product-grid/ui/ProductGrid.tsx` + `OfferCard.tsx` — карточка товара по дизайну web (название, вес, фото 1:1, stepper +/-, цена + arrow-up-right CTA).
  * `src/widgets/cart-summary/ui/CartSummary.tsx` — sticky sidebar (desktop) / bottom-sheet (mobile): items, total, "Забронировать" CTA, empty state с картинкой.
  * Сохранить `assets/empty-cart.png` в `src/shared/assets/empty-cart.png` (скопировать из web_client).
* **Acceptance:**
  * Desktop: 1fr + 320px grid layout с sticky sidebar (`position: 'sticky'` web only, on native — fixed bottom panel).
  * Stepper — маленький круглый (28px).
  * Empty cart — image центрирован, текст серый.
  * Кнопка "Забронировать" navigate to `Booking { venueId }` и сохраняет cart в существующий store.
* **Libs:** `react-native-reanimated` (FadeIn).

#### [ ] Stage 6 — Product details modal/sheet parity

* **Goal:** Реплицировать `components/ProductModal.tsx` — bottom sheet на mobile / dialog на web.
* **Files:**
  * `src/features/product-details/ui/ProductDetailsSheet.tsx` — обновить визуал.
  * `src/screens/client/product-details/index.tsx` — выровнять с sheet (тот же layout, full-screen на mobile).
* **Acceptance:**
  * Заголовок, фото 1:1, описание, вес, цена крупно, stepper, CTA "Добавить в корзину" full-width.
  * `BottomSheetModal` (gorhom v5) на mobile, `Modal` на web.
* **Libs:** `@gorhom/bottom-sheet`.

---

### Iteration 4 — Cart + Booking

#### [ ] Stage 7 — Cart screen parity (multi-venue aggregator)

* **Goal:** Реплицировать `pages/Cart.tsx` — агрегация sessionStorage drafts по venue.
* **Files:**
  * `src/screens/client/cart/index.tsx` — новый layout: список venue groups (logo + name + items count + сумма + CTA "Перейти к бронированию"). На mobile — стек, на desktop — список с фиксированным max-width.
  * `src/widgets/cart-venue-group/ui/CartVenueGroup.tsx` — карточка одной venue группы.
  * Empty state: переиспользовать `empty-cart.png` + текст "В вашей корзине пока пусто" + CTA "К заведениям".
* **Acceptance:**
  * Группировка по `venueId` через текущий cart store.
  * Клик по группе → navigate `Booking { venueId }`.
  * Reactive (изменение в venue → пересчёт total).
* **Libs:** `zustand` selector с `useShallow`.

#### [ ] Stage 8 — Booking + Payment sheet parity

* **Goal:** Реплицировать `pages/Booking.tsx` — split layout (1fr / 360px), order items, slot select, price breakdown, payment modal.
* **Files:**
  * `src/screens/client/booking/ui/BookingScreen.tsx` — переделать layout.
  * `src/features/checkout/ui/CheckoutForm.tsx` — slot pill select (3 варианта 19:00–22:00), address pill (read-only).
  * `src/features/checkout/ui/OrderItemsList.tsx` — карточка товара (image 64×64, name, price + weight, large stepper pill `#hsl(30 15% 75%)` bg, h=40).
  * `src/widgets/price-breakdown/ui/PriceBreakdown.tsx` — sticky сайдбар (desktop): "Что в цене", goods, fee, total справа крупно, CTA "Оплатить".
  * `src/features/payment/ui/PaymentBottomSheet.tsx` — Card / SBP / Apple Pay tabs, форматирование номера 4-4-4-4, MM/YY, CVC, имя, "Оплатить XXX ₽" CTA, success → save order → toast.
  * Внизу — `<SurpriseBoxesSection>` карусель.
* **Acceptance:**
  * Slot select — pill style, выделенный = primary bg.
  * Stepper в booking — большой pill h=40, серо-бежевый bg.
  * Payment sheet — `BottomSheetModal` на mobile, `Modal` centered на web.
  * Service fee = 29₽ при наличии items.
  * react-hook-form + zod для card form.
* **Libs:** `react-hook-form`, `zod`, `@hookform/resolvers`, `@gorhom/bottom-sheet`.

---

### Iteration 5 — Orders + Profile

#### [ ] Stage 9 — Orders history screen parity

* **Goal:** Реплицировать `pages/Orders.tsx` — карточки заказов.
* **Files:**
  * `src/screens/client/orders/index.tsx` — grid 1col mobile / 2col tablet / 3col desktop, с pull-to-refresh.
  * `src/widgets/order-card/ui/OrderCard.tsx` — placeName, type badge ("Заказ" / "Сюрприз бокс"), details (count · time), createdAt formatted `ru-RU`, total крупно, status pill (created/paid/picked_up/cancelled), CTA "Pickup-код" (открывает `PickupCodeModal`).
  * Empty state — иконка package + "У вас пока нет заказов" + CTA "К заведениям".
* **Acceptance:**
  * Сортировка newest first.
  * Pull-to-refresh обновляет через React Query invalidation.
  * Status pill цвета: created=#F5F5F5/text-muted, paid=accent (orange), picked_up=success-green, cancelled=destructive-red.
* **Libs:** `@tanstack/react-query` invalidation.

#### [ ] Stage 10 — Profile + Profile edit parity

* **Goal:** Привести Profile + Profile edit к web стилю (хотя web версии нет — следуем визуальной грамматике web_client: cards, типографика, accent элементы).
* **Files:**
  * `src/screens/client/profile/index.tsx` — desktop split (view + edit side-by-side, как уже сделано) → визуально согласовать с дизайном.
  * `src/screens/client/profile-edit/index.tsx` — форма с Inputs (round-pill, secondary bg), gender radio как pill chips, save CTA primary full-width.
  * Профильные секции: "Эко-вклад" (карточка с иконкой), "Поддержка", "Уведомления", "О сервисе", "Выйти" — повторить структуру из Header popover.
* **Acceptance:**
  * Все Inputs пилюли на secondary bg.
  * Радио gender — chip pill (выделенный = primary).
  * Эко-карточка с accent bg + иконкой leaf.
* **Libs:** `react-hook-form`, `zod`.

---

### Iteration 6 — Polish

#### [ ] Stage 11 — SurpriseBox builder parity

* **Goal:** Реплицировать `SurpriseBoxCard` extended visual: 2-col layout (image left / form right), size S/M/L pills, fillings/restrictions/additions chip rows, time select, large CTA с финальной ценой.
* **Files:**
  * `src/widgets/surprise-box-card/ui/SurpriseBoxCard.tsx` — full builder visual.
  * `src/features/surprise-box-builder/model/useSurpriseBoxState.ts` — local form state (size, filling, restriction, addition, time, computed price).
  * Image: `src/shared/assets/surprise-bag.jpg` (скопировать из web_client).
* **Acceptance:**
  * Price multiplier S=1, M=1.5, L=2.
  * CTA отображает "Забронировать за {price} ₽".
  * Mobile: image сверху, форма снизу. Desktop: 2 cols.
* **Libs:** `zustand` (form local) или `useReducer`.

#### [ ] Stage 12 — Empty states, toasts, micro-animations, breakpoints audit

* **Goal:** Финальная косметика: единые empty states, toast стили (через `business-toast` helper или новый `client-toast`), `FadeIn` анимации на route, audit breakpoints.
* **Files:**
  * `src/widgets/empty-state/ui/EmptyState.tsx` — единый компонент (icon + title + description + CTA).
  * `src/shared/lib/client-toast.ts` — обёртка (success/error/info) с цветами темы.
  * Все client screens — `Animated.View` `FadeIn` (Reanimated) на mount.
  * Аудит: запустить `grep` на хардкоженные цвета `#[0-9a-f]{3,6}` в `src/screens/client/`, `src/widgets/`, `src/features/` — заменить на theme tokens.
  * Аудит: запустить `grep` на user-facing strings (RU literal в JSX) — заменить на `t()`.
* **Acceptance:**
  * Нет хардкоженных цветов вне theme.
  * Все строки через i18n.
  * `npx tsc --noEmit` чисто.
  * Playwright web smoke: переход Home → Venue → Booking → Pay стабилен.
* **Libs:** `react-native-reanimated`, `react-i18next`.

---

## 3. Acceptance gates per stage (общие)

1. `npx tsc --noEmit` — без ошибок.
2. FSD layering не нарушен.
3. `code-simplifier` agent на изменённых файлах — без отката.
4. `code-reviewer` agent против `reviewer-checklist.md` — Critical = 0.
5. Playwright web smoke (если Expo Web запущен) — Home →навигация → screen рендерится без ошибок в console.
6. Conventional commit (без AI attribution).

## 4. Sub-agent strategy (Sonnet для экономии)

| Шаг | Агент | Модель | Когда |
|---|---|---|---|
| Маппинг web компонента | `Explore` | Sonnet | начало каждого stage (1 запрос) |
| Имплементация | основной поток | Opus | большая работа |
| code-simplifier | `code-refactoring:code-reviewer` `code-simplifier` | Sonnet | после имплементации |
| code-review | `code-refactoring:code-reviewer` | Sonnet | после simplifier |
| Playwright smoke | основной поток | Opus | в конце stage если web запущен |

## 5. Решения (зафиксировано)

1. **Map**: серый placeholder-image (`MapPlaceholder` widget) в Stage 4. Реальная карта — отдельной задачей вне этого плана.
2. **Inter font**: подключаем через `expo-font` + `useFonts` в Stage 1 (если ещё не подключён). Verify-only если уже есть.
3. **Popover**: `Platform.select` — `Modal` (desktop dropdown) на web + `BottomSheetModal` (`@gorhom/bottom-sheet`) на mobile.
4. **Assets** (cafe-keks/surf/bread.jpg, surprise-bag.jpg, empty-cart.png, logo-hands.png): копируем из `web_client/src/assets/` в `src/shared/assets/client/` в Stage 1 / Stage 4 по необходимости.
5. **Cart store**: текущий держит multi-venue drafts (entities/order Zustand). Расширяем при необходимости в Stage 7, но без слома API.
6. **Orders**: API + React Query (текущая интеграция). localStorage из web — НЕ переносим. Тестовые данные — через существующие mocks в `entities/order/dev/`.

---

## 6. Чек-лист прогресса (rolling)

- [ ] Iteration 1: Foundation
  - [ ] Stage 1 — Theme tokens parity
  - [ ] Stage 2 — Shared atoms parity
- [x] Iteration 2: Layout + Home
  - [x] Stage 3 — Client Header parity
  - [x] Stage 4 — Home screen parity
- [ ] Iteration 3: Catalog flows
  - [ ] Stage 5 — Venue screen parity
  - [ ] Stage 6 — Product details sheet parity
- [ ] Iteration 4: Cart + Booking
  - [ ] Stage 7 — Cart aggregator parity
  - [ ] Stage 8 — Booking + Payment parity
- [ ] Iteration 5: Orders + Profile
  - [ ] Stage 9 — Orders parity
  - [ ] Stage 10 — Profile + edit parity
- [ ] Iteration 6: Polish
  - [ ] Stage 11 — SurpriseBox builder parity
  - [ ] Stage 12 — Empty states / toasts / animations / audit

---

**Готовность к старту:** план собран, требуется подтверждение по открытым вопросам (раздел 5) и согласие приступать к Iteration 1.
