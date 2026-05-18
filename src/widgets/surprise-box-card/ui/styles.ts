import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';
import {
  clientTextF6Heavy,
  clientTextParagraphBase,
} from '../../../shared/config/theme/client-text-styles';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.neutral.white,
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    padding: theme.spacing[6],
    gap: theme.spacing[4],
    ...theme.client.shadows.sectionSoft,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: theme.client.radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[1],
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    ...clientTextF6Heavy,
  },
  subtitle: {
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
  body: {
    gap: theme.spacing[4],
  },
  bodyWide: {
    flexDirection: 'row',
  },
  imageWrap: {
    borderRadius: theme.client.radius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.neutral[9],
    aspectRatio: 1,
  },
  imageWrapWide: {
    width: 130,
    height: 130,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  form: {
    gap: theme.spacing[4],
  },
  formWide: {
    flex: 1,
  },
});
