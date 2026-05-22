import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';
import { clientTextParagraphBase } from '../../../shared/config/theme/client-text-styles';
import { clientWebShellLayout } from '../../../shared/lib/client-web-shell';

export const styles = StyleSheet.create({
  bar: {
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: theme.client.colors.background,
    marginTop: theme.spacing[8],
  },
  column: {
    width: '100%',
    maxWidth: clientWebShellLayout.columnMaxWidth,
    alignSelf: 'center',
    paddingTop: theme.spacing[8],
    paddingBottom: theme.spacing[6],
    gap: theme.spacing[7],
  },
  topRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: theme.spacing[8],
  },
  brandRow: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 280,
    minWidth: 240,
    gap: theme.spacing[3],
  },
  logo: {
    width: theme.client.chrome.headerLogoWidth,
    height: theme.client.chrome.headerLogoHeight,
  },
  tagline: {
    ...clientTextParagraphBase,
    color: theme.client.colors.mutedForeground,
    maxWidth: 360,
  },
  columns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 480,
    gap: theme.spacing[8],
  },
  columnBlock: {
    minWidth: 140,
    flexGrow: 1,
    flexBasis: 140,
    gap: theme.spacing[3],
  },
  columnTitle: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 20,
    color: theme.client.colors.foreground,
  },
  links: {
    gap: theme.spacing[2],
  },
  link: {
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing[1],
  },
  linkText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 20,
    color: theme.colors.neutral[3],
  },
  linkTextHovered: {
    color: theme.colors.primary[100],
  },
  contactText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 22,
    color: theme.colors.neutral[3],
  },
  contactLink: {
    color: theme.colors.primary[100],
  },
  bottomBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[4],
    paddingTop: theme.spacing[5],
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[7],
  },
  copyright: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    lineHeight: 18,
    color: theme.client.colors.mutedForeground,
  },
  legalLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.spacing[5],
  },
  legalLink: {
    paddingVertical: theme.spacing[1],
  },
  legalLinkText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    lineHeight: 18,
    color: theme.colors.neutral[4],
    ...(Platform.OS === 'web'
      ? ({ textDecorationLine: 'underline' } as object)
      : null),
  },
});
