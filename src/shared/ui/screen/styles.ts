import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.neutral.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[7],
  },
  staticContent: {
    flex: 1,
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[3],
  },
  centered: {
    width: '100%',
    alignSelf: 'center',
  },
  scrollOuter: {
    flex: 1,
    width: '100%',
  },
  keyboardAvoiding: {
    flex: 1,
  },
});
