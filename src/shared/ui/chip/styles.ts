import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.neutral.white,
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    alignSelf: 'flex-start',
  },
  chipAccent: {
    backgroundColor: theme.client.colors.accent,
    borderColor: theme.colors.neutral[8],
  },
  chipSuccess: {
    backgroundColor: theme.client.colors.chipGreenBg,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: theme.colors.primary[100],
    borderColor: theme.colors.primary[100],
  },
  text: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    fontWeight: '400',
    color: theme.colors.neutral[5],
  },
  textAccent: {
    color: theme.client.colors.accentForeground,
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontWeight: '400',
  },
  textSuccess: {
    color: theme.client.colors.chipGreenFg,
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontWeight: '400',
  },
  textActive: {
    color: theme.colors.neutral.white,
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontWeight: '400',
  },
});
