import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../shared/ui/icon';
import { theme } from '../../shared/config/theme';
import type { BusinessStackParamList } from '../../navigation/types';
import { styles } from './styles';

type BusinessNav = NativeStackNavigationProp<BusinessStackParamList>;
type BusinessRoute = keyof BusinessStackParamList;
type IconName = ComponentProps<typeof Icon>['name'];

const b = theme.business;

const NAV_ITEMS: Array<{ route: BusinessRoute; icon: IconName; labelKey: string }> = [
  { route: 'Overview', icon: 'grid', labelKey: 'layout.nav.overview' },
  { route: 'Forecast', icon: 'bar-chart-2', labelKey: 'layout.nav.forecast' },
  { route: 'Offers', icon: 'layers', labelKey: 'layout.nav.offers' },
  { route: 'Orders', icon: 'map-pin', labelKey: 'layout.nav.orders' },
];

interface BusinessSidebarProps {
  activeRoute: BusinessRoute;
}

export const BusinessSidebar = ({ activeRoute }: BusinessSidebarProps) => {
  const navigation = useNavigation<BusinessNav>();
  const { t } = useTranslation('business');

  return (
    <View style={styles.sidebar}>
      <View style={styles.logoArea}>
        <Image
          source={require('../../../assets/logo-full.png')}
          style={styles.logoImage}
          accessibilityLabel={t('layout.logoAlt')}
        />
      </View>

      <View style={styles.navList}>
        {NAV_ITEMS.map(({ route, icon, labelKey }) => {
          const isActive = activeRoute === route;
          return (
            <Pressable
              key={route}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => navigation.navigate(route)}
              accessibilityRole="menuitem"
              accessibilityState={{ selected: isActive }}
            >
              <Icon
                name={icon}
                size={18}
                color={isActive ? b.colors.primary : b.colors.foreground}
              />
              <Text style={isActive ? styles.navLabelActive : styles.navLabelInactive}>
                {t(labelKey)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={styles.collapseBtn}
        accessibilityRole="button"
        accessibilityLabel={t('layout.collapseMenu')}
      >
        <Icon name="chevron-left" size={14} color={b.colors.mutedForeground} />
      </Pressable>
    </View>
  );
};
