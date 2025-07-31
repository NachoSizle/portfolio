# 📖 Guía del Componente **Hero**

Esta guía describe el propósito, la estructura y la implementación del componente **Hero** de tu portfolio Astro. Copia y pega o importa este archivo a tu carpeta `docs/` o a la Wiki del repositorio para mantener la referencia actualizada.

---

## 🎯 Objetivo

El _Hero_ debe comunicar en un vistazo:

1. **Qué haces** y **qué valor aportas**.  
2. Un **CTA primario** que dirija al usuario (↪ `Ver proyectos`).  
3. Pequeña **prueba social** (stats, estrellas, lectores).  
4. Alguna **micro‑animación** sutil que refuerce tu especialidad (ej. un rayo ⚡ para rendimiento).

---

## 📝 Contenido propuesto

| Elemento | Ejemplo | Notas |
|----------|---------|-------|
| **Headline** | `Construyo frontends que cargan en <1 s ⚡` | Métrica concreta = credibilidad |
| **Sub‑headline** | `Soy Nacho, dev frontend especializado en Core Web Vitals y UX.` | Máx. 140 car. |
| **CTA principal** | `Ver proyectos` → `/projects` | Color primario, foco accesible |
| CTA secundario | `Descargar CV.pdf` | Estilo “ghost” |
| **Badges KPI** | `+20K lectores`, `15 repos OSS`, `100 % Lighthouse` | Prueba social inmediata |

---

## 💻 Código de referencia

### 1. `Hero.astro`

```astro
---
import { Image } from 'astro:assets';
import HeroCTA from '../islands/HeroCTA.jsx';
---
<section class="relative isolate overflow-hidden bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
  <div class="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
    <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
      Construyo frontends que cargan en&nbsp;<span class="text-primary">menos de un segundo</span> ⚡
    </h1>

    <p class="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
      Soy Nacho, dev frontend obsesionado con Core Web Vitals y DX. Te ayudo a convertir milisegundos en ventas.
    </p>

    <!-- CTAs -->
    <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <HeroCTA />
      <a href="/cv.pdf" class="inline-flex items-center gap-2 rounded-xl border border-primary/30
         px-6 py-3 text-sm font-medium shadow-sm transition hover:bg-primary/10 focus:outline-none
         focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary">
        Descargar CV
      </a>
    </div>

    <!-- KPI Badges -->
    <div class="mt-12 flex flex-wrap justify-center gap-4 text-sm">
      <span class="badge">+20K lectores LinkedIn</span>
      <span class="badge">15 repos OSS</span>
      <span class="badge">100 % Lighthouse</span>
    </div>
  </div>

  <!-- SVG decorativo opcional -->
  <svg class="absolute inset-x-0 -z-10 h-[200%] w-full stroke-primary/10" aria-hidden="true">
    <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0V60M0 60H60" fill="none" />
    </pattern></defs>
    <rect width="100%" height="100%" stroke-width="0" fill="url(#grid)" />
  </svg>
</section>
```

### 2. `HeroCTA.jsx` (island React + Framer Motion)

```jsx
import { motion } from 'framer-motion';

export default function HeroCTA() {
  const handleClick = () =>
    window.umami?.track('cta-click', { location: 'hero' });

  return (
    <motion.a
      href="/projects"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3
                 text-sm font-semibold text-white shadow-lg focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600"
      >
      Ver proyectos
      <svg className="h-5 w-5" aria-hidden="true">
        <use href="#icon-arrow-right" />
      </svg>
    </motion.a>
  );
}
```

> **Nota:** declara el componente como island en tu `.astro` o en `src/components.json` usando `client:load` para hidratar solo este botón.

---

## ♿ Accesibilidad & ⚡ Rendimiento

- `lang="es"` en `<html>`, contraste AA garantizado (`text-primary` sobre fondo).  
- Botones con `focus-visible` y roles `aria‐label` en iconos decorativos.  
- `<Image>` optimizado; si es externa, autoriza dominio + `inferSize`.  
- Hero al inicio del DOM para LCP; fuentes con `rel="preload"` o variable fonts.  
- Micro‑animaciones limitadas a 60 fps y sin afectar CLS.

---

## ✅ Próximos micro‑pasos

1. Copia los archivos y ajusta texto, métricas y colores (`tailwind.config.js`).  
2. Añade `Hero.astro` al layout principal (`index.astro`).  
3. ```bash
   bunx --bun astro dev
   ```  
   Verifica layout, dark mode, focos.  
4. Lighthouse ➜ comprobar LCP & CLS.  
5. `git add`, `commit`, `push` ⇒ GitHub Actions despliega.

¡Listo! Con esta guía el componente Hero quedará documentado y alineado con tus objetivos de marca personal.