import React from 'react';
import { ClientTopHeader } from '../../../../widgets/client-top-header';

export interface HomeHeaderProps {
  address?: string;
  onPressNotifications?: () => void;
  onPressProfile?: () => void;
  onPressCart?: () => void;
}

export const HomeHeader = ({
  address = 'проспект Ленина, 107/1',
  onPressNotifications,
  onPressProfile,
  onPressCart,
}: HomeHeaderProps) => (
  <ClientTopHeader
    address={address}
    onPressNotifications={onPressNotifications}
    onPressProfile={onPressProfile}
    onPressCart={onPressCart}
  />
);
