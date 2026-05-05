import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';
import { useAuthStore } from '../../../../entities/auth/model/store';
import { useLogout } from '../../../../entities/auth/model/hooks';
import type { ClientStackParamList } from '../../../../navigation/types';
import { EcoStatsCard } from './EcoStatsCard';
import { ProfileMenuItem } from './ProfileMenuItem';
import { styles } from './styles';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

export interface ProfileLandingProps {
  onPressEdit?: () => void;
}

export const ProfileLanding = ({ onPressEdit }: ProfileLandingProps) => {
  const { t } = useTranslation('profile');
  const { t: tCommon } = useTranslation('common');
  const navigation = useNavigation<Nav>();
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  const goEdit = useCallback(() => {
    if (onPressEdit) onPressEdit();
    else navigation.navigate('ProfileEdit');
  }, [navigation, onPressEdit]);

  const goOrders = useCallback(
    () => navigation.navigate('ClientTabs', { screen: 'Orders' }),
    [navigation],
  );

  const goPlaceholder = useCallback(
    (route: 'Support' | 'Addresses' | 'NotificationsSettings' | 'About') =>
      navigation.navigate(route),
    [navigation],
  );

  return (
    <View style={{ gap: theme.spacing[4] }}>
      <View style={styles.card}>
        <View style={styles.identityRow}>
          <View style={styles.avatar}>
            <Icon name="user" size={28} color={theme.colors.primary[100]} />
          </View>
          <View style={styles.identityText}>
            <Text style={styles.name}>
              {user?.first_name ?? tCommon('profileFallback')}
            </Text>
            <TouchableOpacity
              style={styles.settingsLink}
              onPress={goEdit}
              accessibilityRole="button"
              accessibilityLabel={t('profile.settings')}
              activeOpacity={0.7}
            >
              <Text style={styles.settingsText}>{t('profile.settings')}</Text>
              <Icon name="chevron-right" size={14} color={theme.colors.neutral[3]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <EcoStatsCard />

      <View style={styles.card}>
        <View style={styles.menuList}>
          <ProfileMenuItem icon="message-square" label={t('profile.menu.orders')} onPress={goOrders} />
          <ProfileMenuItem icon="help-circle" label={t('profile.menu.support')} onPress={() => goPlaceholder('Support')} />
          <ProfileMenuItem icon="map-pin" label={t('profile.menu.addresses')} onPress={() => goPlaceholder('Addresses')} />
          <ProfileMenuItem icon="bell" label={t('profile.menu.notifications')} onPress={() => goPlaceholder('NotificationsSettings')} />
          <ProfileMenuItem icon="info" label={t('profile.menu.about')} onPress={() => goPlaceholder('About')} />
          <ProfileMenuItem
            icon="log-out"
            label={t('profile.menu.logout')}
            onPress={() => logout.mutate()}
            destructive
          />
        </View>
      </View>
    </View>
  );
};
