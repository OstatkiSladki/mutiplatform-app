import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../../../shared/ui/avatar';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';
import { Popover } from '../../../shared/ui/popover';
import { ProfileMenu } from '../../../shared/ui/profile-menu';
import { theme } from '../../../shared/config/theme';
import { useBreakpoint } from '../../../shared/lib/responsive';
import { clientAssets } from '../../../shared/assets/client';
import { useCartStore, selectTotalItemCount } from '../../../entities/order';
import { useAuthStore } from '../../../entities/auth';
import { useLogout } from '../../../entities/auth/model/hooks';
import { showBusinessToast } from '../../../shared/lib/business-toast';
import type { ClientStackParamList, ClientTabsParamList } from '../../../navigation/types';
import { styles } from './styles';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

export function WebHeader({ navigation }: BottomTabBarProps) {
  const { t } = useTranslation('common');
  const stackNav = useNavigation<Nav>();
  const { isAtLeast } = useBreakpoint();
  const shellPadX = isAtLeast('lg') ? theme.spacing[7] : theme.spacing[6];
  const [query, setQuery] = useState('');
  const cartCount = useCartStore(selectTotalItemCount);
  const user = useAuthStore((s) => s.user);
  const logoutMutation = useLogout();

  const goToTab = (tab: keyof ClientTabsParamList) => navigation.navigate(tab);

  return (
    <View style={styles.bar}>
      <View style={[styles.shell, { paddingHorizontal: shellPadX }]}>
        <View style={styles.inner}>
          <Pressable
            style={styles.brand}
            onPress={() => goToTab('Home')}
            accessibilityRole="button"
            accessibilityLabel={t('brand')}
          >
            <Image
              source={clientAssets.logoFull}
              style={styles.logoFull}
              contentFit="contain"
            />
          </Pressable>

          <View style={styles.searchWrap}>
            <Input
              variant="pill"
              pillTone="headerSearch"
              leadingIcon="search"
              value={query}
              onChangeText={setQuery}
              onClear={() => setQuery('')}
              placeholder={t('header.searchPlaceholder')}
              containerStyle={styles.searchInputContainer}
            />
          </View>

          <View style={styles.actions}>
            <Button
              variant="pill"
              icon="map-pin"
              iconSize={16}
              iconColor={theme.colors.primary[100]}
              title={t('header.locationDefault')}
              accessibilityLabel={t('header.locationA11y')}
              style={styles.headerChromePill}
            />
            <View>
              <Button
                variant="iconCircle"
                icon="shopping-bag"
                iconSize={16}
                accessibilityLabel={t('cartA11y')}
                onPress={() => goToTab('Cart')}
                style={styles.headerChromeIconCircle}
              />
              {cartCount > 0 ? (
                <View style={styles.cartBadge} pointerEvents="none">
                  <Text style={styles.cartBadgeText}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </Text>
                </View>
              ) : null}
            </View>

            <Popover
              align="end"
              width={320}
              trigger={({ open }) => (
                <Pressable
                  onPress={open}
                  accessibilityRole="button"
                  accessibilityLabel={t('header.profileA11y')}
                >
                  <Avatar name={user?.email ?? undefined} size="sm" style={styles.profileAvatar} />
                </Pressable>
              )}
            >
              {({ close }) => (
                <ProfileMenu
                  userName={user?.email ?? t('header.profileGuest')}
                  onOrders={() => {
                    close();
                    showBusinessToast(t('header.comingSoon'), 'info');
                  }}
                  onSettings={() => {
                    close();
                    stackNav.navigate('Profile');
                  }}
                  onSupport={() => {
                    close();
                    showBusinessToast(t('header.comingSoon'), 'info');
                  }}
                  onNotifications={() => {
                    close();
                    showBusinessToast(t('header.comingSoon'), 'info');
                  }}
                  onAbout={() => {
                    close();
                    showBusinessToast(t('header.comingSoon'), 'info');
                  }}
                  onLogout={() => {
                    close();
                    logoutMutation.mutate();
                  }}
                />
              )}
            </Popover>
          </View>
        </View>
      </View>
    </View>
  );
}
