import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../config/theme';
import { AppBottomSheet } from '../../bottom-sheet/index.mobile';

export interface TimeSlotPickerSheetProps {
  title: string;
  slots: readonly string[];
  selected: string;
  onSelect: (slot: string) => void;
}

export const TimeSlotPickerSheet = forwardRef<BottomSheetModal, TimeSlotPickerSheetProps>(
  ({ title, slots, selected, onSelect }, ref) => {
    const pick = useCallback(
      (slot: string) => {
        onSelect(slot);
        const modalRef = ref && typeof ref !== 'function' ? ref.current : null;
        modalRef?.dismiss();
      },
      [onSelect, ref],
    );

    return (
      <AppBottomSheet ref={ref} enableDynamicSizing>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.list}>
          {slots.map((slot) => {
            const active = slot === selected;
            return (
              <Pressable
                key={slot}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                style={[styles.row, active && styles.rowActive]}
                onPress={() => pick(slot)}
              >
                <Text style={[styles.slotLabel, active && styles.slotLabelActive]}>{slot}</Text>
              </Pressable>
            );
          })}
        </View>
      </AppBottomSheet>
    );
  },
);

TimeSlotPickerSheet.displayName = 'TimeSlotPickerSheet';

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[6],
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.normal,
    color: theme.client.colors.foreground,
    marginBottom: theme.spacing[3],
  },
  list: {
    gap: theme.spacing[1],
    paddingBottom: theme.spacing[2],
  },
  row: {
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[3],
    borderRadius: theme.client.radius.sm,
    backgroundColor: theme.colors.neutral[9],
  },
  rowActive: {
    backgroundColor: theme.colors.primary[10],
  },
  slotLabel: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    color: theme.client.colors.foreground,
  },
  slotLabelActive: {
    fontWeight: '700',
    color: theme.colors.primary[100],
  },
});
