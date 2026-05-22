import type { TextStyle } from 'react-native';
import { tokens } from './tokens';

/**
 * Client typography aliases aligned with design tokens (F1/F4/F6, Paragraph Base).
 * Source Sans Pro via expo-google-fonts (registered family names).
 * Imports `./tokens` only (no `./index`) to avoid require cycles with `theme`.
 */
const familyRegular = tokens.typography.fontFamilies.sourceSansProRegular;
const familyBold = tokens.typography.fontFamilies.sourceSansProBold;
const tight = tokens.typography.lineHeights.tight as number;

function lh(fontSize: number): number {
  return Math.round(fontSize * tight);
}

const lh120 = (fontSize: number) =>
  Math.round(fontSize * (tokens.typography.lineHeights.normal as number));

const familySemiBold = tokens.typography.fontFamilies.sourceSansProSemiBold;

/** F3 SemiBold @≥1200px — venue section titles (32px, line-height 24px). */
export const clientTextF3SemiBold1200: TextStyle = {
  fontFamily: familySemiBold,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[13],
  lineHeight: 24,
  color: tokens.colors.neutral[1],
};

/** F4 SemiBold @≥1200px — venue name (28px, line-height 24px). */
export const clientTextF4SemiBold1200: TextStyle = {
  fontFamily: familySemiBold,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[12],
  lineHeight: 24,
  color: tokens.colors.neutral[1],
};

/** F5 SemiBold @≥1200px — product card title (22px, line-height 24px). */
export const clientTextF5SemiBold1200: TextStyle = {
  fontFamily: familySemiBold,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[9],
  lineHeight: 24,
  color: tokens.colors.neutral[1],
};

/** F3 Heavy — web section titles @≥1200px (32px, line-height 120%). */
export const clientTextF3Heavy: TextStyle = {
  fontFamily: familyBold,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[13],
  lineHeight: lh120(tokens.typography.fontSizes[13]),
  color: tokens.colors.neutral[1],
};

/** Web home — заголовки секций (32px SemiBold, line-height 120%). */
export const clientTextHomeSectionTitle: TextStyle = {
  fontFamily: tokens.typography.fontFamilies.sourceSansProSemiBold,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[13],
  lineHeight: lh120(tokens.typography.fontSizes[13]),
  color: tokens.colors.neutral[1],
};

/** F1 Heavy 0+ — hero / auth titles */
export const clientTextF1Heavy: TextStyle = {
  fontFamily: familyBold,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[13],
  lineHeight: lh(tokens.typography.fontSizes[13]),
  color: tokens.colors.neutral[1],
};

/** F4 Heavy @≥1200px — venue page title (28px, line-height 120%). */
export const clientTextF4Heavy1200: TextStyle = {
  fontFamily: familyBold,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[12],
  lineHeight: lh120(tokens.typography.fontSizes[12]),
  color: tokens.colors.neutral[1],
};

/** F2 Regular @≥1200px — product price on venue page (40px, line-height 120%). */
export const clientTextF2Regular1200: TextStyle = {
  fontFamily: familyRegular,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[16],
  lineHeight: lh120(tokens.typography.fontSizes[16]),
  color: tokens.colors.neutral[1],
};

/** F4 Heavy 0+ — section titles */
export const clientTextF4Heavy: TextStyle = {
  fontFamily: familyBold,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[9],
  lineHeight: lh(tokens.typography.fontSizes[9]),
  color: tokens.colors.neutral[1],
};

/** F5 Heavy — web venue name on cards (22px, line-height 120%). */
export const clientTextF5Heavy: TextStyle = {
  fontFamily: familyBold,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[9],
  lineHeight: lh120(tokens.typography.fontSizes[9]),
  color: tokens.colors.neutral[1],
};

/** F6 Regular — web surprise-box group labels (18px, line-height 120%). */
export const clientTextF6Regular: TextStyle = {
  fontFamily: familyRegular,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[6],
  lineHeight: lh120(tokens.typography.fontSizes[6]),
  color: tokens.colors.neutral[1],
};

/** F6 Heavy 0+ — card titles, list headings */
export const clientTextF6Heavy: TextStyle = {
  fontFamily: familyBold,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[6],
  lineHeight: lh(tokens.typography.fontSizes[6]),
  color: tokens.colors.neutral[1],
};

/** Desktop web: F6 one step up (still token-only). */
export const clientTextF6HeavyDesktop: TextStyle = {
  ...clientTextF6Heavy,
  fontSize: tokens.typography.fontSizes[8],
  lineHeight: lh(tokens.typography.fontSizes[8]),
};

/** Paragraph Base Regular */
export const clientTextParagraphBase: TextStyle = {
  fontFamily: familyRegular,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[5],
  lineHeight: lh(tokens.typography.fontSizes[5]),
  color: tokens.colors.neutral[5],
};

/** Paragraph Base Heavy */
export const clientTextParagraphBaseHeavy: TextStyle = {
  ...clientTextParagraphBase,
  fontFamily: familyBold,
  fontWeight: '400',
  color: tokens.colors.neutral[1],
};

/** Десктоп — заголовок карточки сюрприз-бокса (SemiBold 22px, lh 120%). */
export const clientTextSurpriseDesktopHeroTitle: TextStyle = {
  fontFamily: tokens.typography.fontFamilies.sourceSansProSemiBold,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[9],
  lineHeight: lh120(tokens.typography.fontSizes[9]),
  color: tokens.colors.neutral[1],
};

/**
 * Десктоп — цена в карточке (SemiBold, lh 100%).
 * fontSize задаётся адаптивно в `useSurpriseDesktopPriceStyle` (до 48px на wide).
 */
export const clientTextSurpriseDesktopPriceDisplay: TextStyle = {
  fontFamily: tokens.typography.fontFamilies.sourceSansProSemiBold,
  fontWeight: '400',
  fontSize: tokens.typography.fontSizes[18],
  lineHeight: tokens.typography.fontSizes[18],
  color: tokens.colors.neutral[1],
};
