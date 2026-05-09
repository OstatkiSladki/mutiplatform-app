# Iteration 1 — Foundation (Theme tokens + Shared atoms)

> Источник: `client_migration_plan.md` (Iteration 1).
> Цель итерации: подготовить дизайн-фундамент клиентского web→RN переноса.
> Объём: 2 stage, ~20 sub-task. Один commit на stage. TS+simplifier+review+Playwright перед коммитом Stage 2.

## Stage 1 — Theme tokens parity (client sub-theme)

### Goal

Зеркалить `web_client/src/index.css` light-theme HSL-токены в новый `theme.client` под `src/shared/config/theme/client.ts`, по аналогии с уже существующим `theme.business`. Никакие текущие токены не трогаем.

### Решения

* Архитектура: новая ветка `theme.client` (не `theme.colors.client`) — единообразно с `theme.business`. Inset shadows / radius / typography специфичны клиенту.
* Inter font: проверка показала отсутствие `expo-font` / `useFonts`. Stage 1 не подключает шрифт (per user decision "verify only"). Fallback — system; web подхватит Inter из системы / CSS-стека.
* Никаких HSL→hex on-the-fly; все значения зафиксированы в комментах для traceability.

### Sub-tasks

| # | Описание | Файлы |
|---|---|---|
| 1.1 | Создать `client.ts` со структурой `clientTokens` | `src/shared/config/theme/client.ts` |
| 1.2 | Замаунтить `client: clientTokens` в `theme` | `src/shared/config/theme/index.ts` |
| 1.3 | Экспортировать `ClientTheme` тип | `src/shared/config/theme/index.ts` |
| 1.4 | TS gate — `npx tsc --noEmit` | — |

### Spec токенов

```ts
// HSL → hex (light theme only — клиентский режим)
clientTokens = {
  colors: {
    background:        '#f7f4ef',  // hsl(30 25% 96%) — page bg
    foreground:        '#1a1a1a',  // hsl(0 0% 10%)   — text
    card:              '#ffffff',  // hsl(0 0% 100%)
    cardForeground:    '#1a1a1a',  // hsl(0 0% 10%)
    popover:           '#ffffff',
    popoverForeground: '#1a1a1a',
    primary:           '#fa7b1f',  // hsl(24 95% 55%) — CTA orange
    primaryForeground: '#ffffff',
    secondary:         '#f5f5f5',  // hsl(0 0% 96%)   — input bg / nav pill
    secondaryForeground: '#1a1a1a',
    muted:             '#f5f5f5',
    mutedForeground:   '#737373',  // hsl(0 0% 45%)
    accent:            '#ffe9d6',  // hsl(24 100% 95%) — chip bg pale orange
    accentForeground:  '#cc5800',  // hsl(24 95% 40%)  — chip text
    destructive:       '#ef4444',  // hsl(0 84% 60%)
    destructiveForeground: '#ffffff',
    border:            '#e6e6e6',  // hsl(0 0% 90%)
    input:             '#ebebeb',  // hsl(0 0% 92%)
    ring:              '#fa7b1f',
    star:              '#f8ac1f',  // hsl(38 95% 55%)
    chipGreenBg:       '#d6f0e3',  // hsl(160 60% 90%) — inline accent
    chipGreenFg:       '#1a6549',  // hsl(160 60% 25%)
  },
  shadows: {
    card: {              // 0 2px 12px rgba(0,0,0,0.06)
      shadowColor:   '#000000',
      shadowOffset:  { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius:  12,
      elevation:     2,
    },
  },
  radius: {
    card: 14,            // --radius: 0.875rem (web)
    pill: 9999,
    sm: 8,
    md: 12,
    lg: 14,
  },
  typography: {
    fontFamily: 'Inter',  // already in tokens.typography.fontFamilies.inter
  },
}
```

### Acceptance

* `npx tsc --noEmit` clean
* `theme.business`, `theme.colors`, `theme.spacing` не изменены (regression-free)
* В `theme.client.colors` присутствуют все токены, перечисленные в plan §0.1

