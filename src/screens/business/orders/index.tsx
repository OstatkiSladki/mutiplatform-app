import React from 'react';
import { Screen } from '../../../shared/ui/screen';
import { EmptyState } from '../../../widgets/empty-state';

export const BusinessOrdersScreen = () => (
  <Screen scroll>
    <EmptyState icon="shopping-bag" title="Заказы" description="Экран появится в следующей итерации." />
  </Screen>
);
