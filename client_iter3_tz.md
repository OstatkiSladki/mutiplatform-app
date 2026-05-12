# Iteration 3 — Catalog Flows: Sub-task TZ

> Parent plan: `client_migration_plan.md` Iteration 3 (Stage 5 + Stage 6).
> Strategy: Stage 5 → checkpoint → Stage 6. Per-substage TS gate, simplifier, review.
> Web reference: `web_client/src/pages/Place.tsx`, `web_client/src/components/ProductModal.tsx`.

---

## Stage 5 — Venue / Place screen parity

### Sub-task 5.1 — Asset import + theme additions

**Goal:** copy `empty-cart.png` from web_client into shared assets; add any missing theme tokens spotted during web parity.

**Files to create/modify:**
- `src/shared/assets/client/empty-cart.png` — copy of `web_client/src/assets/empty-cart.png`
- `src/shared/assets/client/index.ts` — barrel export `emptyCartImage = require('./empty-cart.png')`
- `src/shared/config/theme/client.ts` — verify tokens present: `secondary` (#F5F5F5), `border` (#E6E6E6); add `secondary40` (rgba bg used in OfferCard image well) if missing
- `src/shared/i18n/locales/ru/catalog.ts` — add keys: `venue.cart.title`, `venue.cart.empty`, `venue.cart.itemCount` (plural via `count`), `venue.cart.total`, `venue.cart.checkout`, `venue.products.weightGrams`, `venue.products.outOfStock`

**Acceptance:**
- TS compiles
- Asset `require` works in `<Image>` on RN-Web
- All new strings reachable through `useTranslation('catalog')`

**Libraries:** none new

---

### Sub-task 5.2 — VenueHeaderCard widget (web parity)

**Goal:** reproduce Place.tsx header (rounded card, logo placeholder 96px, name, address, stars+rating, category chips, hours bar with clock icon).

**Files to create/modify:**
- `src/widgets/venue-header-card/ui/VenueHeaderCard.tsx` — new
- `src/widgets/venue-header-card/ui/styles.ts`
- `src/widgets/venue-header-card/index.ts`
- `src/screens/client/venue/ui/VenueHeader.tsx` — DELETE (replaced) OR thin re-export wrapper kept for backward compat

**Visual spec (from Place.tsx ~lines 60–110):**
- Card: `theme.client.colors.card` bg, `theme.client.radius.card`, border `theme.client.colors.border`, shadow `theme.client.shadows.card`, padding 24 mobile / 32 desktop
- Layout: row with logo (96×96 rounded-2xl secondary bg + initial letter primary color, font 36 bold) + body column gap 8
- Body: name (text 22 / 28 bold), address (text 14 mutedForeground), row(Stars size=16 + rating value bold + `·` + reviewCount mutedForeground), chips row gap 6 (Chip variant `accent` for tags), hours row (clock icon 16 + hours text 14)

**Acceptance:**
- Visual diff vs Place.tsx header card on web (Expo Web inspection — manual)
- Mobile (390): logo and body stack-OK; copy uses `theme.client` only
- No `any`, all strings via i18n

**Libraries:** `@expo/vector-icons` Feather (clock)

---

### Sub-task 5.3 — OfferCard redesign (web parity)

**Goal:** replace current OfferCard layout with web design — image well 1:1 secondary/40 bg, name 2 lines, weight, footer row(stepper at left, price + arrow-up-right CTA at right).

**Files to create/modify:**
- `src/widgets/product-grid/ui/OfferCard.tsx` — refactor JSX + styles
- `src/widgets/product-grid/ui/styles.ts` — restyle

**Visual spec (Place.tsx grid item ~lines 130–200):**
- Card: rounded-2xl (`theme.client.radius.card`), border `theme.client.colors.border`, padding 12, gap 8, bg `theme.client.colors.card`
- Image well: aspect 1:1, bg `theme.client.colors.secondary` with 40% opacity OR token `secondary40`, rounded-xl, centered icon/img, tap → `onPressDetails`
- Body: name (font 14 leading-tight, 2 lines clamp via `numberOfLines={2}`, min height ~36), weight meta (font 12 mutedForeground)
- Footer row: left = stepper compact (size sm 28px round, secondary bg, value middle); right = column with price (font 16 bold) + arrow-up-right circle button (32px primary bg, primaryForeground icon)
- When quantity 0: stepper shows just `+` button (primary bg) instead of full stepper
- onPressDetails fires on image tap, NOT entire card

**Acceptance:**
- Grid 4 cols xl, 3 lg, 2 md, 2 mobile (web spec is 2 mobile / 3 md / 4 xl — adjust resolveColumns)
- Stepper integrates with cart store (existing addItem / setQuantity)
- Tap arrow-up-right → adds 1 to cart (delegates to existing add path)
- Tap image well → opens ProductDetailsSheet

**Libraries:** Feather (`plus`, `arrow-up-right`)

---

### Sub-task 5.4 — VenueScreen layout: desktop 1fr+320px grid

**Goal:** introduce desktop split layout. On `>=lg`, render two-column: products column (1fr) + sticky cart sidebar (320px). On mobile/tablet — stacked, cart stays as bottom panel.

**Files to create/modify:**
- `src/screens/client/venue/ui/VenueScreen.tsx` — restructure layout
- `src/screens/client/venue/ui/styles.ts` — add desktop grid styles, `position: 'sticky'` for sidebar (web only via `Platform.select`)

**Layout:**
```
Desktop (>=lg, 1024+):
[ ClientDesktopHeader                                            ]
[ Back button                                                    ]
[ VenueHeaderCard (full width, max 1280, mx auto)                ]
[ Section title "Меню"            ]  [ CartSidebar             ]
[ ProductGrid (1fr)               ]  [ - sticky top 24         ]
[                                 ]  [ - 320px width           ]

Mobile (<lg):
[ Back button ]
[ VenueHeaderCard ]
[ Section title ]
[ ProductGrid (2 cols) ]
[ CartSummary (sticky bottom panel) ]
```

**Acceptance:**
- `useResponsive()` / `useBreakpoint()` returns `>=lg` → two-col layout
- Sidebar uses `position: 'sticky'` only on web (`Platform.OS === 'web'`); on native > md fallback to inline column
- ScrollView outer for products column; sidebar in static container
- Page max-width 1280px, centered, paddingHorizontal 24

**Libraries:** none

---

### Sub-task 5.5 — CartSummary: desktop sidebar variant + empty state

**Goal:** extend `CartSummary` to render TWO visual modes — `mode='sidebar'` (desktop, full panel with header + items list + total + CTA + empty state) and `mode='dock'` (mobile, current sticky bottom panel).

**Files to create/modify:**
- `src/widgets/cart-summary/ui/CartSummary.tsx` — accept `mode` prop ('sidebar' | 'dock'), default by breakpoint via internal hook
- `src/widgets/cart-summary/ui/CartSidebar.tsx` — new sub-component (or inline section) for sidebar variant
- `src/widgets/cart-summary/ui/CartDock.tsx` — extract current dock UI
- `src/widgets/cart-summary/ui/EmptyCart.tsx` — new (image from `client/empty-cart.png`, 160px, centered, muted text "В вашей корзине пока пусто", CTA optional)
- `src/widgets/cart-summary/ui/styles.ts`

**Sidebar visual spec (Place.tsx CartSidebar ~lines 220–280):**
- Card: white bg, border, radius 14, shadow, padding 16, gap 12
- Header: text 18 bold "Корзина" + small mutedForeground item count
- Items list (when count > 0): each item — row(image 40×40 secondary bg + name+price col + quantity stepper compact)
- Border-t before total
- Total row: "Итого" mutedForeground + amount bold 18
- Button "Забронировать" full-width h=44 primary, font weight 600
- Empty state (when count === 0): centered EmptyCart, no button (or muted "Выберите блюда")

**Mobile dock unchanged behaviorally** but ensure visual tokens `theme.client.*` not `neutral.*`.

**Acceptance:**
- VenueScreen passes `mode='sidebar'` on desktop, `mode='dock'` on mobile
- Empty state shows image when zero items
- Stepper inside sidebar item row is small (sm)
- `selectVenueItemCount`/`selectVenueTotal` selectors used (no raw store reads in component)

**Libraries:** none

---

### Sub-task 5.6 — i18n + acceptance pass

**Goal:** strip RU literals, ensure responsive grid, run gates.

**Files to modify:**
- VenueScreen, VenueHeaderCard, OfferCard, CartSummary subfiles — replace literals with `t()`
- `src/shared/i18n/locales/ru/catalog.ts` — confirm keys

**Acceptance:**
- `npx tsc --noEmit` clean
- Grep `src/screens/client/venue` and `src/widgets/{venue-header-card,product-grid,cart-summary}` for hex literals — none outside theme imports
- Grep for raw RU text in JSX — none
- code-reviewer: 0 Critical
- Commit: `feat(client-venue): web parity for venue + cart sidebar`

---

## Stage 6 — Product details sheet parity

### Sub-task 6.1 — Library + sheet host setup

**Goal:** ensure `@gorhom/bottom-sheet` v5 + `BottomSheetModalProvider` wired at root. If already wired, verify; if not, add.

**Files to modify (verify first):**
- `src/app/AppEntry.tsx` — wrap with `BottomSheetModalProvider` if missing
- `package.json` — confirm `@gorhom/bottom-sheet` ^5

**Acceptance:**
- App boots with provider
- TS clean

**Libraries:** `@gorhom/bottom-sheet` (context7 fetch v5 BottomSheetModal API)

---

### Sub-task 6.2 — ProductDetailsBody redesign (web parity)

**Goal:** match `ProductModal.tsx` body — 2-col on md+ (image left, details right), 1-col stack on mobile, with large title, weight, price, large pill stepper, full-width CTA, ingredients text, nutrition 4-col grid.

**Files to modify:**
- `src/features/product-details/ui/ProductDetailsBody.tsx` — restructure
- `src/features/product-details/ui/styles.ts` — restyle
- `src/features/product-details/ui/NutritionGrid.tsx` — new (4 cells: kcal/protein/fat/carb), only render if data present

**Visual spec:**
- Container: gap 24, padding 24 mobile / 48 desktop
- Md+ layout: `flexDirection: 'row'`, columns 1:1, gap 32, alignItems center
- Image well: aspect 1:1 max 480px, secondary bg radius lg, image contain centered
- Title: font 28 / 32 bold
- Weight: font 14 mutedForeground (e.g. "350 г")
- Description: font 14 mutedForeground, line-height 1.4
- Price: font 28 bold
- Stepper: lg pill h=40, secondary bg (`hsl(30 15% 75%)` per plan — add token `theme.client.colors.stepperLg` or use existing secondary)
- CTA: full-width primary h=44, label `t('catalog:venue.products.addToCart', { price })`
- NutritionGrid: 4 cols, each cell = label small muted + value bold

**Acceptance:**
- Md+ shows two columns, mobile single column
- Stepper integration with cart store unchanged
- All text via i18n
- TS clean

**Libraries:** none new

---

### Sub-task 6.3 — Sheet host: BottomSheetModal mobile / Modal web

**Goal:** ProductDetailsSheet on mobile uses `BottomSheetModal` (gorhom) with snap point ['90%'], header drag indicator. On web/desktop uses existing `Modal` overlay; on mobile-web (<md) prefer Modal too (gorhom shaky in RN-Web).

**Files to modify:**
- `src/features/product-details/ui/ProductDetailsSheet.tsx` — replace navigation-based mobile path with inline `BottomSheetModal` for native; keep `ProductDetailsModal` for web
- `src/features/product-details/ui/ProductDetailsModal.tsx` — verify existing modal styling matches Place.tsx modal (max-w-5xl, p-12, rounded-3xl, backdrop blur)
- `src/screens/client/product-details/index.tsx` — keep as fallback route for deep links; ensure layout matches Body design

**Behavior:**
- On native: ref.present() opens BottomSheetModal at 90%, dismiss via gesture or backdrop
- On web: ref.present() opens Modal (centered, max-width 1024px, padding 48)
- Both render `<ProductDetailsBody>` inside

**Acceptance:**
- Native: BottomSheetModal opens, drag down dismisses, content scrollable inside
- Web: Modal centered, ESC closes (existing `Popover`/`Modal` impl), backdrop click closes
- TS clean

**Libraries:** `@gorhom/bottom-sheet` v5 (BottomSheetModal, BottomSheetView, BottomSheetBackdrop)

---

### Sub-task 6.4 — Acceptance + commit

**Goal:** final gates for Stage 6.

- `npx tsc --noEmit` clean
- Grep for hex / raw RU text in modified product-details files — none
- code-reviewer: 0 Critical
- Manual: tap Image in OfferCard → sheet opens with correct product data; stepper modifies cart store (verify via CartSummary update)
- Commit: `feat(client-venue): product details sheet parity`

---

## Acceptance gates per stage (recap)

1. `npx tsc --noEmit` — clean
2. FSD layering preserved (no upward imports)
3. code-simplifier on changed files — kept if TS still passes
4. code-reviewer agent vs `reviewer-checklist.md` — Critical = 0
5. Playwright SKIPPED (Expo Web not running)
6. Conventional commit, no AI attribution
