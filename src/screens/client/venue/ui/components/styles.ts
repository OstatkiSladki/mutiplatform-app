import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../../../shared/config/theme';
import {
  clientTextF2Regular1200,
  clientTextF3SemiBold1200,
  clientTextF4SemiBold1200,
  clientTextF5SemiBold1200,
  clientTextF6Regular,
  clientTextParagraphBase,
} from '../../../../../shared/config/theme/client-text-styles';

const VENUE_CARD_RADIUS = theme.spacing[5];
const VENUE_CARD_PADDING = theme.spacing[6];
const PRODUCT_CARD_RADIUS = theme.spacing[5];
const PRODUCT_CARD_PADDING = theme.spacing[4];
const VENUE_BORDER_COLOR = theme.colors.neutral[7];
export const CART_WIDTH = 338;

/** Desktop venue page — 4 product cards per row inside 1280px shell. */
const VENUE_PAGE_COLUMN_GAP = theme.spacing[4];
const PRODUCTS_SECTION_PADDING = theme.spacing[6];
const PRODUCT_GRID_GAP = theme.spacing[4];
const VENUE_LEFT_COLUMN_WIDTH =
  theme.layout.containerMaxWidthDesktop - CART_WIDTH - VENUE_PAGE_COLUMN_GAP;
const PRODUCT_GRID_INNER_WIDTH = VENUE_LEFT_COLUMN_WIDTH - PRODUCTS_SECTION_PADDING * 2;

/** Floor so 4×width + 3×gap fits the products panel (207px @ 1280 shell). */
export const PRODUCT_CARD_WIDTH = Math.floor(
  (PRODUCT_GRID_INNER_WIDTH - PRODUCT_GRID_GAP * 3) / 4,
);
export const PRODUCT_CARD_HEIGHT = 306;
export const VENUE_PAGE_TOP_PADDING = theme.spacing[6];
const PRODUCT_TITLE_BLOCK_HEIGHT = 72;
const PRODUCT_NAME_HEIGHT = 48;
const PRODUCT_WEIGHT_HEIGHT = 24;
const PRODUCT_IMAGE_HEIGHT = 110;
const PRODUCT_STEPPER_SLOT_HEIGHT = 36;
const PRODUCT_PRICE_ROW_HEIGHT = 40;

const venuePageBorder = {
  borderWidth: 1,
  borderColor: VENUE_BORDER_COLOR,
};

/** Figma: 0 / 8 / 24 / -4, #1A1512 @ 4% — product tiles on venue page */
const productCardShadow = Platform.select({
  web: { boxShadow: '0 8px 24px -4px rgba(26, 21, 18, 0.04)' },
  default: theme.client.shadows.venueDesktopCard,
}) as object;

export const venuePageSurface = {
  backgroundColor: theme.client.colors.background,
  borderRadius: VENUE_CARD_RADIUS,
  ...venuePageBorder,
};

export const venueSectionTitle = clientTextF3SemiBold1200;

export const venueInfoStyles = StyleSheet.create({
  card: {
    ...venuePageSurface,
    padding: VENUE_CARD_PADDING,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[5],
  },
  logo: {
    width: 102,
    height: 102,
    borderRadius: theme.client.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[2],
    flexShrink: 0,
  },
  logoText: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    textAlign: 'center',
    letterSpacing: theme.typography.letterSpacing[1],
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  titleBlock: {
    gap: 2,
  },
  name: {
    ...clientTextF4SemiBold1200,
  },
  address: {
    ...clientTextParagraphBase,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.mutedForeground,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
    marginTop: theme.spacing[2],
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.spacing[2],
    marginTop: theme.spacing[2],
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.client.colors.accent,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
  },
  categoryChipText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[3],
    lineHeight: 24,
    color: theme.client.colors.accentForeground,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
    marginLeft: theme.spacing[1],
  },
  hoursText: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    lineHeight: 24,
    color: theme.client.colors.mutedForeground,
  },
});

