---
layout: gallery-base
title: Photography
---

<div class="photography-collections">
  {% for collection in site.data.photo_collections %}
    <div class="collection-entry">
      <a href="{{ 'photography/' | append: collection.id | relative_url }}">{{ collection.title }}</a>
    </div>
  {% endfor %}
</div> 