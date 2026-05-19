import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';
import { clientTextParagraphBase, clientTextParagraphBaseHeavy } from '../../../shared/config/theme/client-text-styles';

export const styles = StyleSheet.create({
  root: {
    gap: theme.spacing[4],
  },
  group: {
    gap: theme.spacing[2],
  },
  groupLabel: {
    ...clientTextParagraphBaseHeavy,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  sizeHint: {
    flex: 1,
    ...clientTextParagraphBase,
  },
});
