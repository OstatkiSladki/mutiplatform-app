import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

const chrome = theme.client.chrome;

export const styles = StyleSheet.create({
  bar: {
    width: '100%',
    backgroundColor: theme.client.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[8],
    zIndex: 10,
    ...(Platform.OS === 'web' ? ({ position: 'sticky', top: 0 } as object) : null),
  },
  shell: {
    width: '100%',
    maxWidth: theme.layout.clientShellMaxWidth,
    alignSelf: 'center',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: theme.layout.clientColumnMaxWidth,
    alignSelf: 'center',
    paddingVertical: theme.spacing[4],
    gap: theme.spacing[6],
    minHeight: chrome.headerBarHeight + theme.spacing[4],
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexShrink: 0,
  },
  logoFull: {
    width: chrome.headerLogoWidth,
    height: chrome.headerLogoHeight,
    minWidth: chrome.headerLogoWidth,
    minHeight: chrome.headerLogoHeight,
    flexShrink: 0,
  },
  searchWrap: {
    flex: 1,
    minWidth: theme.spacing[10],
  },
  searchInputContainer: {
    marginBottom: 0,
  },
  /** Pill address + same vertical rhythm as search (34px). */
  headerChromePill: {
    height: chrome.headerBarHeight,
    minHeight: chrome.headerBarHeight,
    maxHeight: chrome.headerBarHeight,
    paddingVertical: 0,
    paddingHorizontal: theme.spacing[3],
  },
  headerAddressPill: {
    width: chrome.headerAddressPillWidth,
    minWidth: chrome.headerAddressPillWidth,
    maxWidth: chrome.headerAddressPillWidth,
    flexShrink: 0,
    overflow: 'hidden',
  },
  headerAddressPillText: {
    flex: 1,
    minWidth: 0,
  },
  headerChromeIconCircle: {
    width: chrome.headerBarHeight,
    height: chrome.headerBarHeight,
    minWidth: chrome.headerBarHeight,
    minHeight: chrome.headerBarHeight,
  },
  profileAvatar: {
    width: chrome.headerBarHeight,
    height: chrome.headerBarHeight,
    borderRadius: chrome.headerBarHeight / 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    gap: theme.spacing[3],
  },
  cartBadge: {
    position: 'absolute',
    top: -theme.spacing[1],
    right: -theme.spacing[1],
    minWidth: theme.spacing[4],
    height: theme.spacing[4],
    paddingHorizontal: theme.spacing[1],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: theme.colors.neutral.white,
    fontFamily: theme.typography.fontFamilies.sourceSansProBold,
    fontSize: theme.typography.fontSizes[1],
    fontWeight: '400',
  },
});
