import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';
import { clientTextF4SemiBold1200 } from '../../../shared/config/theme/client-text-styles';

const MODAL_PADDING = theme.spacing[6];
const MAP_HEIGHT = 480;

const modalShadow = Platform.select({
  web: { boxShadow: '0 8px 24px -4px rgba(26, 21, 18, 0.08)' },
  default: theme.client.shadows.venueDesktopCard,
}) as object;

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(26, 21, 18, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: MODAL_PADDING,
  },
  card: {
    width: '100%',
    maxWidth: 920,
    backgroundColor: theme.client.colors.card,
    borderRadius: theme.spacing[5],
    overflow: 'hidden',
    position: 'relative',
    padding: MODAL_PADDING,
    gap: theme.spacing[4],
    ...modalShadow,
  },
  closeButton: {
    position: 'absolute',
    top: MODAL_PADDING,
    right: MODAL_PADDING,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  title: {
    ...clientTextF4SemiBold1200,
    paddingRight: 48,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    marginBottom: 0,
  },
  addButton: {
    minWidth: 148,
    flexShrink: 0,
  },
  mapShell: {
    width: '100%',
    height: MAP_HEIGHT,
    borderRadius: theme.client.radius.md,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.client.colors.secondaryMuted,
  },
  mapHost: {
    width: '100%',
    height: '100%',
  },
  mapFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[4],
  },
  mapFallbackText: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.mutedForeground,
    textAlign: 'center',
  },
  zoomControls: {
    position: 'absolute',
    right: theme.spacing[3],
    top: (MAP_HEIGHT - 88) / 2,
    gap: theme.spacing[2],
    zIndex: 2,
  },
  zoomButton: {
    width: 40,
    height: 40,
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  zoomButtonText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold,
    fontSize: theme.typography.fontSizes[7],
    lineHeight: 24,
    color: theme.client.colors.primaryForeground,
  },
});

export const MAP_HEIGHT_PX = MAP_HEIGHT;
