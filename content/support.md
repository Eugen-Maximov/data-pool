---
title: Поддержка
layout: base.njk
templateEngineOverride: njk
footer: true
---

<h3 class="version-title">Поддержка</h3>
Если вы хотите поддержать нашу команду и сказать спасибо в материальной форме то вы можете воспользоваться QR кодами ниже:

<div class="image-container image-left">
    <div class="image-container image-center">
        <img src="{{ '/images/sbp-qr.png' | url }}" alt="SBP">
        <div class="caption">Переводы СБП</div>
    </div>
    <div class="image-container image-center">
        <img src="{{ '/images/qr-code.png' | url }}" alt="Boosty">
        <div class="caption">Boosty</div>
    </div> 
</div>

{% set sorted = updates | reverse %}
{% set latest = sorted %}
<section class="version-log">
  <h3 class="version-title">Последние Обновления</h3>
  <div class="version-grid">
    {% for item in latest %}
      {% if loop.index0 < 6 %}
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
    <a href="https://t.me/wag_the_cyberpunk" target="_blank" rel="noopener noreferrer" class="version-more-button">Больше новостей</a>
  </div>
  
</section>

<h3 class="version-title">Обратная связь и Новости</h3>
Если вы обнаружили ошибку, неточность, несоответствие книге правил, вы можете написать нам:

<div class="tile-grid" style="justify-content: center">
  <a href="https://t.me/+vpf2DXn5fSI5MTEy" target="_blank" rel="noopener" class="tile-button">
    <img src="{{ '/images/chat.png' | url }}" alt="Обратная Связь" />
    <span>Обратная Связь</span>
  </a>
  <a href="https://t.me/wag_the_cyberpunk" target="_blank" rel="noopener" class="tile-button">
    <img src="{{ '/images/news.png' | url }}" alt="Новости" />
    <span>Новости</span>
  </a>
</div>
