import React from 'react';
import { Screen } from '../../../shared/ui/screen';
import { EmptyState } from '../../../widgets/empty-state';

export const BusinessOverviewScreen = () => (
  <Screen scroll>
    <EmptyState icon="bar-chart-2" title="Обзор" description="Экран появится в следующей итерации." />
  </Screen>
);
