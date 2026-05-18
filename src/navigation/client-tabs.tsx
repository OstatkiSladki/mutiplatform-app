import React, { useCallback } from 'react';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClientTabsParamList } from './types';
import { HomeScreen } from '../screens/client/home';
import { NearbyScreen } from '../screens/client/nearby/index';
import { CatalogScreen } from '../screens/client/catalog/index';
import { CartScreen } from '../screens/client/cart';
import { Icon, IconName } from '../shared/ui/icon';
import { theme } from '../shared/config/theme';
import { useBreakpoint } from '../shared/lib/responsive';
import { WebHeader } from '../widgets/web-header';
import { MobileTabRouteIcon } from '../widgets/mobile-tab-route-icon';

const Tab = createBottomTabNavigator<ClientTabsParamList>();
type TabName = keyof ClientTabsParamList;

const webTabIcons: Record<TabName, IconName> = {
  Home: 'home',
  Nearby: 'map-pin',
  Catalog: 'package',
  Cart: 'shopping-bag',
};

const tabLabelKeys: Record<TabName, string> = {
  Home: 'tabs.home',
  Nearby: 'tabs.nearby',
  Catalog: 'tabs.catalog',
  Cart: 'tabs.cart',
};

export const ClientTabs = () => {
  const { t } = useTranslation('common');
  const { isWeb, isAtLeast } = useBreakpoint();
  const insets = useSafeAreaInsets();
  const useWebHeader = isWeb && isAtLeast('md');
  const renderWebHeader = useCallback(
    (props: BottomTabBarProps) => <WebHeader {...props} />,
    [],
  );

  return (
    <Tab.Navigator
      tabBar={useWebHeader ? renderWebHeader : undefined}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarPosition: useWebHeader ? 'top' : 'bottom',
        tabBarActiveTintColor: theme.colors.primary[100],
        tabBarInactiveTintColor: theme.colors.neutral[7],
        tabBarLabel: t(tabLabelKeys[route.name]),
        tabBarIcon: ({ focused }) =>
          useWebHeader ? (
            <Icon name={webTabIcons[route.name]} size={22} color={focused ? theme.colors.primary[100] : theme.colors.neutral[7]} />
          ) : (
            <MobileTabRouteIcon
              routeName={route.name}
              focused={focused}
              activeColor={theme.colors.primary[100]}
              inactiveColor={theme.colors.neutral[7]}
            />
          ),
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingTop: 0,
          paddingBottom: 0,
          justifyContent: 'center',
        },
        tabBarStyle: useWebHeader
          ? undefined
          : {
              height: 78 + insets.bottom,
              minHeight: 78 + insets.bottom,
              paddingTop: theme.spacing[4],
              paddingBottom: insets.bottom,
              borderTopWidth: 0,
              backgroundColor: theme.client.colors.card,
              borderTopLeftRadius: theme.client.radius.md,
              borderTopRightRadius: theme.client.radius.md,
              ...theme.client.shadows.tabBar,
            },
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamilies.inter,
          fontSize: theme.typography.fontSizes[2],
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Nearby" component={NearbyScreen} />
      <Tab.Screen name="Catalog" component={CatalogScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

