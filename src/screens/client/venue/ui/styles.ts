import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';

const cardShadow = Platform.select({
  web: { boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)' },
  default: theme.client.shadows.card,
}) as object;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.client.colors.background,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.client.colors.card,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
  },
  desktopScroll: {
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[6],
    width: '100%',
    maxWidth: theme.layout.containerMaxWidthDesktop,
    alignSelf: 'center',
    gap: theme.spacing[6],
  },
  desktopMain: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[6],
  },
  desktopLeft: {
    flex: 1,
    gap: theme.spacing[6],
  },
  desktopRight: {
    width: 320,
  },
  productsCard: {
    backgroundColor: theme.client.colors.card,
    borderRadius: theme.client.radius.card,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    padding: theme.spacing[5],
    gap: theme.spacing[4],
    ...cardShadow,
  },
  productsTitle: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    color: theme.client.colors.foreground,
  },
  mobileColumn: {
    flex: 1,
  },
  mobileHeaderWrap: {
    paddingHorizontal: theme.spacing[3],
    paddingTop: theme.spacing[2],
    paddingBottom: theme.spacing[2],
    gap: theme.spacing[3],
  },
  sectionTitle: {
    paddingHorizontal: theme.spacing[3],
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[1],
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    color: theme.client.colors.foreground,
  },
});
