import React from 'react';
import { Screen } from '../../../shared/ui/screen';
import { EmptyState } from '../../../widgets/empty-state';

export const BusinessForecastScreen = () => (
  <Screen scroll>
    <EmptyState icon="trending-up" title="Прогноз спроса" description="Экран появится в следующей итерации." />
  </Screen>
);
