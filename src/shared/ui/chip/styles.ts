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
  chipActive: {
    backgroundColor: theme.colors.primary[100],
  },
  text: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[1],
  },
  textActive: {
    color: theme.colors.neutral.white,
    fontWeight: '600',
  },
});
