import { ui, defaultLang } from './ui';

type TranslationParams = Record<string, string | number>;

export function getLangFromUrl(url: URL) {
  // Extraer el path y remover /portfolio
  const pathWithoutBase = url.pathname.replace(/^\/portfolio/, '');
  const [, lang] = pathWithoutBase.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang], params?: TranslationParams) {
    const translation = ui[lang][key] ?? ui[defaultLang][key];
    if (!translation) return key as string;
    if (!params) return translation;

    return translation.replace(/\{\{(.*?)\}\}/g, (_, rawKey: string) => {
      const paramKey = rawKey.trim();
      const value = params[paramKey];
      return value !== undefined ? String(value) : '';
    });
  };
}

export function getTranslatedPath(path: string, lang: keyof typeof ui) {
  // Asegurar que el path empiece con /portfolio
  const basePath = '/portfolio';
  const cleanPath = path.replace(/^\/portfolio/, '');
  
  if (lang === defaultLang) {
    return `${basePath}${cleanPath}`;
  }
  return `${basePath}/${lang}${cleanPath}`;
}
