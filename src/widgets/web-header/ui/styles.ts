import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  bar: {
    width: '100%',
    backgroundColor: theme.colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[8],
    zIndex: 10,
    ...(Platform.OS === 'web' ? ({ position: 'sticky', top: 0 } as object) : null),
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: theme.layout.containerMaxWidth,
    alignSelf: 'center',
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[3],
    gap: theme.spacing[6],
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  brandText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[7],
    fontWeight: theme.typography.fontWeights.interBold,
    color: theme.colors.primary[100],
    letterSpacing: theme.typography.letterSpacing[3],
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing[2],
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.radius.md,
  },
  tabActive: {
    backgroundColor: theme.colors.primary[10],
  },
  tabLabel: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[4],
    fontWeight: theme.typography.fontWeights.interRegular,
    color: theme.colors.neutral[3],
  },
  tabLabelActive: {
    color: theme.colors.primary[100],
    fontWeight: theme.typography.fontWeights.interBold,
  },
  spacer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
});
