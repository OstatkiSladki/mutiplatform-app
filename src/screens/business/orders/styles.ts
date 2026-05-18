import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

const b = theme.business;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    rowGap: 24,
  },
  card: {
    backgroundColor: b.colors.surface,
    borderRadius: b.radius.card,
    borderWidth: 1,
    borderColor: b.colors.border,
    padding: 24,
    minHeight: '80%',
    ...b.shadows.card,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    columnGap: 12,
  },
  headerText: {
    fontFamily: b.typography.fontFamilyBold,
    fontSize: 12,
    fontWeight: '400',
    color: b.colors.foreground,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  headerActionCol: {
    width: 200,
    textAlign: 'right',
  },
});
