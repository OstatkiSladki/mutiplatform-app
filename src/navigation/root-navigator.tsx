import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './auth-navigator';
import { ClientStack } from './client-stack';
import { BusinessStack } from './business-stack';
import { BusinessBlockedScreen } from '../screens/business/blocked';
import { useAuthStore } from '../entities/auth/model/store';
import { useBreakpoint } from '../shared/lib/responsive';
import type { UserProfileResponse } from '../entities/auth/model/types';
import { SplashScreen } from './splash-screen';
import { OnboardingScreen } from './onboarding-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const isBusinessUser = (user: UserProfileResponse | null): boolean =>
  user?.role === 'staff' || user?.role === 'admin' || !!user?.staff_profile;

const BusinessGate = () => {
  const { isWeb, isAtLeast } = useBreakpoint();
  const eligible = isWeb && isAtLeast('md');
  return eligible ? <BusinessStack /> : <BusinessBlockedScreen />;
};

// TODO(M9): remove before production. Forces business stack for local dev only.
const DEV_FORCE_BUSINESS = false;

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  if (DEV_FORCE_BUSINESS) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Business" component={BusinessGate} />
      </Stack.Navigator>
    );
  }

  if (isAuthenticated && isBusinessUser(user)) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Business" component={BusinessGate} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Client" component={ClientStack} />
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
};
