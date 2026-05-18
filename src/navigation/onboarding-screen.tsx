import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { OnboardingPage } from '../pages/onboarding';
import { setOnboardingCompleted } from '../pages/onboarding/model';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const OnboardingScreen = () => {
  const navigation = useNavigation<Nav>();

  const handleComplete = useCallback(async () => {
    await setOnboardingCompleted();
    navigation.replace('Client');
  }, [navigation]);

  return <OnboardingPage onComplete={handleComplete} />;
};
