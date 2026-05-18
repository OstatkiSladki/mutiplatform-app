import { StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    marginBottom: theme.spacing[3],
  },
  box: {
    width: theme.spacing[5],
    height: theme.spacing[5],
    borderRadius: theme.spacing[2],
    borderWidth: 1,
    borderColor: theme.colors.neutral[7],
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[2],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.loose,
    fontWeight: '400',
  },
  labelMuted: {
    color: theme.colors.neutral[5],
    fontWeight: '400',
    lineHeight: theme.typography.fontSizes[5] * 1.4,
  },
  errorText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.status.error,
    marginTop: theme.spacing[1],
    marginLeft: theme.spacing[2] + theme.spacing[5] + theme.spacing[2],
  },
});
