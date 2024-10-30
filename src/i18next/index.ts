import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LOCALS } from './constants';

import tabProfileUA from './locales/ua/tabProfile.json';
import tabProfileEN from './locales/en/tabProfile.json';
import adminUserUA from './locales/ua/adminUser.json';
import adminUserEN from './locales/en/adminUser.json';

const resources = {
  [LOCALS.UA]: {
    tabProfile: tabProfileUA,
    adminUser: adminUserUA,
  },
  [LOCALS.EN]: {
    tabProfile: tabProfileEN,
    adminUser: adminUserEN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: LOCALS.UA,
  debug: true,
});

export default i18n;
