export const MOCK_CARTS: Record<
  string,
  {
    venueId: number | string;
    venueName: string;
    items: Array<{
      productId: number | string;
      offerId: number;
      name: string;
      price: number;
      quantity: number;
      imageUrl?: string;
      maxQuantity?: number;
    }>;
  }
> = {
  '1': {
    venueId: 1,
    venueName: 'Кофейня Уют',
    items: [
      { productId: 1, offerId: 1, name: 'Капучино', price: 149, quantity: 1, maxQuantity: 3 },
      { productId: 2, offerId: 1, name: 'Круассан с маслом', price: 85, quantity: 2, maxQuantity: 3 },
    ],
  },
  '2': {
    venueId: 2,
    venueName: 'Пекарня Рассвет',
    items: [
      { productId: 4, offerId: 3, name: 'Борщ с пампушками', price: 199, quantity: 1, maxQuantity: 2 },
    ],
  },
};
