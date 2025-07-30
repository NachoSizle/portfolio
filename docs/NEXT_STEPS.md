# 📌 Roadmap — Próximo Sprint

Este fichero describe las tareas prioritarias para evolucionar el portfolio Astro + Bun + GitHub Pages. Cada bloque puede completarse en 1‑2 sesiones de trabajo y mantiene el objetivo de **100 % Lighthouse**.

---

## 1. Contenido & Datos

- **Content Collections**
  1. Crear `/src/content/config.ts` con colección `projects` (tipos Zod). ✅
  2. Añadir al menos **3 proyectos** en formato MDX (con campo `cover`). ✅

- **Rutas dinámicas**
  - Implementar `/projects/[slug].astro` usando `getCollection()`. ✅

---

## 2. UI / Componentes

| Componente | Descripción | Estado |
|------------|-------------|--------|
| `Hero` | Título, tagline y CTA | ☐ |
| `ProjectCard.astro` | Nombre, stack, links demo/GitHub, imagen | ✔️ |
| `ThemeToggle.jsx` | Dark/Light (island) | ✔️ |

*Extras*: micro‑animaciones con Framer Motion, placeholders `<Image>` con `@astrojs/image` (ya en uso), navegación accesible y scroll-aware.

---

## 3. Analítica & Observabilidad

1. **Umami**
   - Hospedar (Docker/Fly) y obtener `data-website-id`.
   - Insertar script con `async defer is:inline data-astro-rerun` *o* usar `astro-umami-analytics`.

2. **Eventos personalizados**
   - `umami.track('cta-click', {label:'HireMe'})` en botones clave.

3. **LHCI GitHub Action**
   - Falla el PR si LCP > 1.2 s o CLS > 0.1.

---

## 4. SEO & Accesibilidad

- Añadir meta Open Graph + JSON‑LD de persona.
- Verificar contraste AA y navegación con teclado.

---

## 5. QA & Monitoreo

1. **Automated tests**: configurar `bun test` + Vitest para componentes.
2. **Budget performance**: límite 50 kB JS total.
3. **Public dashboard** en Umami (opcional).

---

## 6. Checklist de lanzamiento

- [] Home, About, Projects, Contact listos.
- [x] 100 % Lighthouse móvil & desktop.
- [ ] Umami recibe hits.
- [x] README actualizado con comandos Bun y detalles técnicos.

¡A darle caña 🚀!
