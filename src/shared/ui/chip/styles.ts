import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.neutral[9],
    alignSelf: 'flex-start',
  },
  chipAccent: {
    backgroundColor: theme.client.colors.accent,
  },
  chipSuccess: {
    backgroundColor: theme.client.colors.chipGreenBg,
  },
  chipActive: {
    backgroundColor: theme.colors.primary[100],
  },
  text: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[1],
  },
  textAccent: {
    color: theme.client.colors.accentForeground,
    fontWeight: '500',
  },
  textSuccess: {
    color: theme.client.colors.chipGreenFg,
    fontWeight: '500',
  },
  textActive: {
    color: theme.colors.neutral.white,
    fontWeight: '600',
  },
});
