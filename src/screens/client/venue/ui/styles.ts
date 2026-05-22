import { StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';
import { clientTextF3SemiBold1200 } from '../../../../shared/config/theme/client-text-styles';
import { venuePageSurface, CART_WIDTH, VENUE_PAGE_TOP_PADDING } from './components/styles';

export { VENUE_PAGE_TOP_PADDING };

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.client.colors.background,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.client.colors.card,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
  },
  desktopScroll: {
    width: '100%',
    maxWidth: theme.layout.containerMaxWidthDesktop,
    alignSelf: 'center',
    paddingTop: VENUE_PAGE_TOP_PADDING,
  },
  desktopScrollWithFooter: {
    flexGrow: 1,
  },
  desktopMain: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: theme.spacing[4],
  },
  desktopLeft: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing[4],
  },
  desktopRight: {
    width: CART_WIDTH,
    flexShrink: 0,
    alignSelf: 'stretch',
  },
  productsCard: {
    ...venuePageSurface,
    padding: theme.spacing[6],
    gap: theme.spacing[4],
  },
  productsTitle: {
    ...clientTextF3SemiBold1200,
  },
  mobileColumn: {
    flex: 1,
  },
  mobileHeaderWrap: {
    paddingHorizontal: theme.spacing[3],
    paddingTop: theme.spacing[2],
    paddingBottom: theme.spacing[2],
    gap: theme.spacing[3],
  },
  sectionTitle: {
    paddingHorizontal: theme.spacing[3],
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[1],
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    color: theme.client.colors.foreground,
  },
});
