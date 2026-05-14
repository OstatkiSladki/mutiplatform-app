import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../avatar';
import { Icon, IconName } from '../icon';
import { theme } from '../../config/theme';
import { styles } from './styles';

export interface ProfileMenuProps {
  userName: string;
  onOrders: () => void;
  onSettings: () => void;
  onSupport: () => void;
  onNotifications: () => void;
  onAbout: () => void;
  onLogout: () => void;
}

interface MenuItemProps {
  icon: IconName;
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

const MenuItem = ({ icon, label, onPress, destructive }: MenuItemProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    <Icon
      name={icon}
      size={16}
      color={
        destructive
          ? theme.client.colors.destructive
          : theme.client.colors.foreground
      }
    />
    <Text
      style={[styles.itemLabel, destructive ? styles.itemLabelDestructive : null]}
    >
      {label}
    </Text>
  </Pressable>
);

export const ProfileMenu = ({
  userName,
  onOrders,
  onSettings,
  onSupport,
  onNotifications,
  onAbout,
  onLogout,
}: ProfileMenuProps) => {
  const { t } = useTranslation('common');

  return (
    <View>
      <View style={styles.header}>
        <Avatar name={userName} size="md" />
        <View style={styles.headerText}>
          <Text style={styles.headerName} numberOfLines={1}>
            {userName}
          </Text>
          <Pressable
            onPress={onSettings}
            accessibilityRole="link"
            accessibilityLabel={t('header.settingsLink')}
          >
            <Text style={styles.headerLink}>
              {t('header.settingsLink')} ›
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <MenuItem
          icon="clipboard"
          label={t('header.menu.orders')}
          onPress={onOrders}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <MenuItem
          icon="help-circle"
          label={t('header.menu.support')}
          onPress={onSupport}
        />
        <MenuItem
          icon="bell"
          label={t('header.menu.notifications')}
          onPress={onNotifications}
        />
        <MenuItem
          icon="settings"
          label={t('header.menu.about')}
          onPress={onAbout}
        />
        <MenuItem
          icon="log-out"
          label={t('header.menu.logout')}
          onPress={onLogout}
          destructive
        />
      </View>
    </View>
  );
};
