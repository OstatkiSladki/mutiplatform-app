import { StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.neutral[9],
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
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    color: theme.colors.neutral[1],
  },
  scrollContent: {
    paddingHorizontal: theme.spacing[3],
    paddingBottom: theme.spacing[10],
    gap: theme.spacing[3],
  },
  section: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing[4],
    gap: theme.spacing[3],
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
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
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '500',
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[1],
  },
  itemPrice: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownLabel: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[3],
  },
  breakdownValue: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[1],
  },
  totalLabel: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[6],
    fontWeight: '600',
    color: theme.colors.neutral[1],
  },
  totalValue: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[10],
    color: theme.colors.primary[100],
  },
  upsellGrid: {
    gap: theme.spacing[3],
  },
  upsellGridRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  upsellGridStack: {
    flexDirection: 'column',
  },
});
