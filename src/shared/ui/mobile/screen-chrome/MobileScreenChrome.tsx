import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../config/theme';
import { Icon } from '../../icon';
import { HomeHeader } from '../home-header/HomeHeader';
import type { HomeHeaderProps } from '../home-header/HomeHeader';
import { HomeSearchBar } from '../search-bar/SearchBar';

export type MobileScreenChromeVariant = 'home' | 'stack';

export interface MobileScreenChromeProps extends Pick<HomeHeaderProps, 'address' | 'onPressNotifications' | 'onPressProfile'> {
  variant: MobileScreenChromeVariant;
  horizontalInset?: number;
  /** When false, uses SafeAreaView top edges (standalone chrome). When true, plain View (nested under screen SafeArea). */
  omitSafeArea?: boolean;
  searchValue: string;
  searchPlaceholder: string;
  onSearchChange: (next: string) => void;
  onBack?: () => void;
  backA11yLabel?: string;
  /** Catalog surprise layout: 30×30 back control on neutral[9] (Venue stack uses default 40×40 pill). */
  searchBackButtonVariant?: 'default' | 'compact';
}

export const MobileScreenChrome = ({
  variant,
  horizontalInset = theme.spacing[3],
  omitSafeArea = false,
  searchValue,
  searchPlaceholder,
  onSearchChange,
  onBack,
  backA11yLabel = 'Назад',
  searchBackButtonVariant = 'default',
  address,
  onPressNotifications,
  onPressProfile,
}: MobileScreenChromeProps) => {
  const compactBack = searchBackButtonVariant === 'compact';
  const inner = (
    <View style={[styles.inner, { paddingHorizontal: horizontalInset }]}>
      <HomeHeader
        address={address}
        onPressNotifications={onPressNotifications}
        onPressProfile={onPressProfile}
      />
      {variant === 'home' ? (
        <HomeSearchBar value={searchValue} placeholder={searchPlaceholder} onChange={onSearchChange} />
      ) : (
        <View style={styles.searchRow}>
          <TouchableOpacity
            style={[styles.iconButton, compactBack && styles.iconButtonCompact]}
            activeOpacity={0.75}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel={backA11yLabel}
          >
            <Icon
              name="arrow-left"
              size={compactBack ? 18 : 20}
              color={theme.client.colors.foreground}
            />
          </TouchableOpacity>
          <HomeSearchBar
            value={searchValue}
            placeholder={searchPlaceholder}
            onChange={onSearchChange}
            containerStyle={styles.searchFlex}
          />
        </View>
      )}
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: theme.client.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.client.colors.secondary,
  },
  iconButtonCompact: {
    width: 30,
    height: 30,
    borderRadius: theme.spacing[2] + theme.spacing[1] / 2,
    backgroundColor: theme.colors.neutral[9],
  },
  searchFlex: {
    flex: 1,
    width: undefined,
  },
});
