import { StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';
import {
  clientTextF4Heavy,
  clientTextHomeSectionTitle,
} from '../../../../shared/config/theme/client-text-styles';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.client.colors.background,
  },
  scrollOuter: {
    width: '100%',
    maxWidth: theme.layout.clientShellMaxWidth,
    alignSelf: 'center',
  },
  scrollContent: {
    paddingTop: theme.spacing[5],
    paddingBottom: theme.spacing[8],
    gap: theme.spacing[7],
  },
  shellInner: {
    width: '100%',
    maxWidth: theme.layout.clientColumnMaxWidth,
    alignSelf: 'center',
    gap: theme.spacing[7],
  },
  /** Рядом → Заведения → Сюрприз-бокс — шаг 56px по макету. */
  homeMajorSectionsStack: {
    gap: theme.layout.clientHomeMajorSectionsGap,
  },
  section: {
    gap: theme.spacing[4],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...clientTextF4Heavy,
  },
  /** Web — 32px SemiBold, line-height 120%. */
  sectionTitleWeb: {
    ...clientTextHomeSectionTitle,
  },
  sectionTitleWebWide: {
    ...clientTextHomeSectionTitle,
  },
  /** Обёртка «Рядом» — без padding, две панели 50/50 с gap. */
  nearbySectionSurface: {
    width: '100%',
    gap: theme.spacing[4],
  },
  nearbyGridDesktop: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    gap: theme.spacing[4],
    minHeight: theme.layout.nearbyDesktopPanelHeight,
  },
  nearbyMapShell: {
    flex: 1,
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    height: theme.layout.nearbyDesktopPanelHeight,
    borderRadius: theme.spacing[5],
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    overflow: 'hidden',
    backgroundColor: theme.colors.neutral[9],
  },
  nearbyMapDesktop: {
    flex: 1,
    width: '100%',
    height: '100%',
    minHeight: theme.layout.nearbyDesktopPanelHeight,
  },
  nearbyListSurface: {
    flex: 1,
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    height: theme.layout.nearbyDesktopPanelHeight,
    borderRadius: theme.spacing[5],
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    backgroundColor: theme.colors.neutral.white,
    overflow: 'hidden',
    ...theme.client.shadows.sectionSoft,
  },
  nearbyMapMobile: {
    width: '100%',
    height: 200,
    borderRadius: theme.spacing[5],
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    overflow: 'hidden',
    backgroundColor: theme.colors.neutral[9],
  },
  nearbyListSurfaceMobile: {
    width: '100%',
    borderRadius: theme.spacing[5],
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    backgroundColor: theme.colors.neutral.white,
    overflow: 'hidden',
    ...theme.client.shadows.sectionSoft,
  },
  nearbyListDesktop: {
    flex: 1,
    width: '100%',
  },
  nearbyListDesktopContent: {
    gap: theme.spacing[2],
    padding: theme.spacing[4],
  },
  nearbyListMobile: {
    gap: theme.spacing[2],
    padding: theme.spacing[4],
  },
  carouselWrap: {
    position: 'relative',
  },
  establishmentsRow: {
    flexDirection: 'row',
    gap: theme.spacing[4],
    width: '100%',
  },
  establishmentsRowCell: {
    flex: 1,
    minWidth: 0,
  },
  horizontalList: {
    paddingRight: theme.spacing[4],
    gap: theme.spacing[4],
  },
  separator: {
    width: theme.spacing[4],
  },
  listHairline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.neutral[8],
    marginVertical: theme.spacing[2],
  },
  loaderRow: {
    paddingVertical: theme.spacing[6],
    alignItems: 'center',
  },
  surpriseGrid: {
    width: '100%',
  },
  /** Native flex-сетка (веб использует CSS grid в SurpriseBoxesSection). */
  surpriseGridNativeGap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[6],
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
  surpriseCellWeb: {
    minWidth: 0,
    width: '100%',
  },
  carouselNext: {
    position: 'absolute',
    right: theme.spacing[2],
    top: '50%',
    width: theme.spacing[9],
    height: theme.spacing[9],
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.colors.neutral.white,
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -(theme.spacing[9] / 2) }],
    ...theme.client.shadows.sectionSoft,
  },
  scrollBottomSpacer: {
    height: theme.spacing[5],
  },
});
