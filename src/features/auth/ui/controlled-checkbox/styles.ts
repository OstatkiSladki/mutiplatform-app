import { StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[2],
    marginBottom: theme.spacing[3],
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderColor: theme.colors.neutral[6],
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  boxChecked: {
    backgroundColor: theme.colors.primary[100],
    borderColor: theme.colors.primary[100],
  },
  boxError: {
    borderColor: theme.colors.status.error,
  },
  label: {
    flex: 1,
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[2],
    lineHeight: theme.typography.fontSizes[4] * theme.typography.lineHeights.loose,
  },
  errorText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.status.error,
    marginTop: theme.spacing[1],
    marginLeft: theme.spacing[7],
  },
});
