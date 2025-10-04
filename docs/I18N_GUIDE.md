# 🌍 Sistema de Internacionalización (i18n)

## Configuración

El portfolio ahora soporta **Español (es)** e **Inglés (en)**.

- **Idioma por defecto**: Español (`es`)
- **Detección automática**: El idioma del navegador se detecta en la primera visita
- **Rutas**:
  - Español: `/portfolio/` (sin prefijo)
  - Inglés: `/portfolio/en/`

## Estructura de archivos

```
src/
├── i18n/
│   ├── ui.ts          # Traducciones de toda la app
│   └── utils.ts       # Utilidades para usar traducciones
├── middleware.ts      # Detecta idioma del navegador
└── components/
    └── LanguagePicker.astro  # Selector de idioma
```

## Cómo usar traducciones en componentes

### 1. En componentes Astro (.astro)

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t('hero.greeting')}</h1>
<p>{t('hero.description')}</p>
```

### 2. Añadir nuevas traducciones

Edita `src/i18n/ui.ts`:

```typescript
export const ui = {
  es: {
    'mi.clave': 'Texto en español',
  },
  en: {
    'mi.clave': 'Text in English',
  },
}
```

### 3. HTML con saltos de línea

Algunas traducciones incluyen `<br />`. Usa `set:html`:

```astro
<p set:html={t('projects.subtitle')} />
```

## Componentes actualizados

### ✅ Header
- Incluye selector de idioma
- Navegación traducida

### 🔄 Pendientes de actualizar
Los siguientes componentes necesitan ser actualizados para usar traducciones:

- [ ] Hero.astro
- [ ] AboutSection.astro
- [ ] ProjectList.astro
- [ ] Footer.astro

## Ejemplo completo

```astro
---
// src/components/MiComponente.astro
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<section>
  <h2>{t('about.title')}</h2>
  <p set:html={t('about.subtitle')} />
  <p>{t('about.description')}</p>
</section>
```

## Rutas y links internos

Para crear links que mantengan el idioma:

```astro
---
import { getTranslatedPath } from '../i18n/utils';
const lang = getLangFromUrl(Astro.url);
---

<a href={getTranslatedPath('/projects', lang)}>
  {t('nav.projects')}
</a>
```

## Selector de idioma

El componente `LanguagePicker` está disponible y listo para usar:

```astro
---
import LanguagePicker from './LanguagePicker.astro';
---

<LanguagePicker />
```

## Próximos pasos

1. Actualizar componentes principales (Hero, About, Projects, Footer)
2. Traducir contenido MDX de proyectos
3. Añadir meta tags de idioma en BaseLayout
4. Generar sitemap multiidioma
