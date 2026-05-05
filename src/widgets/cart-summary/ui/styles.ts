import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  sticky: {
    position: 'absolute',
    left: theme.spacing[3],
    right: theme.spacing[3],
    bottom: theme.spacing[3],
    marginHorizontal: 'auto',
    maxWidth: 560,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    backgroundColor: theme.colors.primary[100],
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    ...theme.shadows.fluffy[3],
  },
  info: {
    flex: 1,
  },
  count: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.primary[10],
  },
  total: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    color: theme.colors.neutral.white,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.neutral.white,
  },
  ctaText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.primary[100],
  },
  fullSection: {
    gap: theme.spacing[3],
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    paddingVertical: theme.spacing[2],
  },
  itemName: {
    flex: 1,
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '500',
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[1],
  },
  itemQty: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
  itemPrice: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[1],
  },
});
