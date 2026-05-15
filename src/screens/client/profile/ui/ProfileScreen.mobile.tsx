import React, { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../../shared/config/theme';
import { useAuthStore } from '../../../../entities/auth/model/store';
import { useLogout } from '../../../../entities/auth/model/hooks';
import { AuthRequiredScreen } from '../../../../widgets/auth-required';
import type { ClientStackParamList } from '../../../../navigation/types';
import { EcoStatsCardMobile } from './EcoStatsCard.mobile';
import { ProfileInfoCard } from './ProfileInfoCard.mobile';
import { ProfileMenuCard } from './ProfileMenuCard.mobile';
import { ProfileTopBar } from './ProfileTopBar.mobile';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const ProfileScreenMobile = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <AuthRequiredScreen />;
  return <ProfileScreenMobileContent />;
};

const ProfileScreenMobileContent = () => {
  const { t } = useTranslation('profile');
  const { t: tCommon } = useTranslation('common');
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  const pagePadding = width >= theme.breakpoints.md ? theme.spacing[6] : theme.spacing[4];

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goEdit = useCallback(() => {
    navigation.navigate('ProfileEdit');
  }, [navigation]);

  const goOrders = useCallback(() => {
    navigation.navigate('ClientTabs', { screen: 'Cart' });
  }, [navigation]);

  const goPlaceholder = useCallback(
    (route: 'Support' | 'Addresses' | 'NotificationsSettings' | 'About') => {
      navigation.navigate(route);
    },
    [navigation],
  );

  const menuItems = useMemo(
    () => [
      { icon: 'orders' as const, label: t('profile.menu.orders'), onPress: goOrders },
      { icon: 'support' as const, label: t('profile.menu.support'), onPress: () => goPlaceholder('Support') },
      { icon: 'addresses' as const, label: t('profile.menu.addresses'), onPress: () => goPlaceholder('Addresses') },
      {
        icon: 'notifications' as const,
        label: t('profile.menu.notifications'),
        onPress: () => goPlaceholder('NotificationsSettings'),
      },
      { icon: 'about' as const, label: t('profile.menu.about'), onPress: () => goPlaceholder('About') },
      {
        icon: 'logout' as const,
        label: t('profile.menu.logout'),
        onPress: () => logout.mutate(),
        destructive: true,
      },
    ],
    [goOrders, goPlaceholder, logout, t],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: pagePadding,
            paddingBottom: insets.bottom + theme.spacing[5],
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ProfileTopBar title={t('profile.title')} onBack={goBack} backA11yLabel={tCommon('back')} />
        <ProfileInfoCard
          displayName={user?.first_name ?? tCommon('profileFallback')}
          settingsLabel={t('profile.settings')}
          onPressSettings={goEdit}
        />
        <EcoStatsCardMobile />
        <ProfileMenuCard items={menuItems} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.client.colors.card,
  },
  scroll: {
    flex: 1,
    backgroundColor: theme.client.colors.card,
  },
  content: {
    flexGrow: 1,
    gap: theme.spacing[5],
    paddingTop: theme.spacing[4],
  },
});
