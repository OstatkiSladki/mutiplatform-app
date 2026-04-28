export interface Product {
  id: number;
  name: string;
  description: string | null;
  image_urls: string[];
  characteristics_json: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ProductCreate {
  name: string;
  description?: string | null;
  image_urls?: string[];
  characteristics_json?: Record<string, unknown>;
  is_active?: boolean;
  category_ids: number[];
}

export interface ProductUpdate {
  name?: string | null;
  description?: string | null;
  image_urls?: string[] | null;
  characteristics_json?: Record<string, unknown> | null;
  is_active?: boolean | null;
  category_ids?: number[] | null;
}

export interface ProductListParams {
  page?: number;
  limit?: number;
  category_id?: number | null;
  search?: string | null;
}
