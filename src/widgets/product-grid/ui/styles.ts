import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

const cardShadow = Platform.select({
  web: { boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)' },
  default: { ...theme.client.shadows.card, shadowOpacity: 0.04, elevation: 1 },
}) as object;

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: theme.spacing[2],
    padding: theme.spacing[3],
    borderRadius: theme.client.radius.card,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    backgroundColor: theme.client.colors.card,
    gap: theme.spacing[2],
    ...cardShadow,
  },
  name: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.foreground,
    lineHeight: theme.typography.fontSizes[4] * theme.typography.lineHeights.normal,
    minHeight: theme.typography.fontSizes[4] * theme.typography.lineHeights.normal * 2,
  },
  weight: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
  },
  imageButton: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.secondaryMuted,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing[1],
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing[1],
  },
  price: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[6],
    color: theme.client.colors.foreground,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.client.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: theme.spacing[2],
    paddingBottom: 140,
    width: '100%',
    maxWidth: theme.layout.containerMaxWidth,
    alignSelf: 'center',
  },
  flexWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing[2],
  },
  flexCell: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  emptyWrapper: {
    paddingTop: theme.spacing[6],
  },
  loaderWrapper: {
    paddingVertical: theme.spacing[7],
  },
});
