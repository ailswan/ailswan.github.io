---
title: list of algorithm
feature_text: |
  ## AilswanCoding
  This is a notebook for Ailswan to improving coding skills
feature_image: "https://picsum.photos/1300/400?image=989"
excerpt: "Alembic is a starting point for [Jekyll](https://jekyllrb.com/) projects. Rather than starting from scratch, this boilerplate is designed to get the ball rolling immediately. Install it, configure it, tweak it, push it."
---
 
<table style="border-collapse: collapse; width: 100%; padding: 18px;">
  <tr>
    <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Level</th>
    <th style="text-align:center; border: 1px solid lightgrey; padding: 18px;">Problem Name</th>
    <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Tags</th>
  </tr>
  {% for post in site.posts %}
  <tr>
    <td style="border: 1px solid lightgrey; padding: 18px;">
      <a href="{{ post.url }}" 
         style="{% if post.level == 'hard' %}color: #f44336;{% elsif post.level == 'medium' %}color: #f68140;{% endif %}">
         {{ post.level }}
      </a>
    </td>
    <td style="border: 1px solid lightgrey; padding: 18px;"><a href="{{ post.url }}"  style="color: #45818e" >{{ post.title }}</a></td>
    <td style="border: 1px solid lightgrey; padding: 18px;"><a href="{{ post.url }}" style="color: #0d94e7;">{{ post.categories | join: ", " }}</a></td>
  </tr>
  {% endfor %}
</table>
