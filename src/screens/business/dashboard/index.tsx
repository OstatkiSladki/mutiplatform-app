import React from 'react';
import { Screen } from '../../../shared/ui/screen';
import { EmptyState } from '../../../widgets/empty-state';

export const BusinessDashboardScreen = () => (
  <Screen scroll>
    <EmptyState
      icon="briefcase"
      title="Кабинет заведения"
      description="Бизнес-интерфейс появится позже."
    />
  </Screen>
);
