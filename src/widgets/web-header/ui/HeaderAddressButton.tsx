import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../shared/ui/button';
import { theme } from '../../../shared/config/theme';
import { selectDeliveryAddress, useUserAddressStore } from '../../../entities/location';
import type { HeaderAddressButtonProps } from './HeaderAddressButton.web';

/** Native: no map modal — static pill. */
export const HeaderAddressButton = ({ style }: HeaderAddressButtonProps) => {
  const { t } = useTranslation('common');
  const address = useUserAddressStore(selectDeliveryAddress);

  return (
    <Button
      variant="pill"
      icon="map-pin"
      iconColor={theme.client.colors.primary}
      title={address.address}
      accessibilityLabel={t('header.locationA11y')}
      style={style}
    />
  );
};
