import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ruErrors } from './locales/ru/errors';

i18n.use(initReactI18next).init({
  lng: 'ru',
  fallbackLng: 'ru',
  resources: {
    ru: {
      errors: ruErrors,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
export { ruErrors } from './locales/ru/errors';
