export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded' | 'partially_refunded';
export type PaymentMethod = 'bank_card' | 'sbp';
export type DiscountType = 'fixed' | 'percent';

export interface PaymentCreateRequest {
  order_id: number;
  amount: number | string;
  currency?: string;
  payment_method: PaymentMethod;
  transaction_id: string;
  promo_code?: string | null;
  meta?: Record<string, unknown>;
}

export interface PaymentResponse {
  id: string;
  order_id: number;
  transaction_id: string;
  amount: string;
  refunded_amount: string;
  currency: string;
  status: PaymentStatus;
  payment_method: PaymentMethod | null;
  promo_code_applied?: string | null;
  discount_amount?: string | null;
  failure_reason?: string | null;
  created_at: string;
  paid_at?: string | null;
  refunded_at?: string | null;
}

export interface PaymentListResponse {
  items: PaymentResponse[];
  total: number;
  offset: number;
  limit: number;
}

export interface PaymentListParams {
  limit?: number;
  offset?: number;
  status?: PaymentStatus | null;
  order_id?: number | null;
}

export interface PaymentRefundRequest {
  reason?: string | null;
}

export interface PromoValidateRequest {
  code: string;
  order_amount: number | string;
}

export interface PromoValidateResponse {
  is_valid: boolean;
  discount_type: DiscountType;
  discount_value: string;
  discount_amount: string;
  final_amount: string;
  min_order_amount: string;
  valid_until?: string | null;
  usages_left?: number | null;
}
