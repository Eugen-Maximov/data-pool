---
title: Главная страница
layout: base.njk
templateEngineOverride: njk
footer: true
---

<h1 class="version-title">База данных Cyberpunk RED/207x - Главная</h1>

<div class="tile-grid">
  <a href="{{ '/equipment/' | url }}" class="tile-button">
    <img src="{{ '/images/content/main-page/equipment.png' | url }}" alt="Снаряжение" />
    <span>Снаряжение</span>
  </a>
  <a href="{{ '/health/' | url }}" class="tile-button">
    <img src="{{ '/images/content/main-page/health.png' | url }}" alt="Твоё Здоровье" />
    <span>Твоё Здоровье</span>
  </a>
  <a href="{{ '/city/' | url }}" class="tile-button">
    <img src="{{ '/images/content/main-page/city.png' | url }}" alt=Город" />
    <span>Город</span>
  </a>
  <a href="{{ '/workshop/' | url }}" class="tile-button">
    <img src="{{ '/images/content/main-page/workshop.png' | url }}" alt=Мастерская" />
    <span>Мастерская</span>
  </a>
  <a href="{{ '/chrome/' | url }}" class="tile-button">
    <img src="{{ '/images/content/main-page/chrome.png' | url }}" alt=Твой Хром" />
    <span>Твой Хром</span>
  </a>
  <a href="{{ '/home/' | url }}" class="tile-button">
    <img src="{{ '/images/content/main-page/home.png' | url }}" alt=Где ты живешь" />
    <span>Где ты живешь</span>
  </a>
  <a href="{{ '/contacts/' | url }}" class="tile-button">
    <img src="{{ '/images/content/main-page/contacts.png' | url }}" alt=Твои Контакты" />
    <span>Твои Контакты</span>
  </a>
  <a href="{{ '/net/' | url }}" class="tile-button">
    <img src="{{ '/images/content/main-page/net.png' | url }}" alt=Сеть" />
    <span>Сеть</span>
  </a>
  <a href="{{ '/job/' | url }}" class="tile-button">
    <img src="{{ '/images/content/main-page/job.png' | url }}" alt=Твоя Работа" />
    <span>Твоя Работа</span>
  </a>
  <a href="{{ '/other/martial_arts/' | url }}" class="tile-button">
    <img src="{{ '/images/content/main-page/martial.png' | url }}" alt=Боевые Искусства" />
    <span>Боевые Искусства</span>
  </a>
</div>

{% set sorted = updates | reverse %}
{% set latest = sorted %}
{% set count = 0 %}
<section class="version-log">
  <h3 class="version-title">Последние обновления</h3>
  <div class="version-grid">
    {% for item in latest %}
      {% if (item.type == "major") and (count < 3) %}
      {% set count = count + 1 %}
      <div class="version-card">
        <div class="version-header">
          <span class="version-number">v{{ item.version }}</span>
          <span class="version-date">{{ item.date }}</span>
        </div>
        <div class="version-body">
          <p><strong>{{ item.title }}:</strong> {{ item.description }}</p>
          {% if item.changes.length %}
            <ul>
              {% for change in item.changes %}
                <li>{{ change }}</li>
              {% endfor %}
            </ul>
          {% endif %}
        </div>
      </div>
    {% endif %}
    {% endfor %}
  </div>

  <div class="version-more-button-container">
    <a href="{{ '/updates/' | url }}" class="version-more-button">Больше новостей</a>
  </div>
</section>

<a href="https://coda.io/@a-leon/data-pool-0-95-coda" target="_blank">Оригинальный ДатаПул (только с VPN)</a>

Итак, мы в очередной раз переехали. Не бабушку на шоссе, а на новый хостинг. Продолжаем попытки сделать вашу жизнь
лучше.
