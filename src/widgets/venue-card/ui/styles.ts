import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  card: {
    width: 230,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.neutral.white,
    overflow: 'hidden',
    ...theme.shadows.tight[2],
  },
  cardWide: {
    width: 280,
  },
  cover: {
    width: '100%',
    height: 128,
    backgroundColor: theme.colors.primary[20],
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverLetter: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[14],
    color: theme.colors.primary[100],
  },
  body: {
    padding: theme.spacing[3],
    gap: theme.spacing[2],
  },
  name: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[1],
  },
  address: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  metaText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[2],
  },
  closedBadge: {
    position: 'absolute',
    top: theme.spacing[2],
    right: theme.spacing[2],
  },
});
