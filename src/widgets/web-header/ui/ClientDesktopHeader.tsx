import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../../../shared/ui/avatar';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';
import { Popover } from '../../../shared/ui/popover';
import { ProfileMenu } from '../../../shared/ui/profile-menu';
import { theme } from '../../../shared/config/theme';
import { getClientWebShellPadding } from '../../../shared/lib/client-web-shell';
import { useBreakpoint } from '../../../shared/lib/responsive';
import { clientAssets } from '../../../shared/assets/client';
import { useAuthStore } from '../../../entities/auth';
import { useLogout } from '../../../entities/auth/model/hooks';
import { showBusinessToast } from '../../../shared/lib/business-toast';
import type { ClientStackParamList, ClientTabsParamList } from '../../../navigation/types';
import { HeaderAddressButton } from './HeaderAddressButton';
import { HeaderCartPopover } from './HeaderCartPopover';
import { styles } from './styles';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

export interface ClientDesktopHeaderProps {
  activeTab?: keyof ClientTabsParamList;
}

export function ClientDesktopHeader(_props: ClientDesktopHeaderProps) {
  const { t } = useTranslation('common');
  const navigation = useNavigation<Nav>();
  const { isAtLeast } = useBreakpoint();
  const shellPadX = getClientWebShellPadding(isAtLeast);
  const [query, setQuery] = useState('');
  const user = useAuthStore((s) => s.user);
  const logoutMutation = useLogout();

  const goToTab = (tab: keyof ClientTabsParamList) =>
    navigation.navigate('ClientTabs', { screen: tab });

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
            <HeaderAddressButton />
            <HeaderCartPopover
              onVenuePress={(venueId) => navigation.navigate('Booking', { venueId })}
              onViewAll={() => goToTab('Cart')}
              onGoHome={() => goToTab('Home')}
            />

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
                    navigation.navigate('ProfileEdit');
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
