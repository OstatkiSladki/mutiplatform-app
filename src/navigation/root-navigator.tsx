import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './auth-navigator';
import { ClientStack } from './client-stack';
import { BusinessTabs } from './business-tabs';
import { useAuthStore } from '../entities/auth/model/store';
import type { UserProfileResponse } from '../entities/auth/model/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const isBusinessUser = (user: UserProfileResponse | null): boolean =>
  user?.role === 'staff' || user?.role === 'admin' || !!user?.staff_profile;

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : isBusinessUser(user) ? (
        <Stack.Screen name="Business" component={BusinessTabs} />
      ) : (
        <Stack.Screen name="Client" component={ClientStack} />
      )}
    </Stack.Navigator>
  );
};
