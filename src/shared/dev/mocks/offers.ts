const EXPIRES_TODAY = '2026-05-05T23:59:00.000Z';
const EXPIRES_SOON = '2026-05-05T20:00:00.000Z';

export const MOCK_OFFERS = [
  {
    id: 1,
    venue_id: 1,
    current_price: '149.00',
    original_price: '320.00',
    quantity_available: 3,
    expires_at: EXPIRES_TODAY,
    status: 'active' as const,
    items: [
      { id: 1, product_id: 1, quantity: 1 },
      { id: 2, product_id: 2, quantity: 2 },
    ],
    created_at: '2026-05-05T08:00:00.000Z',
    updated_at: '2026-05-05T08:00:00.000Z',
  },
  {
    id: 2,
    venue_id: 1,
    current_price: '89.00',
    original_price: '180.00',
    quantity_available: 5,
    expires_at: EXPIRES_SOON,
    status: 'active' as const,
    items: [{ id: 3, product_id: 3, quantity: 1 }],
    created_at: '2026-05-05T09:00:00.000Z',
    updated_at: '2026-05-05T09:00:00.000Z',
  },
  {
    id: 3,
    venue_id: 2,
    current_price: '199.00',
    original_price: '450.00',
    quantity_available: 2,
    expires_at: EXPIRES_TODAY,
    status: 'active' as const,
    items: [
      { id: 4, product_id: 4, quantity: 1 },
      { id: 5, product_id: 6, quantity: 1 },
    ],
    created_at: '2026-05-05T07:30:00.000Z',
    updated_at: '2026-05-05T07:30:00.000Z',
  },
  {
    id: 4,
    venue_id: 2,
    current_price: '120.00',
    original_price: '260.00',
    quantity_available: 4,
    expires_at: EXPIRES_SOON,
    status: 'active' as const,
    items: [{ id: 6, product_id: 2, quantity: 3 }],
    created_at: '2026-05-05T10:00:00.000Z',
    updated_at: '2026-05-05T10:00:00.000Z',
  },
  {
    id: 5,
    venue_id: 3,
    current_price: '299.00',
    original_price: '680.00',
    quantity_available: 1,
    expires_at: EXPIRES_TODAY,
    status: 'active' as const,
    items: [
      { id: 7, product_id: 5, quantity: 1 },
      { id: 8, product_id: 6, quantity: 1 },
    ],
    created_at: '2026-05-05T11:00:00.000Z',
    updated_at: '2026-05-05T11:00:00.000Z',
  },
];

export const MOCK_OFFER_LIST_RESPONSE = {
  items: MOCK_OFFERS,
  pagination: { page: 1, limit: 10, total_count: MOCK_OFFERS.length },
};
