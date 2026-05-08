import { AxiosError } from 'axios';
import i18n from '../i18n';

export const getApiErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const detail: string | undefined = error.response?.data?.detail;

    if (!error.response) return i18n.t('errors:api.networkError');
    if (status === 401) return i18n.t('errors:api.invalidCredentials');
    if (status === 404) return i18n.t('errors:api.notFound');
    if (status === 409 || detail?.toLowerCase().includes('already'))
      return i18n.t('errors:api.emailAlreadyExists');
  }
  return i18n.t('errors:api.unknown');
};
