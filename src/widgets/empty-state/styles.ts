import { StyleSheet } from 'react-native';
import { theme } from '../../shared/config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[7],
    gap: theme.spacing[3],
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary[10],
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold,
    fontSize: theme.typography.fontSizes[7],
    fontWeight: '400',
    color: theme.colors.neutral[1],
    textAlign: 'center',
  },
  description: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[3],
    textAlign: 'center',
    lineHeight: theme.typography.fontSizes[4] * theme.typography.lineHeights.loose,
  },
  actionWrapper: {
    marginTop: theme.spacing[3],
    minWidth: 200,
  },
});
