import type { PickupCode } from '../../../entities/order/model/types';

export const MOCK_PICKUP_CODES: Record<number, PickupCode> = {
  101: { code: '7421', expires_at: '2026-05-05T18:00:00.000Z' },
};

export const MOCK_ORDERS = [
  {
    id: 101,
    user_id: 1,
    venue_id: 1,
    status: 'paid' as const,
    total_amount: 149,
    discount_amount: 0,
    service_fee: 15,
    venue_payout: 119,
    final_amount: 164,
    promo_code_id: null,
    pickup_time: '2026-05-05T15:30:00.000Z',
    created_at: '2026-05-05T12:00:00.000Z',
    updated_at: '2026-05-05T12:05:00.000Z',
    items: [
      {
        id: 1,
        offer_id: 1,
        product_name_snapshot: 'Капучино',
        price_snapshot: 149,
        quantity: 1,
        subtotal: 149,
      },
    ],
  },
  {
    id: 100,
    user_id: 1,
    venue_id: 2,
    status: 'picked_up' as const,
    total_amount: 199,
    discount_amount: 20,
    service_fee: 15,
    venue_payout: 152,
    final_amount: 194,
    promo_code_id: null,
    pickup_time: '2026-05-04T14:00:00.000Z',
    created_at: '2026-05-04T10:00:00.000Z',
    updated_at: '2026-05-04T14:15:00.000Z',
    items: [
      {
        id: 2,
        offer_id: 3,
        product_name_snapshot: 'Борщ с пампушками',
        price_snapshot: 120,
        quantity: 1,
        subtotal: 120,
      },
      {
        id: 3,
        offer_id: 3,
        product_name_snapshot: 'Греческий салат',
        price_snapshot: 79,
        quantity: 1,
        subtotal: 79,
      },
    ],
  },
  {
    id: 99,
    user_id: 1,
    venue_id: 1,
    status: 'cancelled' as const,
    total_amount: 89,
    discount_amount: 0,
    service_fee: 0,
    venue_payout: 0,
    final_amount: 0,
    promo_code_id: null,
    pickup_time: null,
    created_at: '2026-05-03T16:00:00.000Z',
    updated_at: '2026-05-03T16:10:00.000Z',
    items: [
      {
        id: 4,
        offer_id: 2,
        product_name_snapshot: 'Чизкейк Нью-Йорк',
        price_snapshot: 89,
        quantity: 1,
        subtotal: 89,
      },
    ],
  },
];

export const MOCK_ORDER_LIST_RESPONSE = {
  items: MOCK_ORDERS,
  total_count: MOCK_ORDERS.length,
  page: 1,
  limit: 20,
};
