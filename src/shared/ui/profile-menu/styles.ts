import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    paddingBottom: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.client.colors.border,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: 15,
    fontWeight: '600',
    color: theme.client.colors.foreground,
  },
  headerLink: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: 12,
    color: theme.client.colors.mutedForeground,
  },
  section: {
    paddingVertical: theme.spacing[2],
  },
  divider: {
    height: 1,
    backgroundColor: theme.client.colors.border,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.client.radius.md,
  },
  itemPressed: {
    backgroundColor: theme.client.colors.secondary,
  },
  itemLabel: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: 14,
    color: theme.client.colors.foreground,
  },
  itemLabelDestructive: {
    color: theme.client.colors.destructive,
  },
});
