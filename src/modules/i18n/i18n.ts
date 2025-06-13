import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

/**
 * 获取当前语言
 * @returns zh | en
 */
const getLocale = () => {
  let locale = process.env.LANG || process.env.LC_ALL;

  if (!locale) {
    return 'en';
  }

  locale = locale.split('.')[0];
  const simpleLocale = locale.split('_')[0].toLowerCase();

  // 只允许 zh 或 en，否则返回 en
  if (simpleLocale === 'zh' || simpleLocale === 'en') {
    return simpleLocale;
  } else {
    return 'en';
  }
}

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