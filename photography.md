---
layout: gallery
title: Photography
---

<div class="collections-list">
  {% for collection in site.data.photo_collections %}
    <div class="collection-link">
      <a href="{{ 'photography/' | append: collection.id | relative_url }}">{{ collection.title }}</a>
      {% if collection.description %}
        <span class="collection-description">{{ collection.description }}</span>
      {% endif %}
    </div>
  {% endfor %}
</div> 