import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientStackParamList } from './types';
import { ClientTabs } from './client-tabs';
import { VenueScreen } from '../screens/client/venue';
import { BookingScreen } from '../screens/client/booking';
import { ProfileEditScreen } from '../screens/client/profile-edit';
import { PlaceholderScreen } from '../screens/client/placeholder';

const Stack = createNativeStackNavigator<ClientStackParamList>();

export const ClientStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ClientTabs" component={ClientTabs} />
    <Stack.Screen name="Venue" component={VenueScreen} />
    <Stack.Screen name="Booking" component={BookingScreen} />
    <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    <Stack.Screen name="Support" component={PlaceholderScreen} />
    <Stack.Screen name="Addresses" component={PlaceholderScreen} />
    <Stack.Screen name="NotificationsSettings" component={PlaceholderScreen} />
    <Stack.Screen name="About" component={PlaceholderScreen} />
  </Stack.Navigator>
);
