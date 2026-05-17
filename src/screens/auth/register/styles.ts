import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  submit: {
    marginTop: theme.spacing[5],
    alignSelf: 'stretch',
    width: '100%',
    borderRadius: theme.spacing[2],
  },
  footerRow: {
    marginTop: theme.spacing[7],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: theme.spacing[3],
  },
  footerPrompt: {
    flex: 1,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * 1.4,
    fontWeight: '400',
    color: theme.colors.neutral[1],
  },
  footerLink: {
    flexShrink: 0,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * 1.4,
    fontWeight: '700',
    color: theme.colors.primary[100],
  },
});
