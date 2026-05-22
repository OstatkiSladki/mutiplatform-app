import { Platform, StyleSheet, type ViewStyle } from 'react-native';
import { theme } from '../../../../../shared/config/theme';
import {
  clientTextF2Regular1200,
  clientTextF3SemiBold1200,
  clientTextF4SemiBold1200,
  clientTextF5SemiBold1200,
  clientTextF6Regular,
} from '../../../../../shared/config/theme/client-text-styles';
const CARD_RADIUS = theme.spacing[5];
const PAGE_TOP_PADDING = theme.spacing[6];
const UPSELL_TOP_GAP = 60;
const CARD_PADDING = theme.spacing[6];
const BORDER_COLOR = theme.colors.neutral[7];
export const PRICE_CARD_WIDTH = 338;

const cardSurface = {
  backgroundColor: theme.client.colors.background,
  borderRadius: CARD_RADIUS,
  borderWidth: 1,
  borderColor: BORDER_COLOR,
};

export const stickyPriceCardStyle =
  Platform.OS === 'web'
    ? ({ position: 'sticky', top: PAGE_TOP_PADDING } as ViewStyle)
    : null;

export const bookingDesktopStyles = StyleSheet.create({
  pageScroll: {
    flexGrow: 1,
    paddingTop: PAGE_TOP_PADDING,
    paddingBottom: theme.spacing[8],
    maxWidth: theme.layout.containerMaxWidthDesktop,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: theme.spacing[4],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[4],
  },
  orderCard: {
    ...cardSurface,
    flex: 1,
    minWidth: 0,
    padding: CARD_PADDING,
  },
  venueName: {
    ...clientTextF3SemiBold1200,
    marginBottom: theme.spacing[9],
  },
  pickupSection: {
    gap: theme.spacing[4],
    marginBottom: theme.spacing[6],
  },
  pickupSectionTitle: {
    ...clientTextF4SemiBold1200,
  },
  section: {
    gap: theme.spacing[4],
  },
  sectionTitle: {
    ...clientTextF4SemiBold1200,
  },
  pickupRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[4],
  },
  pickupField: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing[2],
  },
  fieldLabel: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.foreground,
  },
  fieldBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.neutral[7],
    minHeight: 48,
  },
  fieldValue: {
    flex: 1,
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.foreground,
  },
  slotOptions: {
    marginTop: theme.spacing[1],
    borderRadius: theme.client.radius.sm,
    backgroundColor: theme.client.colors.card,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    overflow: 'hidden',
  },
  slotOption: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.client.colors.border,
  },
  slotOptionLast: {
    borderBottomWidth: 0,
  },
  slotOptionActive: {
    backgroundColor: theme.client.colors.accent,
  },
  slotOptionText: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.foreground,
  },
  itemsList: {
    gap: theme.spacing[2],
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    padding: theme.spacing[2],
    borderRadius: CARD_RADIUS,
    backgroundColor: theme.client.colors.card,
    width: '100%',
    overflow: 'hidden',
  },
  itemImageWrap: {
    width: 112,
    height: 112,
    flexGrow: 0,
    flexShrink: 0,
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.secondary,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemImagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemMeta: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    gap: 2,
  },
  itemName: {
    ...clientTextF5SemiBold1200,
  },
  itemPrice: {
    ...clientTextF2Regular1200,
  },
  itemWeight: {
    ...clientTextF6Regular,
    color: theme.client.colors.mutedForeground,
  },
  priceCard: {
    ...cardSurface,
    width: PRICE_CARD_WIDTH,
    flexShrink: 0,
    padding: CARD_PADDING,
    gap: theme.spacing[4],
  },
  priceCardTitle: {
    ...clientTextF3SemiBold1200,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[3],
  },
  priceRowLabel: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.mutedForeground,
  },
  priceRowValue: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.foreground,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing[2],
  },
  totalLabel: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.mutedForeground,
    flexShrink: 0,
  },
  totalValue: {
    ...clientTextF2Regular1200,
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    textAlign: 'right',
    flexShrink: 0,
    marginLeft: 'auto',
  },
  payButton: {
    width: '100%',
    marginTop: theme.spacing[2],
  },
  upsellSection: {
    marginTop: UPSELL_TOP_GAP,
    gap: theme.spacing[4],
  },
  upsellTitle: {
    ...clientTextF3SemiBold1200,
  },
  upsellGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing[4],
    width: '100%',
  },
  upsellCell: {
    minWidth: 0,
    width: '100%',
  },
});
