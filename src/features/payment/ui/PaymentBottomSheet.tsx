import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  AppBottomSheet,
  type AppBottomSheetRef,
} from '../../../shared/ui/bottom-sheet';
import { useBreakpoint } from '../../../shared/lib/responsive';
import type { DraftVenueCart } from '../../../entities/order';
import type { AppliedPromo, PickupSlot } from '../../checkout';
import { PaymentForm } from './PaymentForm';
import { PaymentModal, type PaymentModalRef } from './PaymentModal';

export interface PaymentSheetRef {
  present: () => void;
  dismiss: () => void;
}

export interface PaymentBottomSheetProps {
  venueId: number;
  cart: DraftVenueCart;
  slot: PickupSlot;
  promo: AppliedPromo | null;
  amount: number;
  onSuccess: () => void;
}

export const PaymentBottomSheet = forwardRef<PaymentSheetRef, PaymentBottomSheetProps>(
  (props, ref) => {
    const { isAtLeast, isWeb } = useBreakpoint();
    const useDesktopModal = isWeb && isAtLeast('md');
    const modalRef = useRef<PaymentModalRef>(null);
    const sheetRef = useRef<AppBottomSheetRef>(null);

    useImperativeHandle(ref, () => ({
      present: () => {
        if (useDesktopModal) modalRef.current?.present();
        else sheetRef.current?.present();
      },
      dismiss: () => {
        if (useDesktopModal) modalRef.current?.dismiss();
        else sheetRef.current?.dismiss();
      },
    }));

    if (useDesktopModal) {
      return <PaymentModal ref={modalRef} {...props} />;
    }

    return <BottomSheetSurface ref={sheetRef} {...props} />;
  },
);

PaymentBottomSheet.displayName = 'PaymentBottomSheet';

const BottomSheetSurface = forwardRef<AppBottomSheetRef, PaymentBottomSheetProps>(
  ({ venueId, cart, slot, promo, amount, onSuccess }, ref) => {
    const onDismissRef = useRef<() => void>(() => undefined);
    return (
      <AppBottomSheet
        ref={ref}
        snapPoints={['80%']}
        enableDynamicSizing={false}
        onDismiss={() => onDismissRef.current()}
      >
        <PaymentForm
          venueId={venueId}
          cart={cart}
          slot={slot}
          promo={promo}
          amount={amount}
          onSuccess={onSuccess}
          registerDismiss={(fn) => {
            onDismissRef.current = fn;
          }}
        />
      </AppBottomSheet>
    );
  },
);

BottomSheetSurface.displayName = 'BottomSheetSurface';