export const productCardStyles = StyleSheet.create({
  card: {
    width: PRODUCT_CARD_WIDTH,
    height: PRODUCT_CARD_HEIGHT,
    backgroundColor: theme.client.colors.card,
    borderRadius: PRODUCT_CARD_RADIUS,
    padding: PRODUCT_CARD_PADDING,
    flexDirection: 'column',
    ...productCardShadow,
  },
  titleBlock: {
    height: PRODUCT_TITLE_BLOCK_HEIGHT,
    flexShrink: 0,
  },
  name: {
    ...clientTextF5SemiBold1200,
    height: PRODUCT_NAME_HEIGHT,
  },
  weight: {
    ...clientTextF6Regular,
    height: PRODUCT_WEIGHT_HEIGHT,
    lineHeight: PRODUCT_WEIGHT_HEIGHT,
    color: theme.client.colors.mutedForeground,
  },
  imageButton: {
    width: '100%',
    height: PRODUCT_IMAGE_HEIGHT,
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.secondaryMuted,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing[2],
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  stepperSlot: {
    height: PRODUCT_STEPPER_SLOT_HEIGHT,
    marginTop: theme.spacing[2],
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepperWrap: {
    backgroundColor: theme.client.colors.secondary,
    borderRadius: theme.client.radius.pill,
    paddingHorizontal: theme.spacing[1],
    paddingVertical: theme.spacing[1],
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: PRODUCT_PRICE_ROW_HEIGHT,
    marginTop: 'auto' as const,
    flexShrink: 0,
  },
  price: {
    ...clientTextF2Regular1200,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.client.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const productGridStyles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: PRODUCT_GRID_GAP,
  },
  cell: {
    width: PRODUCT_CARD_WIDTH,
  },
  loaderWrapper: {
    paddingVertical: theme.spacing[7],
    alignItems: 'center',
  },
  emptyWrapper: {
    paddingVertical: theme.spacing[6],
  },
});

export const cartSidebarStyles = StyleSheet.create({
  card: {
    flex: 1,
    width: CART_WIDTH,
    backgroundColor: theme.client.colors.background,
    borderRadius: VENUE_CARD_RADIUS,
    padding: VENUE_CARD_PADDING,
    ...venuePageBorder,
    minHeight: 480,
  },
  header: {
    ...clientTextF3SemiBold1200,
    marginBottom: theme.spacing[4],
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing[8],
    gap: theme.spacing[4],
    minHeight: 360,
  },
  emptyImage: {
    width: 140,
    height: 140,
  },
  emptyText: {
    textAlign: 'center',
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: 24,
    color: theme.client.colors.mutedForeground,
  },
  itemsList: {
    gap: theme.spacing[2],
    flex: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    padding: theme.spacing[2],
    borderRadius: theme.spacing[5],
    backgroundColor: theme.client.colors.card,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.secondary,
    flexShrink: 0,
  },
  itemMeta: {
    flex: 1,
    gap: 2,
    minWidth: 0,
    justifyContent: 'center',
  },
  itemName: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[5],
    lineHeight: 24,
    color: theme.client.colors.foreground,
  },
  itemSub: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    lineHeight: 24,
    color: theme.client.colors.mutedForeground,
  },
  itemPrice: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[12],
    lineHeight: Math.round(
      theme.typography.fontSizes[12] * (theme.typography.lineHeights.normal as number),
    ),
    color: theme.client.colors.foreground,
    flexShrink: 0,
    textAlign: 'right',
    alignSelf: 'center',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing[3],
    marginTop: theme.spacing[2],
    borderTopWidth: 1,
    borderTopColor: theme.client.colors.border,
  },
  totalLabel: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.mutedForeground,
  },
  totalValue: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold,
    fontSize: theme.typography.fontSizes[6],
    lineHeight: 24,
    color: theme.client.colors.foreground,
  },
  ctaPrimary: {
    height: 44,
    borderRadius: theme.client.radius.card,
    backgroundColor: theme.client.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing[3],
  },
  ctaPrimaryText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.primaryForeground,
  },
  backToVenuesRow: {
    alignItems: 'center',
    marginTop: theme.spacing[3],
  },
  backToVenuesText: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    lineHeight: 24,
    color: theme.client.colors.mutedForeground,
  },
});
