import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../shared/ui/icon';
import { theme } from '../../shared/config/theme';
import { useAuthStore } from '../../entities/auth/model/store';
import type { BusinessStackParamList } from '../../navigation/types';
import { styles } from './styles';

type BusinessRoute = keyof BusinessStackParamList;

interface BusinessTopbarProps {
  routeName: BusinessRoute;
}

const ROUTE_KEY: Record<BusinessRoute, string> = {
  Overview: 'overview',
  Forecast: 'forecast',
  Offers: 'offers',
  Orders: 'orders',
};

function getInitials(firstName: string, lastName: string | null): string {
  const first = firstName.charAt(0).toUpperCase();
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last;
}

const b = theme.business;

export const BusinessTopbar = ({ routeName }: BusinessTopbarProps) => {
  const { t } = useTranslation('business');
  const user = useAuthStore((s) => s.user);

  const key = ROUTE_KEY[routeName];
  const title = t(`layout.titles.${key}`);
  const subtitle = t(`layout.subtitles.${key}`);

  const initials = user ? getInitials(user.first_name, user.last_name) : 'U';
  const displayName = user
    ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`
    : t('layout.userFallback');
  const roleLabel = user?.staff_profile?.role ?? user?.role ?? '';

  return (
    <View style={styles.topbar}>
      <View>
        <Text style={styles.topbarTitle}>{title}</Text>
        <Text style={styles.topbarSubtitle}>{subtitle}</Text>
      </View>

      <View style={styles.topbarRight}>
        <View style={styles.searchWrapper} accessibilityRole="search">
          <Icon name="search" size={16} color={b.colors.mutedForeground} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('layout.searchPlaceholder')}
            placeholderTextColor={b.colors.mutedForeground}
            editable={false}
            accessibilityLabel={t('layout.searchPlaceholder')}
          />
        </View>

        <Pressable
          style={styles.userPill}
          accessibilityRole="button"
          accessibilityLabel={t('layout.userMenuLabel')}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.userInfoBlock}>
            <Text style={styles.userName}>{displayName}</Text>
            {roleLabel ? <Text style={styles.userRoleText}>{roleLabel}</Text> : null}
          </View>
          <Icon name="chevron-down" size={16} color={b.colors.mutedForeground} />
        </Pressable>
      </View>
    </View>
  );
};
