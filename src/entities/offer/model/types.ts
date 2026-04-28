export type OfferStatus = 'active' | 'sold_out' | 'expired' | 'cancelled';

export interface OfferItem {
  id: number;
  product_id: number;
  quantity: number;
}

export interface OfferItemCreate {
  product_id: number;
  quantity?: number;
}

export interface Offer {
  id: number;
  venue_id: number;
  current_price: string;
  original_price: string;
  quantity_available: number;
  expires_at: string;
  status: OfferStatus;
  items: OfferItem[];
  created_at: string;
  updated_at: string;
}

export interface OfferCreate {
  venue_id: number;
  current_price: number | string;
  original_price: number | string;
  quantity_available?: number;
  expires_at: string;
  items: OfferItemCreate[];
}

export interface OfferUpdate {
  current_price?: number | string | null;
  original_price?: number | string | null;
  quantity_available?: number | null;
  expires_at?: string | null;
  status?: OfferStatus | null;
  items?: OfferItemCreate[] | null;
}

export interface OfferListParams {
  page?: number;
  limit?: number;
  venue_id?: number | null;
  status?: OfferStatus | null;
  category_id?: number | null;
}
