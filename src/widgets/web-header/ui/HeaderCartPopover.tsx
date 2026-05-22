import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../shared/ui/button';
import { CartMenu } from '../../../shared/ui/cart-menu';
import { Popover } from '../../../shared/ui/popover';
import { useCartStore, selectTotalItemCount } from '../../../entities/order';
import { styles } from './styles';

export interface HeaderCartPopoverProps {
  onVenuePress: (venueId: number) => void;
  onViewAll: () => void;
  onGoHome: () => void;
  buttonStyle?: ViewStyle;
}

export const HeaderCartPopover = ({
  onVenuePress,
  onViewAll,
  onGoHome,
  buttonStyle,
}: HeaderCartPopoverProps) => {
  const { t } = useTranslation('common');
  const cartCount = useCartStore(selectTotalItemCount);

  return (
    <Popover
      align="end"
      width={360}
      trigger={({ open }) => (
        <View>
          <Button
            variant="iconCircle"
            icon="shopping-bag"
            iconSize={16}
            accessibilityLabel={t('cartA11y')}
            onPress={open}
            style={[styles.headerChromeIconCircle, buttonStyle]}
          />
          {cartCount > 0 ? (
            <View style={styles.cartBadge} pointerEvents="none">
              <Text style={styles.cartBadgeText}>
                {cartCount > 99 ? '99+' : cartCount}
              </Text>
            </View>
          ) : null}
        </View>
      )}
    >
      {({ close }) => (
        <CartMenu
          onVenuePress={(venueId) => {
            close();
            onVenuePress(venueId);
          }}
          onViewAll={() => {
            close();
            onViewAll();
          }}
          onGoHome={() => {
            close();
            onGoHome();
          }}
        />
      )}
    </Popover>
  );
};
