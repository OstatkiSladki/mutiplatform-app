import React from 'react';
import { ScreenContainer } from '@/shared/ui/layout';
import { SplashContent } from '@/widgets/splash';

export function SplashScreen() {
  return (
    <ScreenContainer 
      withSafeArea={false} 
      paddingHorizontal={0}
    >
      <SplashContent />
    </ScreenContainer>
  );
}
