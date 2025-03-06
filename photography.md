---
layout: gallery-base
title: Photography
---

<div class="photo-grid">
  {% for collection in site.data.photo_collections %}
    <div class="photo-grid-item">
      <a href="{{ 'photography/' | append: collection.id | relative_url }}">
        {% if collection.thumbnail %}
          <img src="{{ collection.thumbnail }}" alt="{{ collection.title }}">
        {% else %}
          <div class="placeholder-image"></div>
        {% endif %}
        <div class="collection-title">{{ collection.title }}</div>
      </a>
    </div>
  {% endfor %}
</div> 