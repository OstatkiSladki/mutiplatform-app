import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  rowSpread: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 0,
  },
  rowLg: {
    gap: theme.spacing[3],
    height: 40,
    paddingHorizontal: theme.spacing[2],
    backgroundColor: theme.client.colors.secondary,
    borderRadius: theme.client.radius.pill,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSm: {
    width: 28,
    height: 28,
  },
  buttonSecondary: {
    backgroundColor: theme.client.colors.secondary,
  },
  valueSpread: {
    color: theme.client.colors.foreground,
  },
  buttonLg: {
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
  },
  buttonDisabled: {
    backgroundColor: theme.colors.neutral[7],
  },
  buttonLgDisabled: {
    opacity: 0.4,
  },
  value: {
    minWidth: 24,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[5],
    fontWeight: '600',
    color: theme.colors.neutral[1],
  },
  valueSm: {
    minWidth: 20,
    fontSize: theme.typography.fontSizes[4],
  },
  valueLg: {
    minWidth: 32,
    fontSize: theme.typography.fontSizes[5],
    color: theme.client.colors.foreground,
  },
});
