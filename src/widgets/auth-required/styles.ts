import { StyleSheet } from 'react-native';
import { theme } from '../../shared/config/theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.neutral[9],
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[8],
  },
  card: {
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
    gap: theme.spacing[4],
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary[10],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[2],
  },
  title: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[8],
    fontWeight: '700',
    color: theme.colors.neutral[1],
    textAlign: 'center',
  },
  description: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[3],
    textAlign: 'center',
    lineHeight:
      theme.typography.fontSizes[4] * theme.typography.lineHeights.loose,
    paddingHorizontal: theme.spacing[2],
  },
  actions: {
    width: '100%',
    gap: theme.spacing[3],
    marginTop: theme.spacing[3],
  },
});
