import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './auth-navigator';
import { ClientStack } from './client-stack';
import { BusinessTabs } from './business-tabs';
import { BusinessBlockedScreen } from '../screens/business/blocked';
import { useAuthStore } from '../entities/auth/model/store';
import { useBreakpoint } from '../shared/lib/responsive';
import type { UserProfileResponse } from '../entities/auth/model/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const isBusinessUser = (user: UserProfileResponse | null): boolean =>
  user?.role === 'staff' || user?.role === 'admin' || !!user?.staff_profile;

const BusinessGate = () => {
  const { isWeb, isAtLeast } = useBreakpoint();
  const eligible = isWeb && isAtLeast('md');
  return eligible ? <BusinessTabs /> : <BusinessBlockedScreen />;
};

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : isBusinessUser(user) ? (
        <Stack.Screen name="Business" component={BusinessGate} />
      ) : (
        <Stack.Screen name="Client" component={ClientStack} />
      )}
    </Stack.Navigator>
  );
};
