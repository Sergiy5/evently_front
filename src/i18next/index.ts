import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LOCALS } from './constants';

import tabProfileUA from './locales/ua/tabProfile.json';
import tabProfileEN from './locales/en/tabProfile.json';

const resources = {
  [LOCALS.UA]: {
    tabProfile: tabProfileUA,
  },
  [LOCALS.EN]: {
    tabProfile: tabProfileEN,
  },
};

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  fallbackLng: LOCALS.UA,
  debug: true,
});

export default i18n;
