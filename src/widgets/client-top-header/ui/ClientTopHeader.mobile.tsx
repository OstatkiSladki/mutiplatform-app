import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../shared/config/theme';
import { Avatar } from '../../../shared/ui/avatar';
import { useAuthStore } from '../../../entities/auth';

const notificationIcon = require('../../../../assets/notification.png');

export interface ClientTopHeaderProps {
  address?: string;
  onPressNotifications?: () => void;
  onPressProfile?: () => void;
}

export const ClientTopHeader = ({
  address = 'проспект Ленина, 107/1',
  onPressNotifications,
  onPressProfile,
}: ClientTopHeaderProps) => {
  const { t } = useTranslation('common');
  const user = useAuthStore((s) => s.user);

  return (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.avatar}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={t('header.profileA11y')}
      onPress={onPressProfile}
      disabled={!onPressProfile}
    >
      <Avatar name={user?.email ?? undefined} size="sm" />
    </TouchableOpacity>
    <View style={styles.addressBlock}>
      <Text style={styles.addressLabel}>Адрес</Text>
      <Text style={styles.addressText} numberOfLines={1}>
        {address}
      </Text>
    </View>
    <TouchableOpacity
      style={styles.iconButton}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel="Уведомления"
      onPress={onPressNotifications}
    >
      <Image source={notificationIcon} style={styles.notificationIcon} contentFit="contain" />
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.neutral[8],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  addressBlock: {
    flex: 1,
    alignItems: 'center',
    minWidth: 0,
    gap: theme.spacing[1],
  },
  addressLabel: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    lineHeight: theme.typography.fontSizes[3] * theme.typography.lineHeights.normal,
    color: theme.client.colors.mutedForeground,
    fontWeight: '400',
  },
  addressText: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    fontWeight: '700',
    color: theme.client.colors.foreground,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: theme.client.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    width: 48,
    height: 48,
  },
});
