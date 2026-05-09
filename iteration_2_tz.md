# Iteration 2 TZ — Layout + Home (Stages 3 + 4)

> Декомпозиция Stage 3 (Client Header) + Stage 4 (Home screen) из `client_migration_plan.md`. Каждый sub-stage — отдельный коммит с TS gate → simplifier → review.

## Цель итерации

Привести шапку (web/desktop + mobile) и главный экран `client/home` к визуальному паритету с `web_client/src/components/Header.tsx` + `web_client/src/pages/Index.tsx`. Бизнес-логика (React Query, Zustand cart, navigation) сохраняется как есть.

## Условия (зафиксированы)

* **Источник истины:** `web_client/src/components/Header.tsx`, `web_client/src/pages/Index.tsx`, `web_client/src/components/{EstablishmentCard,PlaceListItem,SurpriseBoxCard,MapPlaceholder}.tsx`.
* **Дизайн-токены:** `theme.client.*` (готовы из Stage 1) + `theme.colors/spacing/typography` (общие).
* **Атомы:** Button (pill, iconCircle, ghost — готовы), Input (pill — готов), Avatar (готов), Chip (accent — готов), Card (готов), Stars (готов), MapPlaceholder (готов).
* **Шрифт:** Inter (token уже есть, system fallback на mobile до интеграции expo-font).
* **i18n:** namespace `catalog` + `common`; новые ключи добавляются в существующие словари (без переименования).
* **Без ломки API навигации:** `ClientStackParamList` + `ClientTabsParamList` без изменений.
* **FSD:** strict — никаких новых верхних слоёв.

## Sub-stages

### Stage 3a — Assets pipeline

* **Goal:** Перенести фото и логотип из `web_client/src/assets/` в `src/shared/assets/client/` для использования в Header (логотип) и VenueCard (cover-фото).
* **Files:**
  * `src/shared/assets/client/logo-hands.png` (копия из web_client)
  * `src/shared/assets/client/cafe-keks.jpg`
  * `src/shared/assets/client/cafe-surf.jpg`
  * `src/shared/assets/client/cafe-bread.jpg`
  * `src/shared/assets/client/surprise-bag.jpg`
  * `src/shared/assets/client/empty-cart.png`
  * `src/shared/assets/client/index.ts` — статичные require'ы для каждого asset (typed export).
* **Acceptance:** Файлы скопированы (`cp`); index.ts экспортирует через `require(...)`; `npx tsc --noEmit` чистый.

### Stage 3b — Popover atom (cross-platform)

* **Goal:** Кросс-платформенный `Popover` для Header avatar menu. Web ≥ md → абсолютное позиционирование под якорем; mobile / native → bottom sheet (gorhom).
* **Files:**
  * `src/shared/ui/popover/Popover.tsx` — компонент с props `{ trigger, children, align?, width? }`.
  * `src/shared/ui/popover/styles.ts`
  * `src/shared/ui/popover/index.ts`
* **Acceptance:**
  * Web: открывается dropdown справа от триггера, закрывается на outside-click.
  * Native: `BottomSheetModal` (`@gorhom/bottom-sheet`).
  * Возвращает `close()` через render-prop children.
  * Только токены темы.

### Stage 3c — ClientWebHeader (desktop) parity

* **Goal:** Реплицировать `web_client/src/components/Header.tsx`: логотип-png + brand text, search pill (центр, max-width 576), location pill (правый блок), cart icon-circle, avatar popover c menu.
* **Files:**
  * `src/widgets/web-header/ui/WebHeader.tsx` — заменить tab-bar реализацию на новую шапку (фиксированную, БЕЗ tab navigation внутри — табы остаются в `ClientDesktopHeader`, либо удалить теперь — см. ниже).
  * `src/widgets/web-header/ui/styles.ts` — обновить.
  * `src/widgets/client-desktop-header/` — удалить, если не используется (либо переименовать в новый header).
  * `src/navigation/client-tabs.tsx` — оставить как есть; web header теперь sticky выше табов; tab-bar на web рендерится отдельно ниже либо удаляется.
  * **Solution:** Сохранить `WebHeader` как `tabBar` для tab navigator — он рисует **И** новую шапку (логотип + search + location + cart + avatar) **И** ряд навигационных табов под ней.
