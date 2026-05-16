import { StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.client.colors.background,
  },
  scrollContent: {
    paddingBottom: theme.spacing[8],
    paddingTop: theme.spacing[6],
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    gap: theme.spacing[8],
  },
  section: {
    paddingHorizontal: theme.spacing[6],
    gap: theme.spacing[4],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: 20,
    color: theme.client.colors.foreground,
  },
  nearbyCard: {
    backgroundColor: theme.client.colors.card,
    borderRadius: theme.client.radius.lg,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    padding: theme.spacing[4],
    gap: theme.spacing[3],
    overflow: 'hidden',
    ...theme.client.shadows.card,
  },
  nearbyGridDesktop: {
    flexDirection: 'row',
    gap: theme.spacing[4],
  },
  nearbyMapDesktop: {
    flex: 1,
    minHeight: 350,
  },
  nearbyMapMobile: {
    height: 250,
    borderRadius: theme.client.radius.lg,
    overflow: 'hidden',
  },
  nearbyListDesktop: {
    flex: 1,
    maxHeight: 350,
  },
  nearbyListMobile: {
    gap: theme.spacing[1],
    maxHeight: 260,
  },
  carouselWrap: {
    position: 'relative',
  },
  horizontalList: {
    paddingRight: theme.spacing[4],
    gap: theme.spacing[4],
  },
  separator: {
    width: theme.spacing[4],
  },
  vSeparator: {
    height: theme.spacing[2],
  },
  loaderRow: {
    paddingVertical: theme.spacing[5],
    alignItems: 'center',
  },
  surpriseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[4],
  },
  surpriseCell1: {
    width: '100%',
  },
  surpriseCell2: {
    flexBasis: '48%',
    flexGrow: 0,
    flexShrink: 1,
    minWidth: 0,
  },
  carouselPrev: {
    position: 'absolute',
    left: theme.spacing[2],
    top: '50%',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.client.colors.card,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -18 }],
    ...theme.client.shadows.card,
  },
  carouselNext: {
    position: 'absolute',
    right: theme.spacing[2],
    top: '50%',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.client.colors.card,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -18 }],
    ...theme.client.shadows.card,
  },
});
