import { ui, defaultLang } from '../i18n/ui';
import { useTranslations, getTranslatedPath } from '../i18n/utils';
import { SOCIAL_LINKS, CONTACT } from '../constants';

/**
 * Iconos sociales soportados actualmente por <SocialButton /> y por el render
 * inline del Footer. Mantén esta lista sincronizada con `iconMap` en
 * `src/islands/SocialButton.tsx` y con los `social.icon === '...'` del Footer.
 */
export const KNOWN_SOCIAL_ICONS = ['github', 'linkedin', 'email'] as const;
export type KnownSocialIcon = (typeof KNOWN_SOCIAL_ICONS)[number];

export interface QuickLink {
  name: string;
  url: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: KnownSocialIcon;
}

export interface FooterData {
  quickLinks: QuickLink[];
  socialLinks: SocialLink[];
}

/**
 * Construye la data del Footer en función del idioma activo.
 *
 * Reglas:
 * - Los `quickLinks` apuntan a anchors de la home (no existen páginas dedicadas
 *   `/projects`, `/about`, `/contact` por ahora). El script del Header hace
 *   fallback de anchors a HOME_URL cuando la sección no existe en la página
 *   actual, así que esto funciona también desde subpáginas.
 * - Privacy/terms se omiten hasta que existan las páginas correspondientes.
 * - Twitter se omite hasta que añadamos el icono al `iconMap`.
 */
export function getFooterData(lang: keyof typeof ui = defaultLang): FooterData {
  const t = useTranslations(lang);
  const home = getTranslatedPath('/', lang);
  // Asegura que home termina sin barra duplicada antes del hash.
  const homeNoTrailing = home.replace(/\/$/, '');

  const quickLinks: QuickLink[] = [
    { name: t('footer.links.home' as any), url: home },
    { name: t('footer.links.projects' as any), url: `${homeNoTrailing}/#projects` },
    { name: t('footer.links.about' as any), url: `${homeNoTrailing}/#about` },
    { name: t('footer.links.contact' as any), url: `${homeNoTrailing}/#contact` },
  ];

  const socialLinks: SocialLink[] = [
    { name: 'GitHub', url: SOCIAL_LINKS.github, icon: 'github' },
    { name: 'LinkedIn', url: SOCIAL_LINKS.linkedin, icon: 'linkedin' },
    { name: 'Email', url: CONTACT.mailto, icon: 'email' },
  ];

  return { quickLinks, socialLinks };
}
