import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';
import { clientTextF6Regular } from '../../../shared/config/theme/client-text-styles';

const fs14 = theme.typography.fontSizes[4];
const lh120 = Math.round(fs14 * (theme.typography.lineHeights.normal as number));

/** Web ≥1200px — chip labels match Action Button Small (14px, lh 120%). */
export const surpriseBoxBuilderWebStyles = StyleSheet.create({
  groupLabelF6: {
    ...clientTextF6Regular,
  },
  chipLabelActionSmall: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontWeight: '400',
    fontSize: fs14,
    lineHeight: lh120,
  },
});
