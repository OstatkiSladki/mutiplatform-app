import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientStackParamList } from './types';
import { ClientTabs } from './client-tabs';
import { VenueScreen } from '../screens/client/venue';
import { BookingScreen } from '../screens/client/booking';
import { ProductDetailsScreen } from '../screens/client/product-details';

const Stack = createNativeStackNavigator<ClientStackParamList>();

export const ClientStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ClientTabs" component={ClientTabs} />
    <Stack.Screen name="Venue" component={VenueScreen} />
    <Stack.Screen name="Booking" component={BookingScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
  </Stack.Navigator>
);
