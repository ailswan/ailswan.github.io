---
layout: page
title: Ad-hoc
permalink: /ad-hoc/
feature_text: |
  ## Ad-hoc
  This is a notebook for quick Q&A
feature_image: "https://picsum.photos/1300/400?image=909"
excerpt: "Alembic is a starting point for [Jekyll](https://jekyllrb.com/) projects. Rather than starting from scratch, this boilerplate is designed to get the ball rolling immediately. Install it, configure it, tweak it, push it."
---

{% assign tag_string = "" %}
{% for post in site.poststwo %}
  {% for tag in post.categories %}
    {% assign clean_tag = tag | strip %}
    {% assign tag_string = tag_string | append: clean_tag | append: "|" %}
  {% endfor %}
{% endfor %}
{% assign all_tags = tag_string | split: "|" | uniq | sort %}

<div style="display: flex; gap: 16px; align-items: center; margin-bottom: 20px; flex-wrap: wrap;">
  <div class="tag-filter">
    <label for="tagDropdown" style="margin-right: 8px; font-weight: 600;">Filter by Tag:</label>
    <select id="tagDropdown" style="padding: 6px 10px;">
      <option value="">All Tags</option>
      {% for tag in all_tags %}
        {% assign clean_tag = tag | strip %}
        {% if clean_tag != "" %}
          <option value="{{ clean_tag | downcase }}">{{ clean_tag }}</option>
        {% endif %}
      {% endfor %}
    </select>
  </div>

  <!--
  <div>
    <label for="sortDropdown" style="margin-right: 8px; font-weight: 600;">Sort by:</label>
    <select id="sortDropdown" style="padding: 6px 10px;">
      <option value="time">Sort by Time</option>
      <option value="problemName">Sort by Problem Name</option>
    </select>
  </div>
  -->
</div>

<table style="border-collapse: collapse; width: 100%; padding: 18px;">
  <thead>
    <tr>
      <th style="text-align:center; border: 1px solid lightgrey; padding: 18px;">No.</th>
      <th style="text-align:center; border: 1px solid lightgrey; padding: 18px;">Question</th>
      <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Tags</th>
      <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Note</th>
    </tr>
  </thead>
  <tbody>
    {% for post in site.poststwo %}
    <tr
      data-time="{{ post.feature_text | slice: -12, 10 | date: '%Y-%m-%d' }}"
      data-tags="{% for tag in post.categories %}{{ tag | downcase | strip }}{% unless forloop.last %},{% endunless %}{% endfor %}">
      <td style="border: 1px solid lightgrey; padding: 18px; text-align:center;">{{ forloop.index }}</td>
      <td style="border: 1px solid lightgrey; padding: 18px;">
        <a href="{{ post.url }}" style="color: #45818e">{{ post.title }}</a>
      </td>
      <td style="border: 1px solid lightgrey; padding: 18px;">
        <a href="{{ post.url }}" style="color: #0d94e7;">{{ post.categories | join: ", " }}</a>
      </td>
      <td style="border: 1px solid lightgrey; padding: 18px;">
        {% if post.note %}
          {{ post.note }}
        {% else %}
          —
        {% endif %}
      </td>
    </tr>
    {% endfor %}
  </tbody>
</table>

<script>
function normalizeString(str) {
  return (str || '').toLowerCase().trim();
}

function refreshVisibleIndex() {
  var rows = document.querySelectorAll('table tbody tr');
  var visibleIndex = 1;

  rows.forEach(function(row) {
    if (row.style.display !== 'none') {
      var firstCell = row.querySelector('td:nth-child(1)');
      if (firstCell) {
        firstCell.textContent = visibleIndex++;
      }
    }
  });
}

function filterTable() {
  var tagDropdown = document.getElementById('tagDropdown');
  var selectedTag = normalizeString(tagDropdown ? tagDropdown.value : '');
  var rows = document.querySelectorAll('table tbody tr');

  rows.forEach(function(row) {
    var tags = row.getAttribute('data-tags') || '';
    var tagList = tags.split(',').map(function(tag) {
      return normalizeString(tag);
    });

    var showRow = !selectedTag || tagList.includes(selectedTag);
    row.style.display = showRow ? '' : 'none';
  });

  refreshVisibleIndex();
}

function sortTable() {
  var sortDropdown = document.getElementById('sortDropdown');
  if (!sortDropdown) {
    return;
  }

  var sortingMethod = sortDropdown.value;
  var tbody = document.querySelector('table tbody');
  var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));

  rows.sort(function(a, b) {
    switch (sortingMethod) {
      case 'time':
        var dateA = new Date(a.getAttribute('data-time'));
        var dateB = new Date(b.getAttribute('data-time'));
        return dateB - dateA;

      case 'problemName':
        var textA = a.querySelector('td:nth-child(2)').textContent.trim().toLowerCase();
        var textB = b.querySelector('td:nth-child(2)').textContent.trim().toLowerCase();
        return textA.localeCompare(textB);

      default:
        return 0;
    }
  });

  rows.forEach(function(row) {
    tbody.appendChild(row);
  });

  refreshVisibleIndex();
}

var tagDropdown = document.getElementById('tagDropdown');
if (tagDropdown) {
  tagDropdown.addEventListener('change', function() {
    filterTable();
  });
}

var sortDropdown = document.getElementById('sortDropdown');
if (sortDropdown) {
  sortDropdown.addEventListener('change', function() {
    sortTable();
    filterTable();
  });
}

// Initial load
sortTable();
filterTable();
</script>