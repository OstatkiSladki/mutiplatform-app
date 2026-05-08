import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[3],
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.lg,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary[20],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    color: theme.colors.primary[100],
  },
  body: {
    flex: 1,
    gap: theme.spacing[1],
  },
  name: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[1],
  },
  address: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
  meta: {
    alignItems: 'flex-end',
    gap: theme.spacing[1],
  },
  metaText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[2],
  },
});
