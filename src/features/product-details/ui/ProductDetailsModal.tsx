import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Pressable, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../entities/offer';
import type { Product } from '../../../entities/product';
import { Icon } from '../../../shared/ui/icon';
import { theme } from '../../../shared/config/theme';
import { ProductDetailsDesktopBody } from './ProductDetailsDesktopBody';
import { styles } from './product-details-desktop.styles';

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
    const { t } = useTranslation('catalog');
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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={close}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={t('productDetails.close')}
            >
              <Icon name="x" size={24} color={theme.client.colors.mutedForeground} />
            </TouchableOpacity>
            <ProductDetailsDesktopBody
              venueId={venueId}
              venueName={venueName}
              offer={offer}
              product={product}
            />
          </Pressable>
        </Pressable>
      </Modal>
    );
  },
);

ProductDetailsModal.displayName = 'ProductDetailsModal';
