import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './auth-navigator';
import { MainTabs } from './main-tabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  // TODO: Replace with actual auth state from Zustand or Context
  const isAuthenticated = false;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
