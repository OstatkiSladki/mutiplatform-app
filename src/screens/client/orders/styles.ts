import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    padding: theme.spacing[4],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing[2],
    marginVertical: -theme.spacing[2],
  },
  cell: {
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[2],
  },
  title: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    color: theme.colors.neutral[1],
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[4],
  },
  card: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing[4],
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    gap: theme.spacing[2],
    ...theme.shadows.tight[2],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing[3],
  },
  headerText: {
    flex: 1,
    gap: theme.spacing[1],
  },
  orderTitle: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[1],
  },
  meta: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
  itemsLine: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[2],
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing[2],
  },
  total: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[6],
    color: theme.colors.neutral[1],
  },
  pickupBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary[10],
  },
  pickupBtnText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.primary[100],
  },
  emptyWrap: {
    padding: theme.spacing[4],
  },
  modalContent: {
    padding: theme.spacing[4],
    gap: theme.spacing[3],
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[1],
  },
  pickupCode: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[14],
    color: theme.colors.primary[100],
    letterSpacing: 4,
  },
  modalMeta: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
  modalLoading: {
    paddingVertical: theme.spacing[4],
  },
});
