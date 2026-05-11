import React from 'react';
import { useOnboarding } from '../model/use-onboarding';
import { TutorialScreen } from '../../../screens/Tutorial';

export const OnboardingFlow = () => {
  const { completeTutorial } = useOnboarding();

  return <TutorialScreen onComplete={completeTutorial} />;
};
