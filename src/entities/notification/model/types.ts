export interface Notification {
  id: number | null;
  user_id: number | null;
  type: string | null;
  title: string | null;
  message: string | null;
  data_json: Record<string, unknown> | null;
  is_read: boolean | null;
  created_at: string | null;
  read_at: string | null;
}

export interface NotificationListResponse {
  items: Notification[];
  total: number | null;
  page: number | null;
  limit: number | null;
}

export interface NotificationListParams {
  is_read?: boolean | null;
  page?: number;
  limit?: number;
}

export interface UpdateNotificationRequest {
  title?: string | null;
  message?: string | null;
  data_json?: Record<string, unknown> | null;
}
