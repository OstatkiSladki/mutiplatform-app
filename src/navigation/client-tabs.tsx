import React, { useCallback } from 'react';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { ClientTabsParamList } from './types';
import { HomeScreen } from '../screens/client/home';
import { NearbyScreen } from '../screens/client/nearby/index';
import { CatalogScreen } from '../screens/client/catalog/index';
import { CartScreen } from '../screens/client/cart';
import { VenueScreen } from '../screens/client/venue';
import { ProductDetailsScreen } from '../screens/client/product-details';
import { Icon, IconName } from '../shared/ui/icon';
import { theme } from '../shared/config/theme';
import { useBreakpoint } from '../shared/lib/responsive';
import { WebHeader } from '../widgets/web-header';

const Tab = createBottomTabNavigator<ClientTabsParamList>();
type VisibleClientTabName = Exclude<keyof ClientTabsParamList, 'Venue' | 'ProductDetails'>;

const webTabIcons: Record<VisibleClientTabName, IconName> = {
  Home: 'home',
  Nearby: 'map-pin',
  Catalog: 'package',
  Cart: 'shopping-bag',
};

const tabLabelKeys: Record<VisibleClientTabName, string> = {
  Home: 'tabs.home',
  Nearby: 'tabs.nearby',
  Catalog: 'tabs.catalog',
  Cart: 'tabs.cart',
};

const MobileTabIcon = ({
  routeName,
  focused,
}: {
  routeName: VisibleClientTabName;
  focused: boolean;
}) => {
  const stroke = focused ? theme.colors.primary[100] : theme.colors.neutral[7];

  if (routeName === 'Home') {
    return (
      <Svg width={32} height={32} viewBox="0 0 36 34" fill="none">
        <Path d="M32.5718 17.2614C34.9075 14.7756 35.6483 10.9206 34.399 7.75148C33.1497 4.58234 29.9736 2.25908 26.5637 2.02021C21.395 1.6581 16.0156 6.53853 15.8017 11.6952C15.7493 12.9563 16.0977 14.3865 17.1985 15.0119C18.223 15.594 19.6214 15.2215 20.39 14.3303C21.1585 13.4392 21.3519 12.1547 21.1097 11.005C20.8675 9.8552 20.2375 8.82155 19.514 7.89369C17.0721 4.76164 13.6849 1.72256 9.43632 2.02021C6.02648 2.25914 2.85033 4.58234 1.60104 7.75148C0.351747 10.9206 1.09245 14.7756 3.42824 17.2614" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M22.846 28.1152L19.3899 31.4639C18.6293 32.2008 17.4104 32.1733 16.6842 31.4027C15.7092 30.368 14.3977 28.9946 13.4902 28.1152" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M10.4548 24.9066C11.8896 23.5752 11.5381 20.8767 9.66967 18.8792C7.80127 16.8818 5.12351 16.3419 3.68872 17.6733C2.25394 19.0047 2.60546 21.7032 4.47386 23.7007C6.34226 25.6981 9.02002 26.238 10.4548 24.9066Z" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M31.8388 18.2676L27.0635 23.7964" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M25.1924 21.2988L28.7896 17.5039C30.5914 15.8984 34.9645 19.1917 33.0046 21.7394L29.4426 25.4972" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }

  if (routeName === 'Nearby') {
    return (
      <Svg width={32} height={32} viewBox="0 0 34 34" fill="none">
        <Path d="M26 13.9259C26 19.2094 19.9435 26.1976 17.7729 28.5482C17.36 28.9929 16.6506 28.9929 16.2271 28.5482C14.0459 26.2082 7.98943 19.2412 8.00001 13.9259C8.00001 8.99175 12.0341 5 17 5C21.9659 5 26 9.00234 26 13.9259Z" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M16.999 18.3104C19.338 18.3104 21.2343 16.4142 21.2343 14.0751C21.2343 11.736 19.338 9.83984 16.999 9.83984C14.6599 9.83984 12.7637 11.736 12.7637 14.0751C12.7637 16.4142 14.6599 18.3104 16.999 18.3104Z" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }

  if (routeName === 'Catalog') {
    return (
      <Svg width={32} height={32} viewBox="0 0 34 34" fill="none">
        <Path d="M7.59082 6.25H15.2041V15.2041H6.25V7.59082C6.25005 6.85033 6.85032 6.25005 7.59082 6.25Z" stroke={stroke} strokeWidth={1.5} />
        <Path d="M26.4092 6.25C27.1497 6.25 27.75 6.8503 27.75 7.59082V15.2041H18.7959V6.25H26.4092Z" stroke={stroke} strokeWidth={1.5} />
        <Path d="M15.2041 18.7949V27.749H7.59082C6.8503 27.749 6.25 27.1487 6.25 26.4082V18.7949H15.2041Z" stroke={stroke} strokeWidth={1.5} />
        <Path d="M27.75 18.7949V26.4082C27.75 27.1488 27.1497 27.749 26.4092 27.749H18.7959V18.7949H27.75Z" stroke={stroke} strokeWidth={1.5} />
      </Svg>
    );
  }

  return (
    <Svg width={32} height={32} viewBox="0 0 34 34" fill="none">
      <Path d="M9.35033 5.09961L5.66699 9.51961V24.9896C5.66699 25.5757 5.9257 26.1379 6.38621 26.5523C6.84671 26.9668 7.47129 27.1996 8.12255 27.1996H25.3114C25.9627 27.1996 26.5873 26.9668 27.0478 26.5523C27.5083 26.1379 27.767 25.5757 27.767 24.9896V9.51961L24.0837 5.09961H9.35033Z" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5.66699 9.51953H27.767" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M21.6269 13.9395C21.6269 15.1117 21.1095 16.236 20.1885 17.0649C19.2675 17.8938 18.0183 18.3595 16.7158 18.3595C15.4133 18.3595 14.1641 17.8938 13.2431 17.0649C12.3221 16.236 11.8047 15.1117 11.8047 13.9395" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
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
        tabBarInactiveTintColor: theme.colors.neutral[5],
        tabBarLabel:
          route.name === 'Venue' || route.name === 'ProductDetails' ? '' : t(tabLabelKeys[route.name]),
        tabBarIcon: ({ color, focused, size }) =>
          route.name === 'Venue' || route.name === 'ProductDetails' ? null : useWebHeader ? (
            <Icon name={webTabIcons[route.name]} size={size} color={color} />
          ) : (
            <MobileTabIcon routeName={route.name} focused={focused} />
          ),
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingTop: useWebHeader ? 0 : theme.spacing[4],
          paddingBottom: 0,
          justifyContent: useWebHeader ? 'center' : 'flex-start',
        },
        tabBarStyle: useWebHeader
          ? undefined
          : {
              height: 62 + insets.bottom,
              minHeight: 62 + insets.bottom,
              paddingTop: 0,
              paddingBottom: insets.bottom,
              borderTopWidth: 0,
              backgroundColor: theme.client.colors.card,
              shadowOpacity: 1,
              ...theme.shadows.tight[9],
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
      <Tab.Screen
        name="Venue"
        component={VenueScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
};