---

## Stage 2 — Shared atoms parity

### Goal

Расширить базовые атомы в `src/shared/ui/` новыми вариантами для клиентских экранов из web_client, **не ломая** существующих usage. Стратегия по решению user — extend (add new variants alongside existing), не replace.

### Sub-tasks

| # | Атом | Изменение | Файл |
|---|---|---|---|
| 2.1 | Button | Добавить варианты `pill` (h44/h48 на web, radius=full, secondary bg, fg=foreground) и `ghost` (transparent, fg=foreground) и `iconCircle` (44×44, secondary bg, only icon) — без слома существующих primary/secondary/neutral | `src/shared/ui/button/index.tsx` |
| 2.2 | Chip | Добавить prop `variant?: 'default' \| 'accent' \| 'success'`. `accent` → `theme.client.colors.accent` bg + `accentForeground` text. `success` → `chipGreenBg` + `chipGreenFg`. `default` остаётся как есть. | `src/shared/ui/chip/index.tsx` + `styles.ts` |
| 2.3 | Input | Добавить `variant?: 'default' \| 'pill'` + опциональные `leadingIcon` (IconName) и `onClear` (показывает X-кнопку, если value не пуст). `pill` — radius=full, h44, secondary bg, без border. | `src/shared/ui/input/index.tsx` |
| 2.4 | Card | Добавить `padding?: 'none' \| 'sm' \| 'md' \| 'lg'` (16/20/24, default = md). | `src/shared/ui/card/index.tsx` |
| 2.5 | Stars | Уже принимает `size` как number; добавить prop `variant?: 'sm' \| 'md'` (13/16) для удобства. Цвет по умолчанию = `theme.client.colors.star` если есть, иначе текущий fallback. | `src/shared/ui/stars/index.tsx` |
| 2.6 | Avatar | Новый атом 40/44 круг, fallback initials из name, image optional. | `src/shared/ui/avatar/index.tsx` + `styles.ts` |
| 2.7 | Stepper | Добавить `size?: 'sm' \| 'lg'` ('sm' — текущий 28-круглый, 'lg' — большой pill h40, серо-бежевый bg). | `src/shared/ui/stepper/index.tsx` + `styles.ts` |
| 2.8 | Barrel | Экспорт Avatar в `src/shared/ui/index.ts` | `src/shared/ui/index.ts` |

### Hard rules для каждого атома

* StyleSheet.create в соседнем styles.ts, no inline objects
* Все цвета/радиусы/spacing — через `theme` / `theme.client`
* Default behaviour не должен меняться (snapshot-проверка через TS + smoke)
* Без `any`; все props типизированы

### Acceptance (Stage 2)

* `npx tsc --noEmit` clean
* Code-simplifier на изменённых файлах не откатывает
* code-reviewer: Critical = 0
* Playwright smoke: `/` (Expo Web `:8081`) рендерится без console.error/warn
* Conventional commit без AI-attribution
* Существующие screens / widgets, использующие Button/Card/Chip/Input/Stars/Stepper, продолжают работать (TS gate их покрывает)

---

## Прогресс

- [x] Phase 0 — context + decisions
- [ ] Stage 1 — theme.client tokens
  - [ ] 1.1 client.ts
  - [ ] 1.2 mount in theme
  - [ ] 1.3 export type
  - [ ] 1.4 TS gate
  - [ ] 1.5 commit
- [ ] Stage 2 — atoms parity
  - [ ] 2.1 Button variants
  - [ ] 2.2 Chip variants
  - [ ] 2.3 Input pill + leading/clear
  - [ ] 2.4 Card padding preset
  - [ ] 2.5 Stars variant
  - [ ] 2.6 Avatar atom
  - [ ] 2.7 Stepper size variants
  - [ ] 2.8 barrel export
  - [ ] 2.9 TS gate
  - [ ] 2.10 simplifier
  - [ ] 2.11 review
  - [ ] 2.12 Playwright smoke
  - [ ] 2.13 commit
