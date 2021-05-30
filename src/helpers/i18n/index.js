import i18next from 'i18next';
import LocalStorageBackend from "i18next-localstorage-backend";

import commonEn from './locales/en/common.json';
import commonVi from './locales/vi/common.json';
import userVi from './locales/vi/user.json';

i18next.init({
  lng: 'vi', // language to use
  fallbackLng: 'vi', // language to use if translations in user language are not available.
  debug: true,
  interpolation: {escapeValue: false},  // React already does escaping
  ns: ['common', 'user'],
  defaultNS: 'common',
  resources: {
    vi: {
      common: commonVi,
      user: userVi,
    },
    en: {
      common: commonEn,
    },
  },
  backend: {
    backends: [
      LocalStorageBackend,
    ],
  },
}, function (err, t) {
  console.log('I18n initialized and ready to go!')
});

export const getI18nMessage = (key, params) => {
  return i18next.t(key, params);
};

export default i18next;
