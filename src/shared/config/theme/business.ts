// Business sub-theme — mirrors web_business/src/index.css design tokens (HSL → hex).
// Used only by the business stack on RN-Web (≥md). Native phones never render these.
// Source of truth: web_business/src/index.css :root block.

export const businessTokens = {
  colors: {
    background: '#ffffff',
    foreground: '#171c26',
    surface: '#ffffff',
    surfaceForeground: '#171c26',
    card: '#ffffff',
    cardForeground: '#171c26',
    popover: '#ffffff',
    popoverForeground: '#171c26',

    primary: '#fa591e',
    primaryForeground: '#ffffff',
    primaryGlow: '#ff843d',

    secondary: '#f1eae4',
    secondaryForeground: '#171c26',

    muted: '#f4f0ec',
    mutedForeground: '#676f7e',

    accent: '#fa591e',
    accentForeground: '#ffffff',

    destructive: '#ef4343',
    destructiveForeground: '#ffffff',

    border: '#e7e0da',
    input: '#e7e0da',
    ring: '#fa591e',

    sidebar: {
      background: '#e4ddd8',
      foreground: '#222a39',
      primary: '#fa591e',
      primaryForeground: '#ffffff',
      accent: '#ffffff',
      accentForeground: '#fa591e',
      border: '#d4c9bd',
      ring: '#fa591e',
    },

    status: {
      pending: { bg: '#ffecd6', fg: '#b8520a' },
      confirmed: { bg: '#ffecd6', fg: '#b8520a' },
      done: { bg: '#cdf4dd', fg: '#1d7247' },
      cancelled: { bg: '#fce4e4', fg: '#b62020' },
      high: { bg: '#ffe0e6', fg: '#c91d39' },
      mid: { bg: '#fff3c2', fg: '#a16512' },
      low: { bg: '#cdf4dd', fg: '#1d7247' },
      draft: { bg: '#f5f5f5', fg: '#505662' },
    },
  },
  gradients: {
    primary: ['#fa591e', '#ff843d'] as const,
    bar: ['#fa591e', '#ffae80'] as const,
  },
  shadows: {
    card: {
      shadowColor: '#1f2937',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 30,
      elevation: 6,
    },
    soft: {
      shadowColor: '#1f2937',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 2,
    },
    glow: {
      shadowColor: '#fa591e',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.45,
      shadowRadius: 30,
      elevation: 8,
    },
  },
  radius: {
    none: 0,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    card: 24,
    pill: 9999,
  },
  spacing: {
    sidebarWidth: 260,
    contentPaddingX: 32,
    contentPaddingBottom: 40,
    topbarHeight: 96,
  },
  typography: {
    fontFamily: 'Inter',
    letterSpacing: { tight: -0.5, wide: 0.4, normal: 0 },
    title: { fontSize: 42, fontWeight: '700' as const, letterSpacing: -0.5 },
    subtitle: { fontSize: 14, fontWeight: '400' as const },
    h2: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
    h3: { fontSize: 20, fontWeight: '700' as const },
    body: { fontSize: 14, fontWeight: '400' as const, lineHeight: 22 },
    label: { fontSize: 12, fontWeight: '500' as const },
    pill: { fontSize: 12, fontWeight: '500' as const },
    button: { fontSize: 15, fontWeight: '600' as const },
    footnote: { fontSize: 12, fontWeight: '400' as const },
  },
} as const;

export type BusinessTheme = typeof businessTokens;
