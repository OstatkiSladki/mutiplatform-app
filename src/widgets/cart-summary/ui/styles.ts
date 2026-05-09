import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

const cardShadow = Platform.select({
  web: { boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)' },
  default: theme.client.shadows.card,
}) as object;

const dockShadow = Platform.select({
  web: { boxShadow: '0 8px 28px rgba(26, 21, 18, 0.18)' },
  default: theme.shadows.fluffy[3],
}) as object;

export const styles = StyleSheet.create({
  // ── Sidebar ──────────────────────────────────────────────────────────────
  sidebarCard: {
    backgroundColor: theme.client.colors.card,
    borderRadius: theme.client.radius.card,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    padding: theme.spacing[5],
    gap: theme.spacing[3],
    ...cardShadow,
  },
  sidebarHeader: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    color: theme.client.colors.foreground,
    marginBottom: theme.spacing[1],
  },
  sidebarItemsList: {
    gap: theme.spacing[2],
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    padding: theme.spacing[2],
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.secondaryMuted,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.secondary,
  },
  itemMeta: {
    flex: 1,
    gap: 2,
  },
  itemName: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '500',
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.foreground,
  },
  itemSub: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
  },
  itemPrice: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.foreground,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: theme.client.colors.border,
  },
  totalLabel: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.mutedForeground,
  },
  totalValue: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[6],
    color: theme.client.colors.foreground,
  },
  ctaPrimary: {
    height: 44,
    borderRadius: theme.client.radius.card,
    backgroundColor: theme.client.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPrimaryText: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.primaryForeground,
  },
  backToVenuesRow: {
    alignItems: 'center',
    marginTop: theme.spacing[3],
  },
  backToVenuesText: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
  },

  // ── Empty cart ───────────────────────────────────────────────────────────
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing[8],
    gap: theme.spacing[3],
  },
  emptyImage: {
    width: 160,
    height: 160,
  },
  emptyText: {
    textAlign: 'center',
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '500',
    fontSize: theme.typography.fontSizes[5],
    color: theme.client.colors.mutedForeground,
  },

  // ── Dock (mobile bottom panel) ──────────────────────────────────────────
  dock: {
    position: 'absolute',
    left: theme.spacing[3],
    right: theme.spacing[3],
    bottom: theme.spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    backgroundColor: theme.client.colors.primary,
    borderRadius: theme.client.radius.card,
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    ...dockShadow,
  },
  dockInfo: {
    flex: 1,
  },
  dockCount: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.accent,
  },
  dockTotal: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    color: theme.client.colors.primaryForeground,
  },
  dockCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.client.radius.card,
    backgroundColor: theme.client.colors.card,
  },
  dockCtaText: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.primary,
  },
});
