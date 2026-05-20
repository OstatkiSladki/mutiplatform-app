import '../shared/i18n';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
  type LinkingOptions,
  type NavigationState,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { AppProvider } from './providers';
import { RootNavigator } from '../navigation';
import { MobileBottomNav } from '../widgets/mobile-bottom-nav';
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

export const AppEntry = () => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const [rootState, setRootState] = useState<NavigationState | undefined>();

  return (
    <AppProvider>
      <NavigationContainer
        ref={navigationRef}
        linking={linking}
        onReady={() => setRootState(navigationRef.getRootState())}
        onStateChange={setRootState}
      >
        <RootNavigator />
        <MobileBottomNav navigationRef={navigationRef} rootState={rootState} />
      </NavigationContainer>
      <StatusBar style="auto" />
      <Toast />
    </AppProvider>
  );
};
