import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MobilePriceCtaBar } from '../../../../../shared/ui/mobile-price-cta-bar';

export interface BottomActionBarProps {
  priceLabel: string;
  buttonTitle: string;
  onAddPress: () => void;
  disabled?: boolean;
}

/** Matches cart footer: fixed above tab bar, price + `BookingCtaButton`. */
export const BottomActionBar = ({
  priceLabel,
  buttonTitle,
  onAddPress,
  disabled,
}: BottomActionBarProps) => {
  return (
    <View pointerEvents="box-none" style={styles.anchor}>
      <MobilePriceCtaBar
        priceLabel={priceLabel}
        ctaTitle={buttonTitle}
        onCtaPress={onAddPress}
        disabled={disabled}
        accessibilityLabel={buttonTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  anchor: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});
