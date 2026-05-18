import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const styles = StyleSheet.create({
  image: {
    backgroundColor: theme.client.colors.secondary,
  },
  fallback: {
    backgroundColor: theme.client.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[4],
    fontWeight: '400',
    color: theme.client.colors.foreground,
    letterSpacing: theme.typography.letterSpacing[0],
  },
});

export const sizeStyles = StyleSheet.create({
  sm: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  md: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});
