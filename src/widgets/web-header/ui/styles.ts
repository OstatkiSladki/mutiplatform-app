import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  bar: {
    width: '100%',
    backgroundColor: theme.client.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.client.colors.border,
    zIndex: 10,
    ...(Platform.OS === 'web' ? ({ position: 'sticky', top: 0 } as object) : null),
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[4],
    gap: theme.spacing[6],
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  logo: {
    width: 36,
    height: 36,
  },
  brandText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: 15,
    fontWeight: '600',
    color: theme.client.colors.foreground,
  },
  searchWrap: {
    flex: 1,
    maxWidth: 576,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: theme.client.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: theme.client.colors.primaryForeground,
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: 10,
    fontWeight: '700',
  },
});
