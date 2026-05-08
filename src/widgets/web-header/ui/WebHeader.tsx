import { Pressable, Text, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '../../../shared/ui/icon';
import { theme } from '../../../shared/config/theme';
import type { ClientTabsParamList } from '../../../navigation/types';
import { styles } from './styles';

const tabIcons: Record<keyof ClientTabsParamList, IconName> = {
  Home: 'home',
  Cart: 'shopping-bag',
  Orders: 'package',
  Profile: 'user',
};

const tabLabelKeys: Record<keyof ClientTabsParamList, string> = {
  Home: 'tabs.home',
  Cart: 'tabs.cart',
  Orders: 'tabs.orders',
  Profile: 'tabs.profile',
};

export function WebHeader({ state, navigation }: BottomTabBarProps) {
  const { t } = useTranslation('common');

  return (
    <View style={styles.bar}>
      <View style={styles.inner}>
        <Pressable
          style={styles.brand}
          onPress={() => navigation.navigate('Home')}
          accessibilityRole="button"
        >
          <Text style={styles.brandText}>{t('brand')}</Text>
        </Pressable>

        <View style={styles.tabs}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const routeName = route.name as keyof ClientTabsParamList;
            const label = t(tabLabelKeys[routeName]);
            const iconName = tabIcons[routeName];

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const iconColor = isFocused
              ? theme.colors.primary[100]
              : theme.colors.neutral[3];

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={[styles.tab, isFocused && styles.tabActive]}
                accessibilityRole="tab"
                accessibilityState={{ selected: isFocused }}
              >
                <Icon name={iconName} size={18} color={iconColor} />
                <Text
                  style={[styles.tabLabel, isFocused && styles.tabLabelActive]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.spacer} />
      </View>
    </View>
  );
}
