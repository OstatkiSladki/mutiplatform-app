import { StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing[8],
    paddingBottom: theme.spacing[5],
    gap: theme.spacing[5],
  },
  containerWeb: {
    paddingTop: theme.spacing[10],
    paddingBottom: theme.spacing[8],
  },
  card: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing[6],
    gap: theme.spacing[5],
    ...theme.shadows.tight[3],
  },
  header: {
    gap: theme.spacing[1],
  },
  title: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[12],
    fontWeight: '700',
    color: theme.colors.neutral[1],
  },
  subtitle: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[3],
  },
  form: {
    gap: theme.spacing[1],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing[1],
    marginTop: theme.spacing[3],
  },
  footerText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[3],
  },
  footerLink: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[4],
    fontWeight: '700',
    color: theme.colors.primary[100],
  },
});

export const AUTH_CARD_MAX_WIDTH = 460;
