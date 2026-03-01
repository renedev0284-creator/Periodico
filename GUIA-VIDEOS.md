# Guía: Videos de X.com en El Diario

---

## 1. Publicar una nota con video

Crea el archivo del post normalmente en `_posts/` y agrega `video_url` en el front matter:

```markdown
---
layout: post
title: "Titulo de la nota"
subtitle: "Breve descripción o entradilla."
date: 2026-03-01
categories: [politica]
author: redaccion
featured: false

# — VIDEO —
video_url: "https://x.com/usuario/status/1234567890"
# video_caption: "Texto personalizado de pie (opcional)"
---

Tu nota va aquí normalmente. El video aparece automáticamente
encima del cuerpo del artículo, colapsado con un botón ▶ Ver video.

Puedes escribir todo el contexto, análisis y citas aquí debajo.
```

El sistema extrae `@usuario` de la URL automáticamente y muestra:
> *Vía @usuario en X*

---

## 2. Insertar un video dentro del cuerpo de cualquier nota

Dentro del texto de un artículo `.md`, usa el include con la sintaxis de Liquid:

```liquid
{% include x-video.html url="https://x.com/usuario/status/1234567890" %}
```

Con pie de video personalizado:

```liquid
{% include x-video.html
   url="https://x.com/usuario/status/1234567890"
   caption="Video captado por ciudadanos en San Salvador" %}
```

Sin pre-roll (aunque esté activo en settings):

```liquid
{% include x-video.html
   url="https://x.com/usuario/status/1234567890"
   no_preroll="true" %}
```

---

## 3. Activar el pre-roll publicitario

Edita `_data/settings.yml`:

```yaml
video_ad:
  enabled: true       # ← cambiar a true
  duration: 7         # segundos que dura el anuncio
  skip_after: 3       # tras cuántos segundos aparece el botón "Saltar"
```

### Sin patrocinador configurado
Muestra automáticamente el banner animado **"¿Tu marca aquí?"**
(fondo oscuro con orbes de colores, badge verde "DISPONIBLE", botón rosa-naranja).

### Con patrocinador real (cuando consigas el cliente)

```yaml
video_ad:
  enabled: true
  duration: 8
  skip_after: 4
  ad_label: "Publicidad"
  sponsor_name: "Banco Agrícola"
  sponsor_url: "https://bancoagricola.com"
  sponsor_logo: "/assets/images/ads/logo-ba.png"
  sponsor_tagline: "El banco que te acompaña"
```

Con imagen de anuncio completa (reemplaza logo + tagline):

```yaml
  ad_image: "/assets/images/ads/banner-ba-720x280.jpg"
```

---

## 4. Parámetros del include `x-video.html`

| Parámetro     | Requerido | Descripción |
|---------------|-----------|-------------|
| `url`         | Sí        | URL del tweet (`x.com` o `twitter.com`) |
| `caption`     | No        | Pie de video personalizado |
| `no_preroll`  | No        | Cualquier valor suprime el pre-roll en este embed |

---

## 5. Galería de videos

Todos los posts con `video_url` en el front matter aparecen automáticamente en:

```
/videos/
```

El enlace ya está en el menú superior. No requiere configuración adicional.
Los videos en la galería se muestran sin pre-roll.

---

## 6. Banner Billboard (portada)

El banner animado entre el nav y la portada se incluye en `_layouts/home.html`.

**Para ocultarlo temporalmente:**

```liquid
{% comment %}{% include ad-billboard.html %}{% endcomment %}
```

**Para reemplazarlo con el banner de un cliente real:**
Comenta el include y agrega directamente la imagen o código del cliente:

```liquid
{% comment %}{% include ad-billboard.html %}{% endcomment %}
<a href="https://cliente.com" target="_blank" rel="noopener sponsored">
  <img src="/assets/images/ads/banner-cliente.jpg"
       alt="Nombre del cliente"
       style="width:100%; display:block;">
</a>
```

---

## 7. URLs de X.com — formatos aceptados

```
https://x.com/usuario/status/1234567890
https://twitter.com/usuario/status/1234567890
http://x.com/usuario/status/1234567890
```

Todos los formatos funcionan. El sistema normaliza la URL internamente.
