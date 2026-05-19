import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';
import {
  clientTextF6Heavy,
  clientTextParagraphBase,
} from '../../../shared/config/theme/client-text-styles';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[4],
    borderRadius: theme.spacing[3],
  },
  rowHovered: {
    backgroundColor: theme.colors.neutral[9],
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: theme.client.radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[3],
  },
  body: {
    flex: 1,
    gap: theme.spacing[2],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[2],
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    ...clientTextF6Heavy,
  },
  address: {
    ...clientTextParagraphBase,
    marginTop: theme.spacing[1],
  },
  hours: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  hoursText: {
    ...clientTextParagraphBase,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[2],
  },
  tags: {
    flexDirection: 'row',
    gap: theme.spacing[2],
    flexWrap: 'wrap',
  },
});
