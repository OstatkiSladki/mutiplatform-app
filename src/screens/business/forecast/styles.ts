import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

const b = theme.business;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    rowGap: 24,
  },
  tableCard: {
    backgroundColor: b.colors.surface,
    borderRadius: b.radius.card,
    borderWidth: 1,
    borderColor: b.colors.border,
    padding: 24,
    ...b.shadows.card,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    columnGap: 12,
  },
  headerText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    fontWeight: '700',
    color: b.colors.foreground,
  },
  headerActionCol: {
    width: 200,
    alignItems: 'flex-end',
  },
});
