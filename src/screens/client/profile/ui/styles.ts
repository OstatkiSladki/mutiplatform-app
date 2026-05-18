import { StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';

export const styles = StyleSheet.create({
  splitRoot: {
    flex: 1,
    flexDirection: 'row',
    gap: theme.spacing[5],
    padding: theme.spacing[5],
    maxWidth: theme.layout.containerMaxWidth,
    width: '100%',
    alignSelf: 'center',
  },
  splitColumn: {
    flex: 1,
    gap: theme.spacing[4],
  },
  card: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.xl,
    padding: theme.spacing[5],
    gap: theme.spacing[4],
    ...theme.shadows.tight[2],
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary[20],
    alignItems: 'center',
    justifyContent: 'center',
  },
  identityText: {
    flex: 1,
    gap: theme.spacing[1],
  },
  name: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[8],
    color: theme.colors.neutral[1],
  },
  settingsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  settingsText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
  menuList: {
    gap: theme.spacing[1],
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[2],
  },
  menuLabel: {
    flex: 1,
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[1],
  },
  ecoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    backgroundColor: theme.colors.secondary[10],
    borderRadius: theme.radius.xl,
    padding: theme.spacing[4],
  },
  ecoIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.secondary[20],
    alignItems: 'center',
    justifyContent: 'center',
  },
  ecoText: {
    flex: 1,
    gap: theme.spacing[1],
  },
  ecoTitle: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[1],
  },
  ecoLine: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[2],
  },
});
