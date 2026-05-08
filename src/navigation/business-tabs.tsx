import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { BusinessTabsParamList } from './types';
import { BusinessDashboardScreen } from '../screens/business/dashboard';
import { Icon } from '../shared/ui/icon';
import { theme } from '../shared/config/theme';

const Tab = createBottomTabNavigator<BusinessTabsParamList>();

export const BusinessTabs = () => {
  const { t } = useTranslation('common');
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary[100],
        tabBarInactiveTintColor: theme.colors.neutral[5],
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamilies.inter,
          fontSize: theme.typography.fontSizes[2],
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={BusinessDashboardScreen}
        options={{
          tabBarLabel: t('tabs.businessDashboard'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="briefcase" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
