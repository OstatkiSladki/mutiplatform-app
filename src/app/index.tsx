import '../shared/i18n';
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, type LinkingOptions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { AppProvider } from './providers';
import { RootNavigator } from '../navigation';
import type { RootStackParamList } from '../navigation/types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes:
    Platform.OS === 'web' && typeof window !== 'undefined'
      ? [window.location.origin]
      : ['myapp://'],
  config: {
    screens: {
      Client: {
        screens: {
          ClientTabs: {
            screens: {
              Home: '',
              Nearby: 'nearby',
              Catalog: 'catalog',
              Cart: 'cart',
            },
          },
          Venue: 'venue/:venueId',
          Booking: 'booking/:venueId',
          Profile: 'profile',
          ProfileEdit: 'profile/edit',
          ProductDetails: 'product/:venueId',
          Support: 'support',
          Addresses: 'addresses',
          NotificationsSettings: 'notifications',
          About: 'about',
        },
      },
      Auth: {
        screens: {
          Login: 'login',
          Register: 'register',
        },
      },
    },
  },
};

export const AppEntry = () => (
  <AppProvider>
    <NavigationContainer linking={linking}>
      <RootNavigator />
    </NavigationContainer>
    <StatusBar style="auto" />
    <Toast />
  </AppProvider>
);
