import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  // Extraer el path y remover /portfolio
  const pathWithoutBase = url.pathname.replace(/^\/portfolio/, '');
  const [, lang] = pathWithoutBase.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
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
