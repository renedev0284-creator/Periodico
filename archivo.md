---
layout: default
title: "Hemeroteca"
description: "Archivo completo de todas las publicaciones de El Diario."
permalink: /archivo/
---

<div class="archive-page">
  <header class="archive-header">
    <div class="container">
      <nav class="archive-header__breadcrumb" aria-label="Ruta de navegación">
        <a href="{{ '/' | relative_url }}">Portada</a>
        <span aria-hidden="true"> / </span>
        <span>Hemeroteca</span>
      </nav>
      <h1 class="archive-header__title">Hemeroteca</h1>
      <p class="archive-header__desc">Archivo completo — {{ site.posts.size }} publicaciones</p>
    </div>
  </header>

  <div class="container">
    <div class="archive-layout">

      <main class="archive-main">
        {% assign prev_year = "" %}
        {% assign prev_month = "" %}

        {% for post in site.posts %}
          {% assign this_year  = post.date | date: "%Y" %}
          {% assign this_month = post.date | date: "%B" %}

          {% if this_year != prev_year %}
            {% unless forloop.first %}</ul></div>{% endunless %}
            <div class="archive-year-group">
            <h2 class="archive-year">{{ this_year }}</h2>
            {% assign prev_year  = this_year %}
            {% assign prev_month = "" %}
          {% endif %}

          {% if this_month != prev_month %}
            {% unless prev_month == "" %}</ul>{% endunless %}
            <h3 class="archive-month">{{ this_month }}</h3>
            <ul class="archive-list">
            {% assign prev_month = this_month %}
          {% endif %}

          <li class="archive-item">
            <time class="archive-item__date" datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%-d" }}
            </time>
            {% if post.categories.first %}
            <span class="archive-item__cat">{{ post.categories.first }}</span>
            {% endif %}
            <a href="{{ post.url | relative_url }}" class="archive-item__title">{{ post.title }}</a>
          </li>

          {% if forloop.last %}</ul></div>{% endif %}
        {% endfor %}

        {% if site.posts.size == 0 %}
        <div class="empty-state">
          <p>El archivo aún no tiene publicaciones.</p>
          <a href="{{ '/' | relative_url }}" class="btn">← Portada</a>
        </div>
        {% endif %}
      </main>

      <!-- Sidebar con categorías -->
      <aside class="archive-sidebar">
        <div class="archive-widget">
          <p class="archive-widget__title">Secciones</p>
          <ul class="archive-widget__list">
            {% for section in site.data.navigation.sections %}
            {% unless section.special %}
            {% assign sec_posts = site.posts | where: "categories", section.slug %}
            {% if sec_posts.size > 0 %}
            <li>
              <a href="{{ section.url | relative_url }}" class="archive-widget__link" style="--sc: {{ section.color }}">
                <span class="archive-widget__dot" style="background: {{ section.color }}"></span>
                {{ section.name }}
                <span class="archive-widget__count">{{ sec_posts.size }}</span>
              </a>
            </li>
            {% endif %}
            {% endunless %}
            {% endfor %}
          </ul>
        </div>
      </aside>

    </div>
  </div>
</div>
