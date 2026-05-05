import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.neutral.white,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
  },
  handleIndicator: {
    backgroundColor: theme.colors.neutral[7],
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[4],
  },
});
