import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

const b = theme.business;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: b.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[7],
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[6],
  },
  hero: {
    width: 168,
    height: 168,
    borderRadius: 84,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: b.colors.primary,
    ...b.shadows.glow,
  },
  heroSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: b.colors.card,
    borderRadius: b.radius.card,
    padding: theme.spacing[6],
    gap: theme.spacing[4],
    alignItems: 'center',
    ...b.shadows.card,
  },
  badge: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[1],
    borderRadius: b.radius.pill,
    backgroundColor: b.colors.muted,
  },
  badgeText: {
    fontSize: b.typography.label.fontSize,
    fontWeight: b.typography.label.fontWeight,
    color: b.colors.primary,
    letterSpacing: b.typography.letterSpacing.wide,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: b.typography.h2.fontSize,
    fontWeight: b.typography.h2.fontWeight,
    lineHeight: b.typography.h2.lineHeight,
    color: b.colors.foreground,
    textAlign: 'center',
    letterSpacing: b.typography.letterSpacing.tight,
  },
  description: {
    fontSize: b.typography.body.fontSize,
    fontWeight: b.typography.body.fontWeight,
    lineHeight: b.typography.body.lineHeight,
    color: b.colors.mutedForeground,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    gap: theme.spacing[3],
    marginTop: theme.spacing[2],
  },
  primaryBtn: {
    width: '100%',
    paddingVertical: theme.spacing[4],
    borderRadius: b.radius.lg,
    backgroundColor: b.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryBtnText: {
    color: b.colors.primaryForeground,
    fontSize: b.typography.button.fontSize,
    fontWeight: b.typography.button.fontWeight,
  },
  primaryBtnPressed: {
    opacity: 0.85,
  },
  secondaryBtnPressed: {
    opacity: 0.7,
  },
  secondaryBtn: {
    width: '100%',
    paddingVertical: theme.spacing[4],
    borderRadius: b.radius.lg,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: b.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  secondaryBtnText: {
    color: b.colors.foreground,
    fontSize: b.typography.button.fontSize,
    fontWeight: b.typography.button.fontWeight,
  },
  footnote: {
    fontSize: b.typography.footnote.fontSize,
    fontWeight: b.typography.footnote.fontWeight,
    color: b.colors.mutedForeground,
    textAlign: 'center',
    paddingHorizontal: theme.spacing[4],
  },
});
