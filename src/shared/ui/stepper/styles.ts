import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: theme.colors.neutral[7],
  },
  value: {
    minWidth: 24,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[5],
    fontWeight: '600',
    color: theme.colors.neutral[1],
  },
});
