import React, { useState } from 'react';
import { type ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../shared/ui/button';
import { theme } from '../../../shared/config/theme';
import { selectDeliveryAddress, useUserAddressStore } from '../../../entities/location';
import { AddressPickerModal } from '../../../features/address-picker';
import { styles } from './styles';

export interface HeaderAddressButtonProps {
  style?: ViewStyle;
}

export const HeaderAddressButton = ({ style }: HeaderAddressButtonProps) => {
  const { t } = useTranslation('common');
  const address = useUserAddressStore(selectDeliveryAddress);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="pill"
        icon="map-pin"
        iconSize={16}
        iconColor={theme.colors.primary[100]}
        title={address.address}
        titleStyle={styles.headerAddressPillText}
        accessibilityLabel={t('header.locationA11y')}
        onPress={() => setOpen(true)}
        style={[styles.headerChromePill, styles.headerAddressPill, style]}
      />
      <AddressPickerModal visible={open} onClose={() => setOpen(false)} />
    </>
  );
};
