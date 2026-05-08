import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

const b = theme.business;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    rowGap: 24,
  },
  toggleRow: {
    alignItems: 'center',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 20,
    rowGap: 20,
  },
  bottomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 20,
    rowGap: 20,
  },
  bottomGridCol: {
    flex: 1,
    minWidth: 320,
    rowGap: 0,
  },
  // placeholder used until charts arrive in 5.2
  chartPlaceholder: {
    flex: 1,
    minWidth: 320,
    minHeight: 320,
    backgroundColor: b.colors.surface,
    borderRadius: b.radius.card,
    borderWidth: 1,
    borderColor: b.colors.border,
    padding: 24,
    ...b.shadows.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.mutedForeground,
  },
});
