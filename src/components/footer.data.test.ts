import { describe, it, expect } from 'vitest';
import { getFooterData, KNOWN_SOCIAL_ICONS } from './footer.data';

describe('footer data', () => {
  for (const lang of ['es', 'en'] as const) {
    describe(`lang=${lang}`, () => {
      const data = getFooterData(lang);

      it('los quickLinks apuntan a anchors o a la home (no a páginas inexistentes)', () => {
        for (const link of data.quickLinks) {
          // Permitidos: '/', BASE/, BASE/{lang}/, o cualquier ruta que termine en /#anchor
          expect(link.url).toMatch(/(\/|\/#[a-z-]+)$/);
          // Prohibido: rutas a páginas que NO existen en el sitio
          expect(link.url).not.toMatch(/\/(privacy|terms|about|contact|projects)(\/|$)/);
        }
      });

      it('todos los socialLinks usan iconos soportados por SocialButton', () => {
        for (const social of data.socialLinks) {
          expect(KNOWN_SOCIAL_ICONS).toContain(social.icon);
        }
      });

      it('no incluye redes que no estén soportadas (twitter sin icono → fuera)', () => {
        const icons = data.socialLinks.map((s) => s.icon);
        // Twitter no está en iconMap → no debe aparecer hasta añadir el icono.
        expect(icons).not.toContain('twitter');
      });

      it('todos los hrefs tienen url no vacía', () => {
        for (const link of [...data.quickLinks, ...data.socialLinks]) {
          expect(link.url.length).toBeGreaterThan(0);
        }
      });
    });
  }
});
