import {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { tokenStorage } from '../../../shared/lib/storage';
import type {
  LoginRequest,
  MessageResponse,
  RegisterRequest,
  UserProfileResponse,
} from '../model/types';

const MOCK_ACCESS_TOKEN_HEADER = 'x-access-token';
const MOCK_TOKEN_PREFIX = 'mock-mobile-auth-token:';
const MOCK_DELAY_MS = 450;

const wait = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

const getMockToken = (email: string) =>
  `${MOCK_TOKEN_PREFIX}${encodeURIComponent(email.toLowerCase())}`;

const getEmailFromMockToken = (token: string): string | null => {
  if (!token.startsWith(MOCK_TOKEN_PREFIX)) return null;

  try {
    return decodeURIComponent(token.slice(MOCK_TOKEN_PREFIX.length));
  } catch {
    return null;
  }
};

const getUserId = (email: string) =>
  email.split('').reduce((sum, char) => sum + char.charCodeAt(0), 1000);

const getFirstNameFromEmail = (email: string) => {
  const localPart = email.split('@')[0] || 'demo';
  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
};

const createMockUser = (
  email: string,
  overrides: Partial<UserProfileResponse> = {},
): UserProfileResponse => ({
  id: getUserId(email),
  first_name: getFirstNameFromEmail(email),
  last_name: null,
  avatar_url: null,
  email,
  phone: null,
  role: 'user',
  is_active: true,
  is_verified: true,
  default_address: null,
  preferences_json: {},
  staff_profile: null,
  ...overrides,
});

const createConfig = (
  url: string,
  method: string,
  data?: unknown,
): InternalAxiosRequestConfig => ({
  url,
  method,
  data,
  headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
});

const createResponse = <T,>(
  url: string,
  method: string,
  data: T,
  accessToken?: string,
): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: accessToken ? { [MOCK_ACCESS_TOKEN_HEADER]: accessToken } : {},
  config: createConfig(url, method),
});

const createAxiosError = (
  status: number,
  detail: string,
  url: string,
  method: string,
) => {
  const config = createConfig(url, method);
  return new AxiosError(
    detail,
    status === 401 ? AxiosError.ERR_BAD_REQUEST : AxiosError.ERR_BAD_RESPONSE,
    config,
    undefined,
    {
      data: { detail },
      status,
      statusText: status === 401 ? 'Unauthorized' : 'Server Error',
      headers: {},
      config,
    },
  );
};

const createNetworkError = (url: string, method: string) =>
  new AxiosError(
    'Network Error',
    AxiosError.ERR_NETWORK,
    createConfig(url, method),
  );

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const shouldFailLogin = ({ email, password }: LoginRequest) => {
  const normalizedEmail = normalizeEmail(email);

  if (normalizedEmail === 'network@example.com') {
    return createNetworkError('/auth/api/v1/auth/login', 'post');
  }

  if (normalizedEmail === 'server@example.com') {
    return createAxiosError(
      500,
      'Сервис авторизации временно недоступен',
      '/auth/api/v1/auth/login',
      'post',
    );
  }

  if (normalizedEmail === 'unknown@example.com') {
    return new Error('Unexpected mock auth error');
  }

  if (
    normalizedEmail === 'invalid@example.com' ||
    normalizedEmail === 'blocked@example.com' ||
    password === 'wrongpassword'
  ) {
    return createAxiosError(
      401,
      'Invalid email or password',
      '/auth/api/v1/auth/login',
      'post',
    );
  }

  return null;
};

export const mockAuthApi = {
  async login(data: LoginRequest): Promise<AxiosResponse<UserProfileResponse>> {
    await wait();
    const error = shouldFailLogin(data);
    if (error) throw error;

    const email = normalizeEmail(data.email);
    return createResponse(
      '/auth/api/v1/auth/login',
      'post',
      createMockUser(email),
      getMockToken(email),
    );
  },

  async register(
    data: RegisterRequest,
  ): Promise<AxiosResponse<UserProfileResponse>> {
    await wait();
    const email = normalizeEmail(data.email);

    if (email === 'exists@example.com') {
      throw createAxiosError(
        409,
        'Пользователь с таким email уже существует',
        '/auth/api/v1/auth/register',
        'post',
      );
    }

    return createResponse(
      '/auth/api/v1/auth/register',
      'post',
      createMockUser(email, {
        first_name: data.first_name,
        last_name: data.last_name ?? null,
        phone: data.phone ?? null,
      }),
      getMockToken(email),
    );
  },

  async logout(): Promise<AxiosResponse<MessageResponse>> {
    await wait();
    return createResponse('/auth/api/v1/auth/logout', 'post', {
      message: 'Logged out',
    });
  },

  async refresh(): Promise<AxiosResponse<MessageResponse>> {
    await wait();
    return createResponse('/auth/api/v1/auth/refresh', 'post', {
      message: 'Token refreshed',
    });
  },

  async getMe(): Promise<AxiosResponse<UserProfileResponse>> {
    await wait();
    const token = await tokenStorage.load();
    const email = token ? getEmailFromMockToken(token) : null;

    if (!email) {
      throw createAxiosError(
        401,
        'Session expired',
        '/auth/api/v1/users/me',
        'get',
      );
    }

    return createResponse('/auth/api/v1/users/me', 'get', createMockUser(email));
  },
};
