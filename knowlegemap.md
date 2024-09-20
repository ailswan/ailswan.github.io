---
layout: knowlege_map
title: KnowlegeMap
excerpt: "Knowlege Map"
aside: true
feature_text: |
  ## AilswanCoding
  This is a notebook for Ailswan to improving coding skills
feature_image: "https://picsum.photos/1300/400?image=989"
---

 
<h2>Tech Map</h2>

<div class="tag-filter">
    <label for="searchCategory">Search Category:</label>
    <input type="text" id="searchCategory" placeholder="Enter category to search">
    <label>Select Tags:</label>
    <input type="checkbox" id="oneStarCheckbox"> One Star
    <input type="checkbox" id="twoStarCheckbox"> Two Star
    <input type="checkbox" id="session1Checkbox"> Session 1
    <input type="checkbox" id="session2Checkbox"> Session 2
</div>

<select id="sortDropdown">
    <option value="time">Sort by Time</option>
    <option value="level">Sort by Level</option>
    <option value="title">Sort by Title</option>
</select>

<table style="border-collapse: collapse; width: 100%; padding: 18px;">
  <thead>
    <tr>
      <th>No.</th>
      <th>Level</th>
      <th>Title</th>
      <th>Tags</th>
      <th>Session</th>
    </tr>
  </thead>
  <tbody>
    {% assign techs = site.techs %}
    {% for tech in techs %}
    <tr data-time="{{ tech.date | date: '%Y-%m-%d' }}" data-tags="{{ tech.tags | join: ',' }}" data-session="{{ tech.session }}">
        <td>{{ forloop.index }}</td>
        <td><a href="{{ tech.url }}" style="{% if tech.level == 'hard' %}color: #f44336;{% elsif tech.level == 'medium' %}color: #f68140;{% endif %}">{{ tech.level }}</a></td>
        <td><a href="{{ tech.url }}">{{ tech.title }}</a></td>
        <td>{{ tech.tags | join: ", " }}</td>
        <td>{{ tech.session }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

<script>
// JavaScript for sorting and filtering (same as your home page)
</script>