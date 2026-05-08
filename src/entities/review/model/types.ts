export interface Review {
  id: number;
  user_id: number;
  venue_id: number;
  order_id: number;
  rating: number;
  comment: string | null;
  images_json: string[];
  created_at: string;
}

export interface ReviewCreate {
  order_id: number;
  venue_id: number;
  rating: number;
  comment?: string | null;
  images_json?: string[];
}

export interface ReviewUpdate {
  rating?: number | null;
  comment?: string | null;
  images_json?: string[] | null;
}

export interface ReviewListParams {
  page?: number;
  limit?: number;
  venue_id?: number | null;
  user_id?: number | null;
}
