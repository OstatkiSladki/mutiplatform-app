import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from '../../../shared/ui/chip';
import { theme } from '../../../shared/config/theme';
import { PICKUP_SLOTS, PickupSlot } from '../model/checkout-schema';

export interface SlotSelectProps {
  value: PickupSlot;
  onChange: (slot: PickupSlot) => void;
}

export const SlotSelect = ({ value, onChange }: SlotSelectProps) => (
  <View style={styles.row}>
    {PICKUP_SLOTS.map((slot) => (
      <Chip
        key={slot}
        label={slot}
        active={value === slot}
        onPress={() => onChange(slot)}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
  },
});
