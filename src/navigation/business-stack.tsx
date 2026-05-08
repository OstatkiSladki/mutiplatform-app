import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { BusinessStackParamList } from './types';
import { BusinessLayout } from '../widgets/business-layout';
import { BusinessOverviewScreen } from '../screens/business/overview';
import { BusinessForecastScreen } from '../screens/business/forecast';
import { BusinessOffersScreen } from '../screens/business/offers';
import { BusinessOrdersScreen } from '../screens/business/orders';

const Stack = createNativeStackNavigator<BusinessStackParamList>();

const OverviewWithLayout = () => (
  <BusinessLayout routeName="Overview">
    <BusinessOverviewScreen />
  </BusinessLayout>
);

const ForecastWithLayout = () => (
  <BusinessLayout routeName="Forecast">
    <BusinessForecastScreen />
  </BusinessLayout>
);

const OffersWithLayout = () => (
  <BusinessLayout routeName="Offers">
    <BusinessOffersScreen />
  </BusinessLayout>
);

const OrdersWithLayout = () => (
  <BusinessLayout routeName="Orders">
    <BusinessOrdersScreen />
  </BusinessLayout>
);

export const BusinessStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Overview" component={OverviewWithLayout} />
    <Stack.Screen name="Forecast" component={ForecastWithLayout} />
    <Stack.Screen name="Offers" component={OffersWithLayout} />
    <Stack.Screen name="Orders" component={OrdersWithLayout} />
  </Stack.Navigator>
);
