export type UserRole = 'user' | 'staff' | 'admin';
export type StaffRole = 'staff' | 'manager' | 'admin' | 'owner';

export interface StaffProfileResponse {
  id: number;
  user_id: number;
  venue_id: number;
  role: StaffRole;
}

export interface UserProfileResponse {
  id: number;
  first_name: string;
  last_name: string | null;
  avatar_url: string | null;
  email: string;
  phone: string | null;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  default_address: string | null;
  preferences_json: Record<string, unknown>;
  staff_profile: StaffProfileResponse | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
  phone?: string;
  privacy_policy_accepted: boolean;
}

export interface MessageResponse {
  message: string;
}
