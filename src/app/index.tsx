import '../shared/i18n';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { AppProvider } from './providers';
import { RootNavigator } from '../navigation';

export const AppEntry = () => (
  <AppProvider>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    <StatusBar style="auto" />
    <Toast />
  </AppProvider>
);
