import { businessTokens } from './business';
import { clientTokens } from './client';
import { tokens } from './tokens';

export { tokens } from './tokens';

export const theme = {
  colors: tokens.colors,
  shadows: tokens.shadows,
  typography: tokens.typography,
  spacing: tokens.spacing,
  radius: tokens.radius,
  breakpoints: tokens.breakpoints,
  layout: tokens.layout,
  business: businessTokens,
  client: clientTokens,
} as const;

export type AppTheme = typeof theme;
export {
  clientTextF1Heavy,
  clientTextF3SemiBold1200,
  clientTextF4SemiBold1200,
  clientTextF5SemiBold1200,
  clientTextF2Regular1200,
  clientTextF4Heavy1200,
  clientTextF3Heavy,
  clientTextHomeSectionTitle,
  clientTextF4Heavy,
  clientTextF5Heavy,
  clientTextF6Heavy,
  clientTextF6HeavyDesktop,
  clientTextF6Regular,
  clientTextParagraphBase,
  clientTextParagraphBaseHeavy,
  clientTextSurpriseDesktopHeroTitle,
  clientTextSurpriseDesktopPriceDisplay,
} from './client-text-styles';
export { businessTokens } from './business';
export type { BusinessTheme } from './business';
export { clientTokens } from './client';
export type { ClientTheme } from './client';
