import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

const shadow = Platform.select({
  web: { boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)' },
  default: theme.client.shadows.card,
}) as object;

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.client.colors.card,
    borderRadius: theme.client.radius.card,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    padding: theme.spacing[5],
    gap: theme.spacing[3],
    ...shadow,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[4],
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: theme.client.radius.md,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    backgroundColor: theme.client.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[1],
  },
  logoLetter: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[14],
    color: theme.client.colors.foreground,
    lineHeight: theme.typography.fontSizes[14],
  },
  body: {
    flex: 1,
    gap: theme.spacing[2],
  },
  name: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[8],
    color: theme.client.colors.foreground,
  },
  address: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.mutedForeground,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  ratingValue: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.foreground,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
    marginLeft: theme.spacing[1],
  },
  hoursText: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
  },
});
