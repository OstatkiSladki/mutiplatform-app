export interface PaginationMeta {
  page: number;
  limit: number;
  total_count: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}

export interface OffsetPaginationMeta {
  limit: number;
  offset: number;
  total: number;
}

export interface OffsetPaginatedResponse<T> {
  items: T[];
  meta: OffsetPaginationMeta;
}
