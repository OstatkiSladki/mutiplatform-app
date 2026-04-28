export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  is_active: boolean;
  created_at: string;
}

export interface CategoryCreate {
  name: string;
  slug: string;
  parent_id?: number | null;
}

export interface CategoryUpdate {
  name?: string | null;
  slug?: string | null;
  is_active?: boolean | null;
  parent_id?: number | null;
}

export interface CategoryListParams {
  parent_id?: number | null;
  limit?: number;
}
