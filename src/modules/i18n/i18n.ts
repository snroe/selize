import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { getLocale } from './locale.js';

await i18next
  .use(Backend)
  .init({
    debug: false,
    lng: getLocale(),
    initAsync: false,
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh'],
    backend: {
      loadPath: './locales/{{lng}}.json',
      addPath: './locales/{{lng}}.missing.json',
    },
  });

export const i18n = (key: string): string => {
  return i18next.t(key);
};