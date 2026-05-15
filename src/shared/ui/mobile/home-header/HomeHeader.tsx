import React from 'react';
import { ClientTopHeader } from '../../../../widgets/client-top-header';

export interface HomeHeaderProps {
  address?: string;
  onPressNotifications?: () => void;
  onPressProfile?: () => void;
}

export const HomeHeader = ({
  address = 'проспект Ленина, 107/1',
  onPressNotifications,
  onPressProfile,
}: HomeHeaderProps) => (
  <ClientTopHeader
    address={address}
    onPressNotifications={onPressNotifications}
    onPressProfile={onPressProfile}
  />
);
