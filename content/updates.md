---
title: Новости
layout: base.njk
templateEngineOverride: njk
footer: true
---

<a href="{{ '/' | url }}" class="return-link">На Главную</a>

{% set sorted = updates | reverse %}
{% set latest = sorted %}
<section class="version-log">
  <h3 class="version-title">Обновления Проекта</h3>
  <div class="version-grid">
    {% for item in latest %}
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
    {% endfor %}
  </div>
  <div class="version-more-button-container">
    <a href="https://t.me/wag_the_cyberpunk" target="_blank" rel="noopener noreferrer" class="version-more-button">Больше новостей</a>
  </div>
  
</section>
