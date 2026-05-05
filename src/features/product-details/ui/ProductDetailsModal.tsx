import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';
import type { Offer } from '../../../entities/offer';
import type { Product } from '../../../entities/product';
import { ProductDetailsBody } from './ProductDetailsBody';

export interface ProductDetailsModalRef {
  present: () => void;
  dismiss: () => void;
}

export interface ProductDetailsModalProps {
  venueId: number;
  venueName: string;
  offer: Offer | null;
  product?: Product;
  onClose?: () => void;
}

export const ProductDetailsModal = forwardRef<ProductDetailsModalRef, ProductDetailsModalProps>(
  ({ venueId, venueName, offer, product, onClose }, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      present: () => setVisible(true),
      dismiss: () => setVisible(false),
    }));

    const close = () => {
      setVisible(false);
      onClose?.();
    };

    if (!offer) return null;

    return (
      <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
        <Pressable style={styles.backdrop} onPress={close}>
          <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
              <ProductDetailsBody
                venueId={venueId}
                venueName={venueName}
                offer={offer}
                product={product}
              />
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    );
  },
);

ProductDetailsModal.displayName = 'ProductDetailsModal';

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
