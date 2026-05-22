import { StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.neutral[9],
  },
  rootDesktop: {
    backgroundColor: theme.client.colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    gap: theme.spacing[2],
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.neutral.white,
  },
  topTitle: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[7],
    color: theme.colors.neutral[1],
  },
  scrollContent: {
    paddingHorizontal: theme.spacing[3],
    gap: theme.spacing[3],
  },
  scrollContentMobile: {
    paddingBottom: 120,
  },
  scrollContentDesktop: {
    paddingBottom: theme.spacing[6],
    maxWidth: theme.layout.containerMaxWidth,
    width: '100%',
    alignSelf: 'center',
  },
  bodyWrap: {
    flex: 1,
  },
  layoutRow: {
    flexDirection: 'row',
    gap: theme.spacing[5],
    alignItems: 'flex-start',
  },
  mainCol: {
    flex: 1,
    gap: theme.spacing[3],
  },
  summaryCol: {
    width: 360,
    flexShrink: 0,
  },
  section: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing[4],
    gap: theme.spacing[3],
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[7],
    color: theme.colors.neutral[1],
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    paddingVertical: theme.spacing[2],
  },
  itemBody: {
    flex: 1,
    gap: 2,
  },
  itemName: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[1],
  },
  itemPrice: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownLabel: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[3],
  },
  breakdownValue: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[1],
  },
  totalLabel: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[6],
    fontWeight: '400',
    color: theme.colors.neutral[1],
  },
  totalValue: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[10],
    color: theme.colors.primary[100],
  },
  upsellRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: theme.spacing[3],
  },
  upsellRowDesktop: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing[4],
    width: '100%',
  },
  upsellCellDesktop: {
    minWidth: 0,
    width: '100%',
  },
  upsellCarousel: {
    gap: theme.spacing[3],
    paddingRight: theme.spacing[3],
  },
  upsellSlide: {
    width: 280,
  },
});
