import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ruErrors } from './locales/ru/errors';
import { ruAuth } from './locales/ru/auth';
import { ruCommon } from './locales/ru/common';
import { ruCatalog } from './locales/ru/catalog';
import { ruCheckout } from './locales/ru/checkout';
import { ruPayment } from './locales/ru/payment';
import { ruProfile } from './locales/ru/profile';
import { ruBusiness } from './locales/ru/business';

i18n.use(initReactI18next).init({
  lng: 'ru',
  fallbackLng: 'ru',
  defaultNS: 'common',
  ns: ['common', 'errors', 'auth', 'catalog', 'checkout', 'payment', 'profile', 'business'],
  resources: {
    ru: {
      errors: ruErrors,
      auth: ruAuth,
      common: ruCommon,
      catalog: ruCatalog,
      checkout: ruCheckout,
      payment: ruPayment,
      profile: ruProfile,
      business: ruBusiness,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
export { ruErrors } from './locales/ru/errors';
export { ruAuth } from './locales/ru/auth';
export { ruCommon } from './locales/ru/common';
export { ruCatalog } from './locales/ru/catalog';
export { ruCheckout } from './locales/ru/checkout';
export { ruPayment } from './locales/ru/payment';
export { ruProfile } from './locales/ru/profile';
export { ruBusiness } from './locales/ru/business';
