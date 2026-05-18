import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  content: {
    padding: theme.spacing[4],
    gap: theme.spacing[3],
  },
  title: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[7],
    color: theme.colors.neutral[1],
    marginBottom: theme.spacing[2],
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing[4],
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    ...theme.shadows.tight[2],
  },
  cardLeft: {
    flex: 1,
    paddingRight: theme.spacing[3],
  },
  venueName: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[1],
  },
  itemCount: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
    marginTop: theme.spacing[1],
  },
  total: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[6],
    color: theme.colors.neutral[1],
  },
});
