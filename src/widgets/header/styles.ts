import { StyleSheet } from 'react-native';
import { theme } from '../../shared/config/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    backgroundColor: theme.colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[8],
    gap: theme.spacing[3],
  },
  title: {
    flex: 1,
    fontFamily: theme.typography.fontFamilies.sourceSansProBold,
    fontSize: theme.typography.fontSizes[7],
    fontWeight: '400',
    color: theme.colors.neutral[1],
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.neutral[9],
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: theme.colors.neutral.white,
    fontFamily: theme.typography.fontFamilies.sourceSansProBold,
    fontSize: 10,
    fontWeight: '400',
  },
});
