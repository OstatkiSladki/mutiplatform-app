import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../config/theme';
import { HomeHeader } from '../home-header/HomeHeader';
import type { HomeHeaderProps } from '../home-header/HomeHeader';
import { HomeSearchBar } from '../search-bar/SearchBar';

/** Single mobile chrome: same header + search bar as Home everywhere (no stack/back row). */
export interface MobileScreenChromeProps
  extends Pick<
    HomeHeaderProps,
    'address' | 'onPressNotifications' | 'onPressProfile' | 'onPressCart'
  > {
  horizontalInset?: number;
  /** When false, uses SafeAreaView top edges (standalone chrome). When true, plain View (nested under screen SafeArea). */
  omitSafeArea?: boolean;
  searchValue: string;
  searchPlaceholder: string;
  onSearchChange: (next: string) => void;
}

export const MobileScreenChrome = ({
  horizontalInset = theme.spacing[3],
  omitSafeArea = false,
  searchValue,
  searchPlaceholder,
  onSearchChange,
  address,
  onPressNotifications,
  onPressProfile,
  onPressCart,
}: MobileScreenChromeProps) => {
  const inner = (
    <View style={[styles.inner, { paddingHorizontal: horizontalInset }]}>
      <HomeHeader
        address={address}
        onPressNotifications={onPressNotifications}
        onPressProfile={onPressProfile}
        onPressCart={onPressCart}
      />
      <HomeSearchBar value={searchValue} placeholder={searchPlaceholder} onChange={onSearchChange} />
    </View>
  );

  if (omitSafeArea) {
    return <View style={styles.safeBg}>{inner}</View>;
  }

  return (
    <SafeAreaView style={styles.safeBg} edges={['top', 'left', 'right']}>
      {inner}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeBg: {
    backgroundColor: theme.client.colors.card,
  },
  inner: {
    gap: theme.spacing[5],
    paddingBottom: theme.spacing[2],
  },
});
