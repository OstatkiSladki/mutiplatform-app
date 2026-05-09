import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[3],
    borderRadius: theme.client.radius.md,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: theme.client.radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: 11,
  },
  body: {
    flex: 1,
    gap: theme.spacing[2],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[2],
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '600',
    fontSize: 15,
    color: theme.client.colors.foreground,
  },
  address: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: 12,
    color: theme.client.colors.mutedForeground,
    marginTop: 2,
  },
  hours: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  hoursText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: 12,
    color: theme.client.colors.mutedForeground,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[2],
  },
  tags: {
    flexDirection: 'row',
    gap: theme.spacing[1],
  },
});
