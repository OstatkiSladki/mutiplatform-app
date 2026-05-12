import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  card: {
    width: 230,
    borderRadius: theme.client.radius.lg,
    backgroundColor: theme.client.colors.card,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    overflow: 'hidden',
    ...theme.client.shadows.card,
  },
  cover: {
    width: '100%',
    height: 128,
  },
  body: {
    padding: theme.spacing[3],
    gap: theme.spacing[1],
  },
  name: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '600',
    fontSize: 14,
    color: theme.client.colors.foreground,
  },
  tags: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: 11,
    color: theme.client.colors.mutedForeground,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    marginTop: theme.spacing[1],
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  metaText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: 11,
    color: theme.client.colors.mutedForeground,
  },
  metaTextStrong: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: 11,
    fontWeight: '600',
    color: theme.client.colors.foreground,
  },
  metaSpacer: {
    flex: 1,
  },
});
