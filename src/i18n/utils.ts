import { dictionaries, defaultLang, showDefaultLang } from './dictionaries';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in dictionaries) return lang as keyof typeof dictionaries;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof dictionaries) {
  return function t(key: keyof (typeof dictionaries)[typeof defaultLang]) {
    return dictionaries[lang][key] || dictionaries[defaultLang][key];
  };
}

export function useTranslatedPath(lang: keyof typeof dictionaries) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
  };
}

const langPrefixes = !showDefaultLang
  ? Object.keys(dictionaries).filter((lang) => lang !== defaultLang)
  : Object.keys(dictionaries);

export function getPathFromUrl(url: URL) {
  const langPrefixToReplace = langPrefixes.find((lang) =>
    url.pathname.startsWith(`/${lang}`)
  );
  return langPrefixToReplace
    ? url.pathname.replace(`/${langPrefixToReplace}`, '')
    : url.pathname;
}
