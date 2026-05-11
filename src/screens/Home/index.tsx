import React from 'react';
import { ScreenContainer } from '../../shared/ui/layout';
import { OffersSection } from '../../widgets/home';

export const HomeScreen = () => {
  return (
    <ScreenContainer scrollable>
      <OffersSection />
    </ScreenContainer>
  );
};
