// Client sub-theme — mirrors web_client/src/index.css :root tokens (HSL → hex).
// Used by RN client screens (mobile + web). Visual parity with web_client is the goal.
// Source of truth: web_client/src/index.css :root block (light theme only).

export const clientTokens = {
  colors: {
    // hsl(30 25% 96%)
    background: '#f7f4ef',
    // hsl(0 0% 10%)
    foreground: '#1a1a1a',

    // hsl(0 0% 100%)
    card: '#ffffff',
    cardForeground: '#1a1a1a',

    popover: '#ffffff',
    popoverForeground: '#1a1a1a',

    // hsl(24 95% 55%) — CTA orange (close to existing #fa7201)
    primary: '#fa7b1f',
    primaryForeground: '#ffffff',

    // hsl(0 0% 96%) — input bg / nav pill bg
    secondary: '#f5f5f5',
    secondaryForeground: '#1a1a1a',
    // bg-secondary/40 equivalent — used for product image well, soft chip backgrounds
    secondaryMuted: '#fafafa',
    // hsl(30 15% 75%) — large stepper pill bg in product modal
    stepperLgBg: '#c9bfb6',

    muted: '#f5f5f5',
    // hsl(0 0% 45%)
    mutedForeground: '#737373',

    // hsl(24 100% 95%) — pale orange chip bg
    accent: '#ffe9d6',
    // hsl(24 95% 40%) — chip text on accent bg
    accentForeground: '#cc5800',

    // hsl(0 84% 60%)
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',

    // hsl(0 0% 90%)
    border: '#e6e6e6',
    // hsl(0 0% 92%)
    input: '#ebebeb',
    ring: '#fa7b1f',

    // hsl(38 95% 55%) — rating star
    star: '#f8ac1f',

    // Inline accents from web_client (e.g. green chip on PlaceListItem):
    // hsl(160 60% 90%) / hsl(160 60% 25%)
    chipGreenBg: '#d6f0e3',
    chipGreenFg: '#1a6549',
  },
  shadows: {
    // --shadow-card: 0 2px 12px hsl(0 0% 0% / 0.06)
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 2,
    },
    /** Product tiles (Home / Venue / SurpriseBox grids) — soft Apple-like float; barely visible. */
    productCard: {
      shadowColor: '#1A1512',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.03,
      shadowRadius: 16,
      elevation: 4,
    },
    /** Bottom tab bar — minimal separation from content (as light as practical). */
    tabBar: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.03,
      shadowRadius: 10,
      elevation: 2,
    },
    /** Login / auth card — 0 8px 24px rgba(26, 21, 18, 0.06). */
    authLoginCard: {
      shadowColor: '#1a1512',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.06,
      shadowRadius: 24,
      elevation: 3,
    },
  },
  radius: {
    // --radius: 0.875rem (14px)
    card: 14,
    sm: 8,
    md: 12,
    lg: 14,
    pill: 9999,
    /** Primary CTA in booking bars (e.g. cart footer). */
    bookingCta: 40,
  },
  typography: {
    fontFamily: 'Inter',
  },
} as const;

export type ClientTheme = typeof clientTokens;
