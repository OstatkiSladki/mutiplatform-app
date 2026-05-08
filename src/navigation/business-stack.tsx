import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { BusinessStackParamList } from './types';
import { BusinessOverviewScreen } from '../screens/business/overview';
import { BusinessForecastScreen } from '../screens/business/forecast';
import { BusinessOffersScreen } from '../screens/business/offers';
import { BusinessOrdersScreen } from '../screens/business/orders';

const Stack = createNativeStackNavigator<BusinessStackParamList>();

export const BusinessStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Overview" component={BusinessOverviewScreen} />
    <Stack.Screen name="Forecast" component={BusinessForecastScreen} />
    <Stack.Screen name="Offers" component={BusinessOffersScreen} />
    <Stack.Screen name="Orders" component={BusinessOrdersScreen} />
  </Stack.Navigator>
);
