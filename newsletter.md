---
layout: default
title: "Boletín"
description: "Suscríbete al boletín de El Diario y recibe las noticias más importantes cada mañana."
permalink: /newsletter/
---

<div class="newsletter-page">

  <header class="newsletter-page__header">
    <div class="container">
      <nav class="newsletter-page__breadcrumb" aria-label="Ruta de navegación">
        <a href="{{ '/' | relative_url }}">Portada</a>
        <span aria-hidden="true"> / </span>
        <span>Boletín</span>
      </nav>
      <div class="newsletter-page__icon" aria-hidden="true">✉</div>
      <h1 class="newsletter-page__title">{{ site.data.settings.newsletter.title }}</h1>
      <p class="newsletter-page__desc">{{ site.data.settings.newsletter.description }}</p>
    </div>
  </header>

  <div class="container">
    <div class="newsletter-page__body">

      <!-- Formulario principal -->
      <div class="newsletter-page__card">
        <form class="newsletter-page__form"
              action="{{ site.data.settings.newsletter.action_url }}"
              method="post">
          <label for="nl-email" class="newsletter-page__label">Tu correo electrónico</label>
          <div class="newsletter-page__row">
            <input type="email"
                   id="nl-email"
                   name="fields[email]"
                   placeholder="tu@correo.com"
                   required
                   autocomplete="email"
                   class="newsletter-page__input">
            <input type="hidden" name="ml-submit" value="1">
            <input type="hidden" name="anticsrf" value="true">
            <button type="submit" class="newsletter-page__btn">
              Suscribirse
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
          <p class="newsletter-page__privacy">
            Sin spam. Cancelación con un clic. Consulta nuestra
            <a href="{{ '/politica-de-privacidad/' | relative_url }}">política de privacidad</a>.
          </p>
        </form>
      </div>

      <!-- Beneficios -->
      <ul class="newsletter-perks">
        <li class="newsletter-perk">
          <span class="newsletter-perk__icon" aria-hidden="true">🗞</span>
          <div>
            <strong>Resumen diario</strong>
            <p>Las noticias más importantes del día en un correo conciso y bien redactado.</p>
          </div>
        </li>
        <li class="newsletter-perk">
          <span class="newsletter-perk__icon" aria-hidden="true">🔍</span>
          <div>
            <strong>Análisis exclusivo</strong>
            <p>Contexto y profundidad que va más allá del titular, solo para suscriptores.</p>
          </div>
        </li>
        <li class="newsletter-perk">
          <span class="newsletter-perk__icon" aria-hidden="true">⚡</span>
          <div>
            <strong>Noticias de última hora</strong>
            <p>Alertas puntuales cuando algo importante ocurre, sin ruido innecesario.</p>
          </div>
        </li>
        <li class="newsletter-perk">
          <span class="newsletter-perk__icon" aria-hidden="true">🔒</span>
          <div>
            <strong>Sin compromisos</strong>
            <p>Desuscríbete en cualquier momento con un solo clic. Sin preguntas.</p>
          </div>
        </li>
      </ul>

    </div>
  </div>

</div>
