import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../../../shared/ui/icon';
import { theme } from '../../../../../shared/config/theme';
import { PICKUP_SLOTS, type PickupSlot } from '../../../../../features/checkout';
import { bookingDesktopStyles as styles } from './booking-desktop.styles';

export interface PickupConditionsDesktopProps {
  slot: PickupSlot;
  onChangeSlot: (slot: PickupSlot) => void;
  address: string;
}

export const PickupConditionsDesktop = ({
  slot,
  onChangeSlot,
  address,
}: PickupConditionsDesktopProps) => {
  const { t } = useTranslation('checkout');
  const [slotOpen, setSlotOpen] = useState(false);

  const selectSlot = (next: PickupSlot) => {
    onChangeSlot(next);
    setSlotOpen(false);
  };

  return (
    <View style={styles.pickupSection}>
      <Text style={styles.pickupSectionTitle}>{t('pickupTerms')}</Text>
      <View style={styles.pickupRow}>
        <View style={styles.pickupField}>
          <Text style={styles.fieldLabel}>{t('pickupTimeSelect')}</Text>
          <Pressable
            style={styles.fieldBox}
            onPress={() => setSlotOpen((open) => !open)}
            accessibilityRole="button"
            accessibilityLabel={slot}
          >
            <Text style={styles.fieldValue} numberOfLines={1}>
              {slot}
            </Text>
            <Icon name="chevron-down" size={20} color={theme.client.colors.mutedForeground} />
          </Pressable>
          {slotOpen ? (
            <View style={styles.slotOptions}>
              {PICKUP_SLOTS.map((option, index) => {
                const isActive = option === slot;
                const isLast = index === PICKUP_SLOTS.length - 1;
                return (
                  <Pressable
                    key={option}
                    style={[
                      styles.slotOption,
                      isLast && styles.slotOptionLast,
                      isActive && styles.slotOptionActive,
                    ]}
                    onPress={() => selectSlot(option)}
                    accessibilityRole="button"
                  >
                    <Text style={styles.slotOptionText}>{option}</Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>
        <View style={styles.pickupField}>
          <Text style={styles.fieldLabel}>{t('pickupAddress')}</Text>
          <View style={styles.fieldBox}>
            <Text style={styles.fieldValue} numberOfLines={2}>
              {address}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
