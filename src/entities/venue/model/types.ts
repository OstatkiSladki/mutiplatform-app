export interface Company {
  id: number;
  name: string;
  inn: string | null;
  is_active: boolean;
  created_at: string;
  deleted_at: string | null;
}

export interface CompanyCreate {
  name: string;
  inn?: string | null;
}

export interface CompanyUpdate {
  name?: string | null;
  inn?: string | null;
  is_active?: boolean | null;
}

export interface CompanyListParams {
  limit?: number;
  offset?: number;
  include_deleted?: boolean;
}

export interface Venue {
  id: number;
  company_id: number | null;
  name: string;
  address: string;
  latitude: string | null;
  longitude: string | null;
  phone: string | null;
  commission_rate: string;
  payout_balance: string;
  work_schedule: Record<string, unknown>;
  is_open: boolean;
  rating: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface VenueCreate {
  company_id: number;
  name: string;
  address: string;
  latitude?: number | string | null;
  longitude?: number | string | null;
  phone?: string | null;
  work_schedule?: Record<string, unknown>;
  commission_rate?: number | string | null;
}

export interface VenueUpdate {
  name?: string | null;
  address?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  phone?: string | null;
  work_schedule?: Record<string, unknown> | null;
  is_open?: boolean | null;
  commission_rate?: number | string | null;
}

export interface VenueListParams {
  limit?: number;
  offset?: number;
  lat?: number | null;
  lon?: number | null;
  radius?: number | null;
  name?: string | null;
  is_open?: boolean | null;
  company_id?: number | null;
  include_deleted?: boolean;
}

export type PayoutStatus = 'pending' | 'paid' | 'cancelled';

export interface Payout {
  id: number;
  venue_id: number;
  amount: string;
  period_start: string;
  period_end: string;
  status: PayoutStatus;
  payment_details: Record<string, unknown>;
  created_at: string;
  paid_at: string | null;
}

export interface PayoutCreate {
  amount: number | string;
  period_start: string;
  period_end: string;
  payment_details?: Record<string, unknown>;
}

export interface PayoutStatusUpdate {
  status: PayoutStatus;
  comment?: string | null;
}

export interface PayoutListParams {
  limit?: number;
  offset?: number;
  status?: PayoutStatus | null;
}
