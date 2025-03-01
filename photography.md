---
layout: page
title: Photography
subtitle: A collection of my work
---

<div class="photo-gallery-container">
  {% for collection in site.data.photo_collections %}
    <div class="collection-card">
      <a href="{{ 'photography/' | append: collection.id | relative_url }}">
        <img src="{{ collection.thumbnail | relative_url }}" alt="{{ collection.title }}" class="collection-thumbnail">
        <h3 class="collection-title">{{ collection.title }}</h3>
      </a>
    </div>
  {% endfor %}
</div> 