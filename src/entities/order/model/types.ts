export type OrderStatus = 'created' | 'paid' | 'picked_up' | 'cancelled';

export interface CartItem {
  id: number;
  offer_id: number;
  quantity: number;
}

export interface Cart {
  id: number;
  venue_id: number | null;
  items: CartItem[];
  updated_at: string;
}

export interface CartItemCreate {
  offer_id: number;
  quantity: number;
}

export interface OrderItem {
  id: number;
  offer_id: number;
  product_name_snapshot: string;
  price_snapshot: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  user_id: number;
  venue_id: number;
  status: OrderStatus;
  total_amount: number;
  discount_amount: number;
  service_fee: number;
  venue_payout: number;
  final_amount: number;
  promo_code_id: number | null;
  pickup_time: string | null;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface OrderListParams {
  status?: string;
  page?: number;
  limit?: number;
}

export interface OrderListResponse {
  items: Order[];
  total_count: number;
  page: number;
  limit: number;
}

export interface PickupCode {
  code: string;
  expires_at: string;
}

export interface OrderStatusUpdate {
  status: string;
  pickup_code?: string | null;
}