* **Acceptance:**
  * Layout: max-width 1280, padding 24, height 76 (py-4 + 44px controls).
  * Search pill: `Input variant="pill"` с `leadingIcon="search"`, placeholder "search".
  * Location pill: `Button variant="pill"` с `icon="map-pin"` (иконка primary цветом).
  * Cart: `Button variant="iconCircle" icon="shopping-bag"` + badge.
  * Avatar: `Avatar size="md"` внутри `Popover`.
  * Popover content: header (avatar + name + Settings link) + меню (orders, support, notifications, about, logout).
  * Все строки через i18n.
* **Libs:** `expo-image` (для logo png), `react-native` Pressable.

### Stage 3d — Mobile AppHeader redesign

* **Goal:** Привести мобильную шапку к компактному виду: logo + brand + cart + avatar (одной строкой), плюс отдельная строка с search pill ниже.
* **Files:**
  * `src/widgets/header/index.tsx` — переделать; сохранить публичный API `AppHeaderProps`, добавить опц. props `searchValue?`, `onSearchChange?`, `showSearch?`, `showAvatar?`.
  * `src/widgets/header/styles.ts`
* **Acceptance:**
  * Высота top-row: 56 (logo 32 + padding).
  * Search pill (если `showSearch`) — отдельная строка под top-row, padding 16/12.
  * Cart icon — `iconCircle` 40×40.
  * Avatar — `Avatar size="sm"` (40×40).
  * Старые consumers (которые не передают новые props) — не ломаются.
* **Libs:** `expo-image`.

### Stage 4a — i18n keys for header/profile menu

* **Goal:** Расширить `common.ts` ключами для шапки и menu popover. Расширить `catalog.ts` уже сделано в Stage 1 (sectionNearby/Establishments/SurpriseBoxes).
* **Files:**
  * `src/shared/i18n/locales/ru/common.ts` — добавить:
    * `header.searchPlaceholder` = "Поиск заведений"
    * `header.locationDefault` = "ул. Текучева 140"
    * `header.profileA11y` = "Профиль"
    * `header.menu.orders` = "История заказов"
    * `header.menu.support` = "Поддержка"
    * `header.menu.notifications` = "Уведомления"
    * `header.menu.about` = "О сервисе"
    * `header.menu.logout` = "Выйти из аккаунта"
    * `header.menu.settingsLink` = "Настройки"
* **Acceptance:** TS компилирует; нет hardcoded RU строк в JSX.

### Stage 4b — VenueListItem visual rewrite

* **Goal:** Реплицировать `web_client/src/components/PlaceListItem.tsx`: логотип-плейсхолдер 56×56 (цветной фон + white text по первой букве/инициалам), название 15px / 600, адрес 12px muted, hours pill справа, Stars + accent chips снизу.
* **Files:**
  * `src/widgets/venue-list-item/ui/VenueListItem.tsx` — переделать layout.
  * `src/widgets/venue-list-item/ui/styles.ts` — обновить.
* **Acceptance:**
  * Логотип: 56×56, `theme.client.radius.md`, deterministic color via hash от `venue.name` (заранее заданная палитра 4-5 цветов).
  * Address truncate.
  * Hours: `Icon clock` + `venue.working_hours_today` (если есть; fallback `'07:00–22:00'`).
  * Tags: чипы `Chip variant="accent"` (можно показывать категорию/cuisine, fallback из `t('venueTagDefault')`).
  * Tappable, `onPress(venueId)`.
* **Libs:** —

### Stage 4c — VenueCard visual rewrite (cover image)

* **Goal:** Реплицировать `web_client/src/components/EstablishmentCard.tsx`: фикс. ширина 230, image cover 230×128 (одна из cafe-*.jpg по hash от venue.id), name 14px/600, single-line tags 11px muted, нижний ряд: ★rating + footprints distance + clock hours.
* **Files:**
  * `src/widgets/venue-card/ui/VenueCard.tsx`
  * `src/widgets/venue-card/ui/styles.ts`
