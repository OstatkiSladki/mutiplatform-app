import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { theme } from '../../../shared/config/theme';
import type { DraftVenueCart } from '../../../entities/order';
import type { AppliedPromo, PickupSlot } from '../../checkout';
import { PaymentForm } from './PaymentForm';

export interface PaymentModalRef {
  present: () => void;
  dismiss: () => void;
}

export interface PaymentModalProps {
  venueId: number;
  cart: DraftVenueCart;
  slot: PickupSlot;
  promo: AppliedPromo | null;
  amount: number;
  onSuccess: () => void;
}

export const PaymentModal = forwardRef<PaymentModalRef, PaymentModalProps>(
  ({ venueId, cart, slot, promo, amount, onSuccess }, ref) => {
    const [visible, setVisible] = useState(false);
    const dismissCallbackRef = useRef<() => void>(() => undefined);

    useImperativeHandle(ref, () => ({
      present: () => setVisible(true),
      dismiss: () => setVisible(false),
    }));

    const close = () => {
      dismissCallbackRef.current();
      setVisible(false);
    };

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable style={styles.backdrop} onPress={close}>
          <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
              <PaymentForm
                venueId={venueId}
                cart={cart}
                slot={slot}
                promo={promo}
                amount={amount}
                onSuccess={() => {
                  setVisible(false);
                  onSuccess();
                }}
                registerDismiss={(fn) => {
                  dismissCallbackRef.current = fn;
                }}
              />
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    );
  },
);

PaymentModal.displayName = 'PaymentModal';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[4],
  },
  card: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '90%',
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.xl,
    overflow: 'hidden',
    ...theme.shadows.fluffy[5],
  },
  scroll: {
    padding: theme.spacing[5],
  },
});
