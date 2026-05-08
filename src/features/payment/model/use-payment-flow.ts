import { useCallback, useReducer, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  type DraftVenueCart,
  useAddCartItem,
  useClearCart,
  useCreateOrder,
  useUpdateOrderStatus,
} from '../../../entities/order';
import {
  type PaymentMethod,
  useCreatePayment,
} from '../../../entities/payment';
import {
  type CardData,
  type PaymentProvider,
  mockPaymentProvider,
} from '../../../shared/lib/payment';
import { useCartStore } from '../../../entities/order';
import { getApiErrorMessage } from '../../../shared/api';
import type { AppliedPromo, PickupSlot } from '../../checkout';

export type PaymentFlowState =
  | { status: 'idle' }
  | { status: 'tokenizing' }
  | { status: 'preparing_cart' }
  | { status: 'creating_order' }
  | { status: 'creating_payment' }
  | { status: 'success' }
  | { status: 'error'; message: string };

type Action =
  | { type: 'start_tokenize' }
  | { type: 'preparing_cart' }
  | { type: 'creating_order' }
  | { type: 'creating_payment' }
  | { type: 'success' }
  | { type: 'error'; message: string }
  | { type: 'reset' };

const reducer = (state: PaymentFlowState, action: Action): PaymentFlowState => {
  switch (action.type) {
    case 'start_tokenize':
      return { status: 'tokenizing' };
    case 'preparing_cart':
      return { status: 'preparing_cart' };
    case 'creating_order':
      return { status: 'creating_order' };
    case 'creating_payment':
      return { status: 'creating_payment' };
    case 'success':
      return { status: 'success' };
    case 'error':
      return { status: 'error', message: action.message };
    case 'reset':
      return { status: 'idle' };
    default:
      return state;
  }
};

export interface UsePaymentFlowArgs {
  venueId: number;
  cart: DraftVenueCart;
  slot: PickupSlot;
  promo: AppliedPromo | null;
  amount: number;
  method: PaymentMethod;
  provider?: PaymentProvider;
  onSuccess: () => void;
}

export interface UsePaymentFlowResult {
  state: PaymentFlowState;
  pay: (card: CardData | null) => Promise<void>;
  reset: () => Promise<void>;
  isBusy: boolean;
}

const slotStartHour = (slot: PickupSlot): number => {
  const start = slot.split(/[–-]/)[0];
  const [hh] = start.trim().split(':');
  const parsed = Number(hh);
  return Number.isFinite(parsed) ? parsed : 19;
};

const formatPickupTime = (slot: PickupSlot): string => {
  const target = new Date();
  const hours = slotStartHour(slot);
  target.setHours(hours, 0, 0, 0);
  if (target.getTime() < Date.now()) {
    target.setDate(target.getDate() + 1);
  }
  return target.toISOString();
};

export const usePaymentFlow = ({
  venueId,
  cart,
  slot,
  promo,
  amount,
  method,
  provider = mockPaymentProvider,
  onSuccess,
}: UsePaymentFlowArgs): UsePaymentFlowResult => {
  const [state, dispatch] = useReducer(reducer, { status: 'idle' });
  const queryClient = useQueryClient();

  const clearCart = useClearCart();
  const addItem = useAddCartItem();
  const createOrder = useCreateOrder();
  const createPayment = useCreatePayment();
  const updateOrderStatus = useUpdateOrderStatus();
  const clearLocal = useCartStore((s) => s.clearVenueCart);

  // Persist orderId across retries so a failed payment doesn't spawn duplicate
  // orders. Cleared on success or explicit reset.
  const pendingOrderIdRef = useRef<number | null>(null);

  const pay = useCallback(
    async (card: CardData | null) => {
      try {
        let transactionId: string;
        if (method === 'bank_card') {
          if (!card) {
            dispatch({ type: 'error', message: 'errorGeneric' });
            return;
          }
          dispatch({ type: 'start_tokenize' });
          const tokenized = await provider.tokenize(card);
          transactionId = tokenized.transaction_id;
        } else {
          transactionId = `sbp_${Date.now()}`;
        }

        let orderId = pendingOrderIdRef.current;

        if (orderId == null) {
          dispatch({ type: 'preparing_cart' });
          await clearCart.mutateAsync().catch(() => undefined);
          for (const item of cart.items) {
            await addItem.mutateAsync({
              offer_id: item.offerId,
              quantity: item.quantity,
            });
          }

          dispatch({ type: 'creating_order' });
          const order = await createOrder.mutateAsync();
          orderId = order.id;
          pendingOrderIdRef.current = orderId;
        }

        dispatch({ type: 'creating_payment' });
        const payment = await createPayment.mutateAsync({
          order_id: orderId,
          amount,
          currency: 'RUB',
          payment_method: method,
          transaction_id: transactionId,
          promo_code: promo?.code ?? null,
          meta: { slot, pickup_iso: formatPickupTime(slot) },
        });

        if (payment.status === 'failed') {
          dispatch({ type: 'error', message: payment.failure_reason ?? 'errorGeneric' });
          return;
        }

        clearLocal(venueId);
        pendingOrderIdRef.current = null;
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['orders', 'list'] }),
          queryClient.invalidateQueries({ queryKey: ['orders', 'detail', orderId] }),
          queryClient.invalidateQueries({ queryKey: ['cart'] }),
        ]);
        dispatch({ type: 'success' });
        onSuccess();
      } catch (e) {
        dispatch({ type: 'error', message: getApiErrorMessage(e) });
      }
    },
    [
      method,
      provider,
      clearCart,
      addItem,
      createOrder,
      createPayment,
      cart.items,
      amount,
      promo,
      slot,
      clearLocal,
      venueId,
      queryClient,
      onSuccess,
    ],
  );

  const reset = useCallback(async () => {
    if (pendingOrderIdRef.current != null) {
      try {
        await updateOrderStatus.mutateAsync({
          id: pendingOrderIdRef.current,
          data: { status: 'cancelled' },
        });
      } catch {
        // best-effort cancel; backend reconciliation handles stale orders
      }
      pendingOrderIdRef.current = null;
    }
    dispatch({ type: 'reset' });
  }, [updateOrderStatus]);

  const isBusy =
    state.status === 'tokenizing' ||
    state.status === 'preparing_cart' ||
    state.status === 'creating_order' ||
    state.status === 'creating_payment';

  return { state, pay, reset, isBusy };
};
