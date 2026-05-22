import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';
import {
  clientTextF2Regular1200,
  clientTextF5SemiBold1200,
  clientTextF6Regular,
  clientTextParagraphBase,
} from '../../../shared/config/theme/client-text-styles';

const MODAL_PADDING = theme.spacing[6];
const ADD_BUTTON_WIDTH = 162;
const ADD_BUTTON_HEIGHT = 42;

const modalShadow = Platform.select({
  web: { boxShadow: '0 8px 24px -4px rgba(26, 21, 18, 0.08)' },
  default: theme.client.shadows.venueDesktopCard,
}) as object;

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(26, 21, 18, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: MODAL_PADDING,
  },
  card: {
    width: '100%',
    maxWidth: 920,
    backgroundColor: theme.client.colors.card,
    borderRadius: theme.spacing[5],
    overflow: 'hidden',
    position: 'relative',
    padding: MODAL_PADDING,
    ...modalShadow,
  },
  closeButton: {
    position: 'absolute',
    top: MODAL_PADDING,
    right: MODAL_PADDING,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: 360,
  },
  imageColumn: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.client.colors.card,
  },
  imageWrap: {
    width: '100%',
    maxWidth: 340,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.client.colors.secondaryMuted,
    borderRadius: theme.client.radius.md,
  },
  contentColumn: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing[4],
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing[4],
    paddingRight: 40,
  },
  name: {
    ...clientTextF5SemiBold1200,
    flex: 1,
  },
  weight: {
    ...clientTextF6Regular,
    color: theme.client.colors.mutedForeground,
    flexShrink: 0,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    flexWrap: 'wrap',
  },
  price: {
    ...clientTextF2Regular1200,
    flexShrink: 0,
  },
  addButton: {
    width: ADD_BUTTON_WIDTH,
    height: ADD_BUTTON_HEIGHT,
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.client.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: 24,
    color: theme.client.colors.primaryForeground,
  },
  textBlock: {
    gap: theme.spacing[4],
  },
  description: {
    ...clientTextParagraphBase,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: Math.round(theme.typography.fontSizes[4] * theme.typography.lineHeights.loose),
    color: theme.client.colors.foreground,
  },
  nutritionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: theme.spacing[8],
  },
  nutritionCell: {
    alignItems: 'flex-start',
    gap: theme.spacing[1],
  },
  nutritionLabel: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[2],
    lineHeight: Math.round(theme.typography.fontSizes[2] * theme.typography.lineHeights.normal),
    color: theme.client.colors.mutedForeground,
    textAlign: 'left',
  },
  nutritionValue: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold,
    fontSize: theme.typography.fontSizes[6],
    lineHeight: 24,
    color: theme.client.colors.foreground,
    textAlign: 'left',
  },
});
