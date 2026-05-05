import { StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';

export const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: theme.spacing[8],
  },
  section: {
    paddingHorizontal: theme.spacing[4],
    marginTop: theme.spacing[5],
    gap: theme.spacing[3],
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    color: theme.colors.neutral[1],
  },
  horizontalList: {
    paddingRight: theme.spacing[4],
    gap: theme.spacing[3],
  },
  separator: {
    width: theme.spacing[3],
  },
  vSeparator: {
    height: theme.spacing[2],
  },
  mapWrapper: {
    height: 160,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
  },
  loaderRow: {
    paddingVertical: theme.spacing[5],
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    gap: theme.spacing[3],
  },
  surpriseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[3],
  },
  surpriseCell1: {
    width: '100%',
  },
  surpriseCell2: {
    flexBasis: '48%',
    flexGrow: 1,
    minWidth: 0,
  },
  surpriseCell3: {
    flexBasis: '31%',
    flexGrow: 1,
    minWidth: 0,
  },
});
