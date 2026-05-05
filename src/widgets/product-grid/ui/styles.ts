import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: theme.spacing[2],
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.neutral.white,
    overflow: 'hidden',
    ...theme.shadows.tight[2],
  },
  cardCompact: {
    maxWidth: 260,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: theme.colors.primary[10],
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCompact: {
    aspectRatio: 4 / 3,
  },
  body: {
    flex: 1,
    padding: theme.spacing[3],
    gap: theme.spacing[2],
  },
  name: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[1],
  },
  meta: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[2],
    color: theme.colors.neutral[4],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[2],
    marginTop: 'auto',
  },
  price: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[6],
    color: theme.colors.primary[100],
  },
  list: {
    paddingHorizontal: theme.spacing[2],
    paddingBottom: theme.spacing[10],
    width: '100%',
    maxWidth: theme.layout.containerMaxWidth,
    alignSelf: 'center',
  },
  emptyWrapper: {
    paddingTop: theme.spacing[6],
  },
  loaderWrapper: {
    paddingVertical: theme.spacing[7],
  },
});
