import type { AxiosResponse } from 'axios';
import { authApi } from '../api/auth-api';
import { useAuthStore } from './store';

export const getAccessTokenFromResponse = (
  response: AxiosResponse<unknown>,
): string | undefined => {
  const headerValue =
    response.headers['x-access-token'] ?? response.headers.authorization;

  if (typeof headerValue !== 'string') return undefined;

  return headerValue.startsWith('Bearer ')
    ? headerValue.slice('Bearer '.length)
    : headerValue;
};

// Refreshes the session via the httpOnly refresh cookie (withCredentials).
// Stores the new access token in the auth store and returns it, or null.
export const refreshAccessToken = async (): Promise<string | null> => {
  const response = await authApi.refresh();
  const token = getAccessTokenFromResponse(response);
  if (token) {
    useAuthStore.getState().setAccessToken(token);
    return token;
  }
  return null;
};
