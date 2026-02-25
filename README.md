# El Diario — Periódico Digital con Jekyll

Plantilla de periódico digital profesional construida con Jekyll para GitHub Pages. Diseño editorial inspirado en los grandes medios internacionales: tipografía serif de calidad, jerarquía visual clara, ticker de última hora, barra de progreso de lectura, SEO completo y estilos de impresión.

## Puesta en marcha rápida

### 1. Instalar dependencias

```bash
bundle install
```

### 2. Servidor local

```bash
bundle exec jekyll serve --livereload
```

Abre `http://localhost:4000` en tu navegador.

### 3. Publicar en GitHub Pages

1. Sube el repositorio a GitHub
2. Ve a **Settings → Pages**
3. Selecciona la rama `main` como fuente
4. GitHub Pages construirá y publicará el sitio automáticamente

---

## Personalización

### Nombre y datos del periódico

Edita [`_config.yml`](_config.yml):

```yaml
title: "El Diario"           # Nombre del periódico
subtitle: "Tu slogan aquí"   # Slogan
url: "https://tuusuario.github.io"
email: "redaccion@tudominio.com"
twitter_username: "tuusuario"
```

### Secciones editoriales

Edita [`_data/navigation.yml`](_data/navigation.yml) para añadir, quitar o reordenar secciones.

### Ticker de última hora

Edita [`_data/breaking_news.yml`](_data/breaking_news.yml). Pon `active: false` para ocultarlo.

### Crear un artículo

Crea un archivo en `_posts/` con el formato `YYYY-MM-DD-titulo-del-articulo.md`:

```markdown
---
layout: post
title: "Título del artículo"
subtitle: "Subtítulo o entradilla"
date: 2026-02-24 09:00:00 +0000
categories: [nacional]
tags: [política, gobierno]
author: carlos-mendez
image: "/assets/images/posts/mi-imagen.jpg"
image_caption: "Pie de foto. Foto: Autor"
excerpt: "Resumen del artículo para SEO y cards."
featured: true
breaking: false
---

Cuerpo del artículo en Markdown...
```

**Categorías disponibles:** `nacional`, `internacional`, `economia`, `tecnologia`, `cultura`, `ciencia`, `deportes`, `opinion`

### Añadir un autor

Crea un archivo en `_authors/nombre-autor.md`:

```markdown
---
name: nombre-autor
display_name: "Nombre Completo"
title: "Cargo o especialización"
bio: "Biografía del autor..."
avatar: "/assets/images/authors/nombre-autor.jpg"
email: "autor@eldiario.com"
twitter: "usuario_twitter"
---
```

Usa `author: nombre-autor` en el front matter de los posts.

### Imágenes

Coloca las imágenes en:
- Posts: `assets/images/posts/`
- Autores: `assets/images/authors/`
- Logo y favicon: `assets/images/`

Tamaños recomendados:
- **Hero/portada**: 1600×900px
- **Cards medianas**: 800×450px
- **Avatares de autor**: 200×200px (cuadrado)

---

## Estructura de archivos

```
/
├── _config.yml              # Configuración principal
├── _data/
│   ├── navigation.yml       # Secciones del periódico
│   ├── breaking_news.yml    # Ticker de última hora
│   └── settings.yml        # Opciones editoriales
├── _layouts/
│   ├── default.html         # Layout base
│   ├── home.html            # Portada
│   ├── post.html            # Artículo
│   ├── category.html        # Sección
│   └── author.html          # Perfil de autor
├── _includes/               # Componentes reutilizables
├── _sass/                   # Estilos SCSS
├── _posts/                  # Artículos
├── _authors/                # Perfiles de autores
├── seccion/                 # Páginas de sección
├── assets/
│   ├── css/main.scss        # Punto de entrada CSS
│   └── js/main.js           # JavaScript
└── index.html               # Portada
```

---

## Características

- **SEO completo**: jekyll-seo-tag, Open Graph, Twitter Cards, JSON-LD NewsArticle
- **Feed RSS** automático con jekyll-feed
- **Sitemap XML** con jekyll-sitemap
- **Tipografía editorial**: Playfair Display + Source Serif 4 + Inter
- **Responsive**: móvil, tablet y escritorio
- **Accesibilidad**: ARIA, skip links, foco visible, contraste WCAG AA
- **Estilos de impresión**: artículos optimizados para imprimir
- **Barra de progreso de lectura**
- **Ticker de última hora** con animación CSS
- **Tiempo de lectura** calculado automáticamente
- **Fechas relativas**: "Hace 2 horas"
- **Compartir en redes**: Twitter/X, Facebook, WhatsApp, Telegram, Copiar enlace
- **Búsqueda** con atajo de teclado `/`
- **Auto-ocultar header** al hacer scroll

---

## Licencia

MIT — Úsalo, modifícalo y publícalo libremente.
