import React from 'react';
import { Screen } from '../../../shared/ui/screen';
import { EmptyState } from '../../../widgets/empty-state';

export const BusinessOffersScreen = () => (
  <Screen scroll>
    <EmptyState icon="layers" title="Предложения" description="Экран появится в следующей итерации." />
  </Screen>
);
