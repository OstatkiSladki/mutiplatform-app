import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { ClientTabsParamList } from './types';
import { HomeScreen } from '../screens/client/home';
import { CartScreen } from '../screens/client/cart';
import { OrdersScreen } from '../screens/client/orders';
import { ProfileScreen } from '../screens/client/profile';
import { Icon, IconName } from '../shared/ui/icon';
import { theme } from '../shared/config/theme';
import { useBreakpoint } from '../shared/lib/responsive';
import { WebHeader } from '../widgets/web-header';

const Tab = createBottomTabNavigator<ClientTabsParamList>();

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

export const ClientTabs = () => {
  const { t } = useTranslation('common');
  const { isWeb, isAtLeast } = useBreakpoint();
  const useWebHeader = isWeb && isAtLeast('md');

  return (
    <Tab.Navigator
      tabBar={useWebHeader ? WebHeader : undefined}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary[100],
        tabBarInactiveTintColor: theme.colors.neutral[5],
        tabBarLabel: t(tabLabelKeys[route.name]),
        tabBarIcon: ({ color, size }) => (
          <Icon name={tabIcons[route.name]} size={size} color={color} />
        ),
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamilies.inter,
          fontSize: theme.typography.fontSizes[2],
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
