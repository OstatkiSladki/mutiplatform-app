import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  panel: {
    ...theme.shadows.fluffy[3],
  },
  panelInner: {
    backgroundColor: theme.client.colors.popover,
    borderRadius: theme.client.radius.lg,
    padding: theme.spacing[4],
    borderWidth: 1,
    borderColor: theme.client.colors.border,
  },
  sheetBackground: {
    backgroundColor: theme.client.colors.popover,
  },
  sheetHandle: {
    backgroundColor: theme.client.colors.border,
    width: 40,
  },
  sheetContent: {
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[6],
    gap: theme.spacing[2],
  },
});
