import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Offer } from '../../../entities/offer';
import type { Product } from '../../../entities/product';
import type { ClientStackParamList } from '../../../navigation/types';
import { useBreakpoint } from '../../../shared/lib/responsive';
import { ProductDetailsModal, type ProductDetailsModalRef } from './ProductDetailsModal';

export interface ProductDetailsPayload {
  offer: Offer;
  product?: Product;
}

export interface ProductDetailsSheetRef {
  present: (payload: ProductDetailsPayload) => void;
  dismiss: () => void;
}

export interface ProductDetailsSheetProps {
  venueId: number;
  venueName: string;
  onClose?: () => void;
}

type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const ProductDetailsSheet = forwardRef<ProductDetailsSheetRef, ProductDetailsSheetProps>(
  ({ venueId, venueName, onClose }, ref) => {
    const { isAtLeast, isWeb } = useBreakpoint();
    const useDesktopModal = isWeb && isAtLeast('md');
    const navigation = useNavigation<Nav>();
    const modalRef = useRef<ProductDetailsModalRef>(null);
    const [active, setActive] = useState<ProductDetailsPayload | null>(null);

    useImperativeHandle(ref, () => ({
      present: ({ offer, product }) => {
        if (useDesktopModal) {
          setActive({ offer, product });
          modalRef.current?.present();
        } else {
          navigation.navigate('ClientTabs', {
            screen: 'ProductDetails',
            params: { venueId, venueName, offer, product },
          });
        }
      },
      dismiss: () => {
        if (useDesktopModal) modalRef.current?.dismiss();
      },
    }));

    if (!useDesktopModal) return null;

    return (
      <ProductDetailsModal
        ref={modalRef}
        venueId={venueId}
        venueName={venueName}
        offer={active?.offer ?? null}
        product={active?.product}
        onClose={onClose}
      />
    );
  },
);

ProductDetailsSheet.displayName = 'ProductDetailsSheet';
