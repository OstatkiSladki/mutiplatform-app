# Iter TZ — Guest Browse + Auth Gate Screens

## Цель

Разрешить неавторизованному пользователю просматривать каталог (Home, Venue, ProductDetails). При попытке зайти в Cart / Orders / Profile / Booking — показывать красивый адаптивный экран «Требуется авторизация» с кнопками «Войти» и «Регистрация», ведущими в auth-flow.

## User flow (целевой)

1. Гость открывает приложение → Home (каталог), может смотреть заведения, продукты, surprise-boxes, открывать Venue/ProductDetails.
2. Гость может класть товары в локальную корзину (cart-store работает локально).
3. Гость нажимает таб Cart / Orders / Profile или кнопку Checkout → видит `AuthRequiredScreen`.
4. Гость жмёт «Войти» / «Регистрация» → открывается модальный auth-stack поверх каталога.
5. После успешного логина/регистрации — модалка закрывается, юзер возвращается туда, откуда пришёл; `isAuthenticated=true`, защищённые экраны теперь видны.
6. Staff/admin: путь без изменений (сразу `BusinessStack`).

## Архитектурные решения

- `Auth` остаётся отдельным sub-stack'ом, но регистрируется как **sibling** к `Client` в `RootNavigator`, с `presentation: 'modal'`.
- `ClientStack` всегда смонтирован для guest и client. Никаких условных переключений между Auth↔Client при `isAuthenticated` — auth просто открывается/закрывается как модалка.
- `BusinessStack` показывается только когда юзер authed && staff (или DEV-флаг).
- Новый виджет `widgets/auth-required` — переиспользуемый, принимает опциональные `title`/`description` оверрайды.
- Защищённые экраны делают early-return на guest — без редиректа, без дополнительных эффектов.

## Этапы

### Stage 1 — Restructure RootNavigator + auth bugfix

**Goal:** Guest получает `ClientStack`. Auth — модалка поверх. `clearAuth` правильно сбрасывает флаг.

**Files:**
- `src/entities/auth/model/store.ts` — fix `clearAuth`: `isAuthenticated: false` (было `true` — баг)
- `src/navigation/root-navigator.tsx` — реструктура: guests/clients → ClientStack + Auth-modal, staff → BusinessStack
- `src/screens/auth/login/index.tsx` — после успеха `navigation.getParent()?.goBack()` если можем (т.е. модалка)
- `src/screens/auth/register/index.tsx` — то же

**Acceptance:**
- TypeScript компилируется без ошибок
- `__DEV__ && DEV_FORCE_BUSINESS` работает по-прежнему
- Гость не видит Login screen на старте — видит Home
- После логина модалка Auth закрывается, без ошибок навигации
- FSD не нарушен

**Libraries:** @react-navigation/native-stack, zustand

---

### Stage 2 — `widgets/auth-required` + i18n

**Goal:** Красивый адаптивный экран-заглушка с центрованной композицией: иконка профиля в круге, заголовок, описание, две кнопки.

**Files:**
- `src/widgets/auth-required/index.tsx` — компонент `AuthRequiredScreen`
- `src/widgets/auth-required/styles.ts`
- `src/widgets/index.ts` — re-export
- `src/shared/i18n/locales/ru/auth.ts` — добавить `gate: { title, description, login, register }`

**Дизайн:**
- Центр экрана, max-width 480 на desktop
- Круглый icon-bg (primary[10] fill) ~96px с иконкой `user` 40px primary[100]
- Заголовок 700, neutral[1]
- Описание neutral[3], lineHeight loose
- Primary `Button` "Войти" (full-width до max-width), secondary вариант "Регистрация" (outline) под ним
- Использовать только theme tokens

**Поведение:**
- Primary tap → `navigation.navigate('Auth', { screen: 'Login' })` (через root parent)
- Secondary tap → `navigation.navigate('Auth', { screen: 'Register' })`

**Acceptance:**
- TS no errors
- Рендерится на mobile+desktop
- Нет хардкод цветов/размеров
- Использует Button из shared/ui с поддержкой variant

**Libraries:** @react-navigation/native (typed parent nav)

---

### Stage 3 — Gate Cart / Orders / Profile / Booking

**Goal:** Когда `!isAuthenticated`, защищённые экраны рендерят `AuthRequiredScreen` вместо контента.

**Files:**
- `src/screens/client/cart/index.tsx`
- `src/screens/client/orders/index.tsx`
- `src/screens/client/profile/index.tsx`
- `src/screens/client/booking/ui/BookingScreen.tsx`

**Acceptance:**
- Guest → таб Cart показывает `AuthRequiredScreen`
- Guest → таб Orders → `AuthRequiredScreen` (без вызова `useOrders` API)
- Guest → таб Profile → `AuthRequiredScreen`
- Guest → Booking screen → `AuthRequiredScreen`
- Authed user — поведение не меняется
- Cart icon в Header ведёт в Cart tab — там и показывается gate (UX согласован)
- TS no errors

**Libraries:** ничего нового

---

## Out of scope

- Не делаем gate на add-to-cart (cart-store локальный, гость может наполнять корзину как в Я.Еде)
- Не вводим Button `variant="outline"` если его ещё нет — использовать существующий API; если нет варианта secondary, делаем второй кнопкой через стиль или обычным TouchableOpacity-ссылкой
- Не трогаем business-stack
- Не трогаем DEV_FORCE_BUSINESS флаг
