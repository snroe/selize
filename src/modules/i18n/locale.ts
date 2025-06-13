/**
 * 获取当前语言
 * @returns zh | en
 */
export const getLocale = (): string => {
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