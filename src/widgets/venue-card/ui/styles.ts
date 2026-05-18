import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';
import {
  clientTextF6Heavy,
  clientTextParagraphBase,
  clientTextParagraphBaseHeavy,
} from '../../../shared/config/theme/client-text-styles';

const CARD_RADIUS = theme.spacing[5];
const chrome = theme.client.chrome;

/** Native carousel tile width (horizontal list). */
export const MOBILE_VENUE_CARD_WIDTH = theme.spacing[9] * 6;

export const styles = StyleSheet.create({
  cardBase: {
    borderRadius: CARD_RADIUS,
    backgroundColor: theme.colors.neutral.white,
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    overflow: 'hidden',
    ...theme.client.shadows.sectionSoft,
  },
  cardMobile: {
    width: MOBILE_VENUE_CARD_WIDTH,
  },
  /** Desktop: 4+ venues — опорная ширина; высота от обложки (aspect) + тело. */
  cardWebCarousel: {
    width: chrome.establishmentCardWidth,
    maxWidth: '100%',
    flexDirection: 'column',
  },
  /** Desktop: 1–3 venues — равные колонки, высота по контенту. */
  cardWebRowFluid: {
    flex: 1,
    minWidth: 0,
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
  coverWrapWeb: {
    flex: 1,
    width: '100%',
    minHeight: 0,
  },
  coverImageWeb: {
    width: '100%',
    height: '100%',
  },
  coverMobile: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderTopLeftRadius: CARD_RADIUS,
    borderTopRightRadius: CARD_RADIUS,
  },
  body: {
    padding: theme.spacing[4],
    gap: theme.spacing[3],
    flexShrink: 0,
  },
  name: {
    ...clientTextF6Heavy,
  },
  tags: {
    ...clientTextParagraphBase,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    marginTop: theme.spacing[2],
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  metaText: {
    ...clientTextParagraphBase,
  },
  metaTextStrong: {
    ...clientTextParagraphBaseHeavy,
  },
  metaSpacer: {
    flex: 1,
  },
});
