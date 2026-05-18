import { StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';

const SHEET_TOP_RADIUS = theme.spacing[6];

/** Белая панель авторизации: во всю ширину экрана, только верх скруглён, тянется к низу. */
export const authFormSheetStyles = StyleSheet.create({
  sheet: {
    flexGrow: 1,
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: theme.colors.neutral.white,
    borderTopLeftRadius: SHEET_TOP_RADIUS,
    borderTopRightRadius: SHEET_TOP_RADIUS,
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[4],
    ...theme.client.shadows.authLoginCard,
  },
});
