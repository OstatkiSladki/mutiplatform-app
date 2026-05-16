import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    borderRadius: theme.client.radius.lg,
    backgroundColor: theme.client.colors.card,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    padding: theme.spacing[4],
    gap: theme.spacing[3],
    ...theme.client.shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: theme.client.radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: 10,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '600',
    fontSize: 15,
    color: theme.client.colors.foreground,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: 12,
    color: theme.client.colors.mutedForeground,
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
  body: {
    gap: theme.spacing[3],
  },
  bodyWide: {
    flexDirection: 'row',
  },
  imageWrap: {
    borderRadius: theme.client.radius.md,
    overflow: 'hidden',
    backgroundColor: theme.client.colors.secondary,
    aspectRatio: 1,
  },
  imageWrapWide: {
    width: 130,
    height: 130,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  form: {
    gap: theme.spacing[3],
  },
  formWide: {
    flex: 1,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[2],
    marginTop: theme.spacing[1],
    height: 44,
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.primary,
  },
  ctaText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '600',
    fontSize: 14,
    color: theme.client.colors.primaryForeground,
  },
});
