import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import SplashPage from '../pages/splash';
import { getOnboardingCompleted } from '../pages/onboarding/model';

type Nav = NativeStackNavigationProp<RootStackParamList>;

/** Shown once at cold start; hands off after fade (~600ms). */
const SPLASH_HANDOFF_MS = 650;

export const SplashScreen = () => {
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    let cancelled = false;
    const timeoutId = setTimeout(() => {
      void (async () => {
        try {
          const done = await getOnboardingCompleted();
          if (cancelled) return;
          navigation.replace(done ? 'Client' : 'Onboarding');
        } catch {
          if (!cancelled) navigation.replace('Onboarding');
        }
      })();
    }, SPLASH_HANDOFF_MS);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [navigation]);

  return <SplashPage />;
};
