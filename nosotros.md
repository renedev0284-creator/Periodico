---
layout: page
title: "Nosotros"
subtitle: "Periodismo independiente desde El Salvador"
permalink: /nosotros/
---

## Quiénes somos

**El Diario** es un medio digital salvadoreño nacido en {{ site.founded_year }} con una convicción simple: el buen periodismo es un servicio público, no un negocio de complacencias.

Cubrimos la realidad nacional e internacional sin compromisos políticos ni corporativos. Cada nota que publicamos pasa por verificación de fuentes, contraste de datos y revisión editorial antes de llegar a ti.

---

## Nuestra misión

> Informar con rigor, contextualizar con profundidad y dar voz a quienes el periodismo tradicional ignora.

Creemos en tres pilares:

**Independencia** — No recibimos financiamiento de partidos políticos ni de empresas con agenda. Nuestra única deuda es con la verdad y con nuestros lectores.

**Rigor** — Antes de publicar, verificamos. Ante un error, corregimos públicamente y con transparencia.

**Accesibilidad** — El periodismo de calidad no debería ser exclusivo. Todo nuestro contenido es de acceso libre.

---

## El equipo

{% assign team = site.authors %}
{% if team.size > 0 %}
<div class="about-team">
{% for author in team %}
<div class="about-member">
  {% if author.avatar %}
  <img src="{{ author.avatar | relative_url }}" alt="{{ author.display_name }}" class="about-member__avatar" loading="lazy">
  {% else %}
  <div class="about-member__avatar about-member__avatar--placeholder">{{ author.display_name | slice: 0 }}</div>
  {% endif %}
  <div class="about-member__info">
    <strong class="about-member__name">{{ author.display_name }}</strong>
    {% if author.title %}<span class="about-member__title">{{ author.title }}</span>{% endif %}
    {% if author.bio %}<p class="about-member__bio">{{ author.bio }}</p>{% endif %}
    <div class="about-member__links">
      {% if author.twitter %}<a href="https://twitter.com/{{ author.twitter }}" target="_blank" rel="noopener" class="about-member__link">@{{ author.twitter }}</a>{% endif %}
      {% if author.email %}<a href="mailto:{{ author.email }}" class="about-member__link">{{ author.email }}</a>{% endif %}
    </div>
  </div>
</div>
{% endfor %}
</div>
{% endif %}

---

## Contacto

Para consultas editoriales, correcciones, colaboraciones o denuncias:

**Redacción general:** [{{ site.email }}](mailto:{{ site.email }})

Respondemos todos los correos. Si detectas un error en alguna nota, escríbenos y lo corregimos con nota de corrección visible.

---

## Política editorial

Publicamos solo información verificada. Cuando una fuente es exclusiva o anónima, lo indicamos explícitamente. Separamos información de opinión en secciones diferenciadas.

Los artículos de opinión representan únicamente la postura de sus autores, no la línea editorial de El Diario.

[Política de privacidad](/politica-de-privacidad/) · [Términos y condiciones](/terminos-y-condiciones/)