* **Acceptance:**
  * Cover: `expo-image` с одним из 3-х cafe фото (детерминированно по venue.id mod 3) + fallback (gradient с буквой если фото нет).
  * Width fixed 230 desktop & mobile (carousel scroll).
  * Rating star: `theme.client.colors.star`.
  * Tags single line truncate.
* **Libs:** `expo-image`.

### Stage 4d — SurpriseBoxCard Home preview variant

* **Goal:** Реплицировать визуал `web_client/src/components/SurpriseBoxCard.tsx`: логотип 48×48 + name + address + hours; Stars + accent chips; 2-col body (image left / form right); CTA "Забронировать за {price} ₽".
* **Files:**
  * `src/widgets/surprise-box-card/ui/SurpriseBoxCard.tsx` — переделать визуал, сохранить bindings к `useSurpriseBoxBuilder` + cart store.
  * `src/widgets/surprise-box-card/ui/styles.ts` — обновить.
* **Acceptance:**
  * Image: `client/surprise-bag.jpg`, square 1:1, ratio left col.
  * Form right col: размер pills (S/M/L) + filling/restriction/addition chips (Chip с active state) + time select (`Button variant="pill"` или native Picker).
  * CTA: `Button variant="primary"` full-width c arrow-right icon.
  * На mobile (< md): image сверху, форма снизу (stack).
  * На desktop (≥ md): 2 cols (image left fixed, form right flex).
* **Libs:** `expo-image`.

### Stage 4e — HomeScreen layout polish

* **Goal:** Привести `HomeScreen` + `sections/*` к точным spacing/padding/max-width web версии. Фон bg `theme.client.colors.background`. Контейнер max-width 1280, py-24 (RN: 24), gap 40 между секциями. Section title: 20px / 700.
* **Files:**
  * `src/screens/client/home/ui/HomeScreen.tsx` — фон + container width.
  * `src/screens/client/home/ui/styles.ts` — обновить spacing.
  * `src/screens/client/home/ui/sections/NearbyVenuesSection.tsx` — обернуть карту + список в карточку (Card variant="elevated" padding="sm" с border) как в web (rounded-2xl border bg-card).
  * `src/screens/client/home/ui/sections/EstablishmentsSection.tsx` — добавить chevron-right floating button справа (web показывает arrow next).
  * `src/screens/client/home/ui/sections/SurpriseBoxesSection.tsx` — без значимых изменений (визуал карточки уже в Stage 4d).
* **Acceptance:**
  * Background — `theme.client.colors.background` (#F7F4EF).
  * Section gap = 40 (theme.spacing[8]).
  * Section title font/weight совпадает с web (`text-xl font-bold` ≈ 20/700).
  * NearbyVenues — единая карточка (карта + scroll-list внутри); на mobile — стек, на desktop — 2 col grid.
  * Establishments — горизонтальный carousel + chevron-right.
* **Libs:** —

## Acceptance gate итерации (после Stage 4e)

1. `npx tsc --noEmit` — 0 ошибок.
2. FSD layering — без нарушений.
3. Reviewer (Sonnet) — Critical = 0.
4. Visual: на Expo Web / web bundle Home выглядит как `web_client` (если Expo Web запущен — Playwright smoke).
5. Mobile (390 width) — стек секций без overflow, search и cart доступны, padding безопасной зоны.
6. Все строки через `t()`. Нет hardcoded цветов вне `theme.client.*` / `theme.colors.*`.

## Открытые вопросы

* **Q1.** Expo Web запущен? (нужно для Playwright gate)
* **Q2.** Меню профиля popover: элементы (orders / support / notifications / about / logout) — wired или заглушки-toast?
* **Q3.** Логотип в шапке — png из web_client (`logo-hands.png`) — переносим как есть, или используем существующий brand text?
* **Q4.** Cover-фото в `VenueCard`: брать одно из 3-х cafe-*.jpg детерминированно (хэш id) или оставить букву на цветном фоне как fallback?
* **Q5.** Location pill в шапке — статичный текст из i18n (`header.locationDefault`) или подцеплять реальную локацию через `useUserLocation`?
