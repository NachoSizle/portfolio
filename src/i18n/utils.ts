import { ui, defaultLang } from './ui';

type TranslationParams = Record<string, string | number>;

/**
 * BASE_URL normalizado SIN barra final.
 * Ej: '/portfolio' o '' para raíz.
 * Se obtiene de `import.meta.env.BASE_URL` (inyectado por Vite/Astro).
 */
const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');

/**
 * Antepone BASE_URL a un path absoluto sin duplicarla ni dejar dobles barras.
 */
export function withBase(path: string): string {
  if (!path) return `${BASE}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (BASE && (normalized === BASE || normalized.startsWith(`${BASE}/`))) {
    return normalized;
  }
  return `${BASE}${normalized}`;
}

/** Quita BASE_URL del inicio del path si está presente. */
function stripBase(pathname: string): string {
  if (!BASE) return pathname;
  if (pathname === BASE) return '/';
  if (pathname.startsWith(`${BASE}/`)) return pathname.slice(BASE.length);
  return pathname;
}

/** Quita el prefijo de idioma (`/en`, `/es`) del path si existe. */
function stripLangPrefix(pathname: string): string {
  const segments = pathname.split('/');
  if (segments[1] && segments[1] in ui) {
    segments.splice(1, 1);
    const result = segments.join('/');
    return result === '' ? '/' : result;
  }
  return pathname;
}

export function getLangFromUrl(url: URL) {
  const pathWithoutBase = stripBase(url.pathname);
  const [, lang] = pathWithoutBase.split('/');
  if (lang && lang in ui) return lang as keyof typeof ui;
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
  let cleanPath = stripBase(path);
  cleanPath = stripLangPrefix(cleanPath);
  if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;

  if (lang === defaultLang) {
    return `${BASE}${cleanPath}`;
  }
  if (cleanPath === '/') return `${BASE}/${lang}/`;
  return `${BASE}/${lang}${cleanPath}`;
}
