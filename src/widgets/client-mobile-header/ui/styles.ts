import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.client.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.client.colors.border,
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[3],
    gap: theme.spacing[3],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  brand: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  logo: {
    width: 32,
    height: 32,
  },
  brandText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: 15,
    fontWeight: '400',
    color: theme.client.colors.foreground,
    flexShrink: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
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
    fontFamily: theme.typography.fontFamilies.sourceSansProBold,
    fontSize: 10,
    fontWeight: '400',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  searchContainer: {
    flex: 1,
    marginBottom: 0,
  },
  locationPill: {
    flexShrink: 0,
  },
});
