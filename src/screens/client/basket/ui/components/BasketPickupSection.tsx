import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { PickupTimeSelector } from '../../../../../shared/ui/mobile/pickup-time-selector';
import { Icon } from '../../../../../shared/ui/icon';
import { theme } from '../../../../../shared/config/theme';

export interface BasketPickupSectionProps {
  title: string;
  value: string;
  onPress: () => void;
  onClearCart?: () => void;
  clearA11yLabel: string;
}

export const BasketPickupSection = ({
  title,
  value,
  onPress,
  onClearCart,
  clearA11yLabel,
}: BasketPickupSectionProps) => (
  <PickupTimeSelector
    title={title}
    value={value}
    onPress={onPress}
    accessoryRight={
      onClearCart ? (
        <Pressable
          style={styles.trash}
          onPress={onClearCart}
          accessibilityRole="button"
          accessibilityLabel={clearA11yLabel}
        >
          <Icon name="trash-2" size={22} color={theme.client.colors.mutedForeground} />
        </Pressable>
      ) : undefined
    }
  />
);

const styles = StyleSheet.create({
  trash: {
    padding: theme.spacing[2],
  },
});
