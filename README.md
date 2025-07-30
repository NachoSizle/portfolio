# Mi Portfolio Personal ✨

¡Bienvenido a mi rincón digital! Este proyecto es mi portfolio personal, un espacio centralizado para mostrar mis proyectos, artículos y habilidades como desarrollador. Construido para ser ultrarrápido, accesible y visualmente atractivo.

## ✨ Logros Actuales

-   🏆 **Puntuación Perfecta en Lighthouse**: ¡Hemos alcanzado un **100%** en Performance, Accesibilidad, Best Practices y SEO!
-   🚀 **Despliegue Automatizado**: CI/CD configurado con GitHub Actions para un despliegue continuo en GitHub Pages.
-   📈 **SEO Optimizado**: Implementación de sitemap, robots.txt, URLs canónicas y metadatos para redes sociales.
-   🌗 **Theme Toggle Accesible**: Interruptor de tema (claro/oscuro) con persistencia y foco en la accesibilidad (WCAG).
-   🖼️ **Imágenes Optimizadas**: Soporte para imágenes locales y remotas con @astrojs/image y assets.

## 🏗️ Tech Stack

La selección de tecnologías está pensada para obtener el máximo rendimiento y una experiencia de desarrollo de primera.

| Capa | Elección | Motivo |
| :--- | :--- | :--- |
| **Runtime & PM** | **Bun v1.x** | Rendimiento y velocidad excepcionales. |
| **Framework** | **Astro 4** | Generación de sitios estáticos (SSG) para máxima velocidad. |
| **CSS** | **Tailwind CSS v4** | Desarrollo ágil de UI con un sistema de clases utilidad. |
| **Contenido** | **Content Collections + MDX** | Gestión de contenido en Markdown/MDX con tipado y validación. |
| **Imágenes** | **@astrojs/image** | Optimización automática, AVIF/WebP y soporte para imágenes remotas/locales. |
| **SEO** | `@astrojs/sitemap` | Generación automática del mapa del sitio. |
| **Deploy** | **GitHub Pages & Actions** | Alojamiento gratuito y CI/CD robusto. |

## 🚀 Empezando

Para levantar el proyecto en tu entorno local, solo necesitas [Bun](https://bun.sh/) instalado.

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/NachoSizle/portfolio.git
    cd portfolio
    ```

2.  **Instala las dependencias:**
    ```bash
    bun install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    bun run dev
    ```

¡Y listo! La web estará disponible en `http://localhost:4321/portfolio`.

## 📦 Comandos útiles

- `bun run dev` — Servidor de desarrollo
- `bun run build` — Genera la versión estática para producción
- `bun run preview` — Previsualiza el build
- `bun upgrade` — Actualiza todas las dependencias

## 🗂️ Estructura y buenas prácticas

- **Rutas centralizadas:** El prefijo BASE_URL (`/portfolio`) se gestiona desde `src/constants.ts` y se usa en todos los enlaces internos.
- **Componentes reutilizables:**
  - `ProjectList.astro` — Lista de proyectos.
  - `ProjectCard.astro` — Tarjeta individual de proyecto.
- **Imágenes optimizadas:**
  - Usa `<Image />` de `astro:assets` para imágenes locales/remotas.
  - Configuración de dominios remotos en `astro.config.mjs`.
- **Navegación accesible:** Header con scroll-aware y ThemeToggle.

## ➕ Añadir un nuevo proyecto

Crea un archivo `.mdx` en `src/content/projects/` con el siguiente frontmatter:

```mdx
---
title: "Nombre del Proyecto"
description: "Descripción breve."
stack:
  - Astro
  - Tailwind CSS
cover: "/portfolio/mi-imagen.jpg" # o una URL remota permitida
repoLink: "https://github.com/usuario/proyecto"
demoLink: "https://demo.com"
date: 2025-07-30
---

Descripción extendida del proyecto.
```

## 🎯 Objetivos del Proyecto

-   [x] **Lighthouse Score > 95**: ¡Conseguido (100)! ✅
-   [x] **Core Web Vitals Optimizados**: ¡Conseguido! ✅
-   [x] **Accesibilidad WCAG 2.1 AA**: ¡Conseguido en componentes clave! ✅
-   [x] **Despliegue automatizado**: ¡Conseguido! ✅
