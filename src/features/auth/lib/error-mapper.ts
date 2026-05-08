import axios from 'axios';
import { ruErrors } from '../../../shared/i18n';

export type AuthErrorContext = 'login' | 'register' | 'generic';

export const mapAuthError = (
  error: unknown,
  context: AuthErrorContext = 'generic',
): string => {
  if (!axios.isAxiosError(error)) return ruErrors.api.unknown;

  if (!error.response) return ruErrors.api.networkError;

  const status = error.response.status;

  if (context === 'login' && (status === 400 || status === 401)) {
    return ruErrors.api.invalidCredentials;
  }
  if (context === 'register' && status === 409) {
    return ruErrors.api.emailAlreadyExists;
  }
  if (status === 401) return ruErrors.api.sessionExpired;
  if (status === 404) return ruErrors.api.notFound;

  const detail = (error.response.data as { detail?: string } | undefined)?.detail;
  return typeof detail === 'string' && detail.length > 0
    ? detail
    : ruErrors.api.unknown;
};
