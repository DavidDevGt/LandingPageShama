# Ferretería Shama — Landing Page

Sitio web estático de **Ferretería Shama**, ubicada en Km 23.1 Ruta al Atlántico, Azacualpilla, Palencia, Guatemala. Más de 15 años en el sector ferretero.

🌐 **Producción:** [ferreteriashama.com](https://www.ferreteriashama.com)

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Markup | HTML5 semántico |
| Estilos | CSS puro — Custom Properties, Grid, Flexbox |
| Scripts | Vanilla JS ES2020+, zero dependencias |
| Fuentes | Google Fonts (carga no-bloqueante) |
| Analytics | Google Analytics 4 (`G-HW1TMPJV8Q`) |
| Formulario | [FormSubmit.co](https://formsubmit.co) |
| PWA | `manifest.json` + theme-color |

> Bootstrap fue **completamente eliminado** en el rewrite 2025. El CSS resultante pesa ~30 KB menos y no tiene dependencias de terceros en runtime.

---

## Estructura del proyecto

```
LandingPageShama/
├── index.html          # Inicio — hero, stats, servicios, CTA
├── nosotros.html       # Historia, galería, valores
├── marcas.html         # Categorías: ferretería, plomería, electricidad, pinturas
├── ubicacion.html      # Mapa, horarios, contacto directo
├── contacto.html       # Formulario + WhatsApp
│
├── css/
│   └── main.css        # Estilos compilados (CSS puro, sin Bootstrap)
├── js/
│   └── main.js         # Lógica del sitio (menú, lightbox, contadores, formulario)
├── sass/               # Fuente SCSS (referencia histórica)
│   ├── main.scss
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _reset.scss
│   └── layout/
├── media/              # Imágenes, logo, íconos
│
├── manifest.json       # PWA manifest
├── sitemap.xml         # Sitemap para Google Search Console
├── robots.txt          # Directivas para crawlers
└── docs/               # Documentación técnica
    ├── arquitectura.md
    ├── seo.md
    └── accesibilidad.md
```

---

## Páginas

| Página | URL | Descripción |
|--------|-----|-------------|
| Inicio | `/` | Hero animado, contadores, servicios |
| Nosotros | `/nosotros.html` | Historia, galería lightbox, valores |
| Marcas | `/marcas.html` | 4 categorías de productos con marcas |
| Ubicación | `/ubicacion.html` | Mapa Google Maps + horarios |
| Contacto | `/contacto.html` | Formulario FormSubmit + WhatsApp directo |

---

## Funcionalidades JS

- **Menú móvil** — overlay con gestión de foco (WCAG 2.4.3)
- **Contadores animados** — `IntersectionObserver` + easing cúbico
- **Fade-in por scroll** — `IntersectionObserver`, sin GSAP ni librerías
- **Galería / Lightbox** — foco guardado y restaurado, cierre con Escape
- **Formulario async** — `fetch` + FormSubmit.co, sin recarga de página
- **WhatsApp tracking** — eventos `gtag` en cada CTA
- **Header shadow** — clase `scrolled` en scroll >20px

---

## SEO & Performance

- `<link rel="canonical">` en todas las páginas
- Open Graph + Twitter Card con URLs absolutas e imágenes dimensionadas
- Schema.org: `LocalBusiness`, `HardwareStore`, `BreadcrumbList`, `FAQPage`
- Preload del hero image (`fetchpriority="high"`)
- Fuentes con `media="print" onload="this.media='all'"` (no bloquean render)
- `width`/`height` en todas las imágenes (previene CLS)
- `sitemap.xml` registrado en Google Search Console

---

## Accesibilidad (WCAG 2.1 AA)

- Skip link `#main` en todas las páginas
- `aria-current="page"` en nav activo
- `aria-label` en links externos con "(abre en nueva ventana)"
- Botones de galería (`<button>`) con soporte teclado nativo (Enter/Space)
- `:focus-visible` en todos los elementos interactivos
- Contraste AA verificado en textos sobre fondos oscuros
- `prefers-reduced-motion` respetado en animaciones

---

## Desarrollo local

```bash
# Clonar
git clone https://github.com/DavidDevGt/LandingPageShama.git
cd LandingPageShama

# Servir con cualquier servidor estático
npx serve .
# o
python -m http.server 8080
```

No hay build step — el CSS en `css/main.css` está listo para producción.

---

## Contacto del negocio

- 📍 Km 23.1 Ruta al Atlántico, Azacualpilla, Palencia, Guatemala
- 🕐 Lun–Vie 7:30–18h · Sáb 7:30–17h · Dom 8–13h

---
